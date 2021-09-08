const router = require('express').Router();
const { isAuthorized } = require('../middlewares/guards');

router.get('/:username', isAuthorized(), async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await req.data.getCurrentUser(userId);
        res.json({ ok: true, posts: user.posts });
    } catch (err) {
        res.status(400).json({ ok:false, error: err.message });
    }
});

module.exports = router;
