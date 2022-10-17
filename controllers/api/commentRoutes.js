const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [User, Post]
        })
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Get one comment and the post it is associated with
router.get('/:id', async (req, res) => {
    try {
      const commentData = await Comment.findByPk(req.params.id, {
        include: [User, Post]
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with that id!' });
        return;
      }
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

// Make a new comment
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            comment_content: req.body.comment_content,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        });
        if (!req.session.user_id) {
            return res.status(401).json({ msg: "Please login!" })
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;