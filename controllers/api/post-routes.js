const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const hasAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'post_text'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text']
            },
            {
                model: User,
                attributes: ['id', 'username']
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;

