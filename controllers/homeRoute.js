const router = require('express').Router();
const { Blog, User, Comment } = require('../models'); // require the models
const withAuth = require('../utils/auth'); // middleware checking sign in credentials

// READ the homepage and obtain all blogs associated with the User that is signed in
router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
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
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try { // FIRST get blogs with specified id in the route
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment, 
          attributes: ['id', 'context', 'date_created', 'user_id'],
            include: [
              {
                model: User,
                attributes: ['name']
              }
            ]
        }
      ],
    });

    const blog = blogData.get({ plain: true }); // SECOND from that blogData, change it to plain and rename it blog

    res.render('blog', { // THIRD from the const blog, render with logged in taken into consideration
      ...blog, // the "..." is telling JS to get all instances of blog and response.render
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// READ the blog page and obtain all comments associated with that Blog displayed
router.get('/blog', async (req, res) => {
  try {
    // Get all comments and JOIN with blog data
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        // {
        //   model: Comment, 
        //   attributes: ['id', 'context', 'date_created', 'blog_id', 'user_id'],
        //     include: [
        //       {
        //         model: User,
        //         attributes: ['name']
        //       }
        //     ]
        // }
      ],
    });

    // Serialize data so the template can read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('blog', { 
      comments, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/comment/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const comment = commentData.get({ plain: true });

    res.render('comment', {
      ...comment,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // FIRST Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }], // include blogs
    });

    const user = userData.get({ plain: true }); // SECOND make that userData plain and rename as user

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
