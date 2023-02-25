const router = require('express').Router();
const { Comment, User, Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// READ the blog page and obtain all comments associated with that Blog displayed
router.get('/blog', async (req, res) => {
    try {
      // Get all comments and JOIN with blog data
      const commentData = await Blog.findAll({
        attributes: ['id', 'context', 'date_created', 'blog_id', 'user_id'],
  
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            model: Comment, 
            attributes: ['id', 'context', 'date_created', 'blog_id', 'user_id'],
              include: [
                {
                  model: User,
                  attributes: ['name']
                }
              ]
          }
        ],
      });
  
      // Serialize data so the template can read it
      const comments = commentData.map((comment) => comment.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('blogs', { 
        comments, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  
router.post('/blog', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      blog_id: req.session.blog_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
