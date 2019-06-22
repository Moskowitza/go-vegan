module.exports = function(sequelize, Sequelize) {
  const Post = sequelize.define('Post', {
    postId: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    comment: {
      type: Sequelize.STRING,
      notEmpty: true,
    },
  });
  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      // as:'myPosts',
      foreignKey: 'userId',
    });
    Post.belongsTo(models.Sanctuary, {
      // as: 'comments',
      foreignKey: 'sanId',
    });
  };
  return Post;
};
