const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

// USER relationship with BLOG
User.hasMany(Blog, { // A user has many instances of the Blog model
  foreignKey: 'user_id', // use the user id to identify which blog belongs to the user
  onDelete: 'CASCADE' // if that user is deleted, then delete cascade all blogs with that foreign key of the user id
});

Blog.belongsTo(User, { // same as above but states the Blog models belong to the User model
  foreignKey: 'user_id'
});


// USER relationship with COMMENT
User.hasMany(Comment, { // A user has many instances of the Comment model
  foreignKey: 'user_id', // use the user id to identify which comment belongs to the user
  onDelete: 'CASCADE' // if that user is deleted, then delete cascade all blogs with that foreign key of the user id
});

Comment.belongsTo(User, { // same as above but states the Comment models belong to the User model
  foreignKey: 'user_id'
});


// BLOG relationship with COMMENT
Blog.hasMany(Comment, { // A blog has many instances of the Comment model
  foreignKey: 'blog_id', // use the blog id to identify which comment belongs to the blog
  onDelete: 'CASCADE' // if that blog is deleted, then delete cascade all blogs with that foreign key of the blog id
});

Comment.belongsTo(Blog, { // same as above but states the Comment models belong to the Blog model
  foreignKey: 'blog_id'
});

module.exports = { User, Blog, Comment };