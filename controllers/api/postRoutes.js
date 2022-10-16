const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// Get all posts and their users and comments
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User, Comment]
    })
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Get one post and its user and comments
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [User, Comment]
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// create post
router.post('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      post_content: req.body.post_content,
      user_id: req.session.user_id,
    });
    if (!req.session.user_id) {
      return res.status(401).json({ msg: "Please login!" })
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update post
router.put('/:id', withAuth, (req, res) => {
  Post.update(req.body,
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});


// delete a post
router.delete('/:id', withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(postData => {
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(postData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
