const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//create associations

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});


module.exports = { User, Post, Comment };
