const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isAuthorized } = require('../middlewares/guards');

router.get('/', async (req, res) => {
    const posts = await req.data.getAllPosts();
    res.json({ ok: true, posts });
});

router.post('/',
    isAuthorized(),
    body('title', 'Title must be atleast 3 characters long.').isLength({ min: 3 }),
    body('description', 'Description must be atleast 10 characters long.').isLength({ min: 10 }),
    body('imageUrl', 'Image URL must be a valid URL.').isURL(),
    async (req, res) => {
        const { errors } = validationResult(req);

        const info = {
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            likes: 0,
            owner: req.user._id
        };

        try {
            if (errors.length) {
                throw new Error(errors.map(e => e.msg).join('\n'));
            }

            const post = await req.data.createPost(info);
            res.json({ ok: true, post });
        } catch (err) {
            res.json({ ok: false, error: err.message });
        }
    });

router.get('/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await req.data.getPostById(postId);
        res.json({ ok: true, post });

    } catch (err) {
        res.json({ ok: false, error: err.message });
    }
});

router.put('/:id',
    isAuthorized(),
    body('title', 'Title must be atleast 3 characters long.').isLength({ min: 3 }),
    body('description', 'Description must be atleast 10 characters long.').isLength({ min: 10 }),
    body('imageUrl', 'Image URL must be a valid URL.').isURL(),
    async (req, res) => {
        const { errors } = validationResult(req);

        const id = req.params.id;
        try {
            if (errors.length) {
                throw new Error(errors.map(e => e.msg).join('\n'));
            }
            const info = {
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl
            };

            const post = await req.data.editPost(info, id);
            res.json({ ok: true, post });
        } catch (err) {
            res.json({ ok: false, error: err.message });
        }
    });


router.delete('/:id', isAuthorized(), (req, res) => {
    const id = req.params.id;
    const userId = req.user._id;
    try {
        req.data.deletePost(userId, id);
        res.json({ ok: true });
    } catch (err) {
        res.json({ ok: false, error: err.message });
    }
});

module.exports = router;