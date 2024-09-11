module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      //* Metadata
      url: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
  
      //* Post
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    });
  
    return Post;
  };