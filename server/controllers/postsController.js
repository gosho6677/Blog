const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isAuthorized } = require('../middlewares/guards');

router.get('/', async (req, res) => {
    const posts = await req.data.getAllPosts();
    res.json({ ok: true, posts });
});

router.get('/top-three-most-liked', async (req, res) => {
    try {
        const posts = await req.data.getTopThree();
        res.json({ ok: true, posts });
    } catch (err) {
        res.status(400).json({ ok: false, error: err.message });
    }
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
            // likes: 0,
            owner: req.user._id
        };

        try {
            if (errors.length) {
                throw new Error(errors.map(e => e.msg).join('\n'));
            }
            const post = await req.data.createPost(info);
            res.status(201).json({ ok: true, post });
        } catch (err) {
            res.status(400).json({ ok: false, error: err.message });
        }
    });

router.get('/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await req.data.getPostById(postId);
        res.json({ ok: true, post });

    } catch (err) {
        res.status(400).json({ ok: false, error: err.message });
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
            res.status(201).json({ ok: true, post });
        } catch (err) {
            res.status(400).json({ ok: false, error: err.message });
        }
    });


router.delete('/:id', isAuthorized(), async (req, res) => {
    const id = req.params.id;
    const userId = req.user._id;
    try {
        await req.data.deletePost(userId, id);
        res.json({ ok: true });
    } catch (err) {
        res.status(400).json({ ok: false, error: err.message });
    }
});

// likes 
router.get('/like/:id', isAuthorized(), async (req, res) => {
    const id = req.params.id;
    const userId = req.user._id;
    try {
        await req.data.likePost(userId, id);
        res.json({ ok: true, userId });
    } catch (err) {
        res.status(400).json({ ok: false, error: err.message });
    }
});

router.get('/dislike/:id', isAuthorized(), async (req, res) => {
    const id = req.params.id;
    const userId = req.user._id;
    try {
        await req.data.dislikePost(userId, id);
        res.json({ ok: true, userId });
    } catch (err) {
        res.status(400).json({ ok: false, error: err.message });
    }
});

// comments

router.post('/comment/:id', isAuthorized(), async (req, res) => {
    const postId = req.params.id;
    const userId = req.user._id;
    const commentDescription = req.body.description;

    try {
        if(!commentDescription.length) {
            throw new Error('Comment should not be empty!');
        }
        const comment = await req.data.commentPost(commentDescription, postId, userId);
        res.status(201).json({ ok: true, comment });
    } catch (err) {
        res.status(400).json({ ok: false, error: err.message });
    }
});

module.exports = router;