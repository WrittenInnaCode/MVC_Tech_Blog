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
            // title: req.body.title,
            comment_content: req.body.comment_content,
            user_id: req.session.user_id,
            blog_id: req.body.blog_id
        });
        if (!req.session.user) {
            return res.status(401).json({ msg: "Please login!" })
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update a comment
router.put("/:id", withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });
        // if (!commentData) {
        //     res.status(404).json({ message: 'No comment found with this id!' });
        //     return;
        // }
        if (!req.session.user) {
            return res.status(401).json({ msg: "Please login!" })
        }
        res.status(200).json(commentData);

    } catch (err) {
        res.status(500).json(err);
    }
});

// delete a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
        });

        if (!req.session.user) {
            return res.status(401).json({ msg: "Please login!" })
        }
        // if (!commentData) {
        //     res.status(404).json({ message: 'No comment found with this id!' });
        //     return;
        // }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;