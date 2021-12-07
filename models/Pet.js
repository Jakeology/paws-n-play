// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");

// import our database connection from config.js
const sequelize = require("../config/connection");

// Initialize Pet model (table) by extending off Sequelize's Model class
class Pet extends Model {}

// define table columns and configuration
Pet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isInt: true,
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vaccinated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    about: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pfp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "pet",
  }
);

module.exports = Pet;
