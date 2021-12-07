// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");

// import our database connection from config.js
const sequelize = require("../config/connection");

// Initialize Comment model (table) by extending off Sequelize's Model class
class Comment extends Model {}

// define table columns and configuration
Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "pet",
  }
);

module.exports = Comment;