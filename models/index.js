const User = require('./User');
const Blog = require('./Blog');

User.hasMany(Blog, { // A user has many instances of the Blog model
  foreignKey: 'user_id', // use the user id to identify which blog belongs to the user
  onDelete: 'CASCADE' // if that user is deleted, then delete cascade all blogs with that foreign key of the user id
});

Blog.belongsTo(User, { // same as above but states the Blog models belong to the User model
  foreignKey: 'user_id'
});

module.exports = { User, Blog };