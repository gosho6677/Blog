const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isGuest, isAuthorized } = require('../middlewares/guards');
const authServices = require('../services/authServices');

router.post('/register',
    isGuest(),
    body('username').custom(async val => {
        let username = await authServices.getUserByUsername(val);
        if (username) {
            throw new Error('Username is already taken.');
        }
        return true;
    }),
    body('email', 'Please provide a correct email.').isEmail().custom(async val => {
        let email = await authServices.getUserByEmail(val);
        if (email) {
            throw new Error('Email is already taken.');
        }
        return true;
    }),
    body('password', 'Password must be atleast 3 characters long!').isLength({ min: 3 }),
    async (req, res) => {
        const { errors } = validationResult(req);

        try {
            if (errors.length) {
                throw new Error(errors.map(e => e.msg).join('\n'));
            }

            await req.auth.register(req.body);
        } catch (err) {
            res.status(400).json({ ok: false, error: err.message });
        }
    });

router.post('/login',
    isGuest(),
    body('email').custom(async val => {
        const email = await authServices.getUserByEmail(val);
        
        if (!email) {
            throw new Error('Email does not exist!');
        }
        return true;
    }),
    body('password', 'Password must be atleast 3 characters long').isLength({ min: 3 }),
    async (req, res) => {
        const { errors } = validationResult(req);

        try {
            if (errors.length) {
                throw new Error(errors.map(e => e.msg).join('\n'));
            }

            await req.auth.login(req.body);
        } catch (err) {
            res.status(400).json({ ok: false, error: err.message });
        }
    });

    // TODO: add the request on the front end
router.get('/logout', isAuthorized(), async (req, res) => {
    try {
        await req.auth.logout();
    } catch (err) {
        res.status(400).json({ ok: false, error: err.message });
    }
});

module.exports = router;