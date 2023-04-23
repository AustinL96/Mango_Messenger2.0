//Require the correct Modules
const { Model, DataTypes } = require("sequelize");
const db = require('../config/connection');

//Extend Sequelize Model to class Conversations
class Conversations extends Model {}

//Define Conversations with correct attributes
Conversations.init(
  {
    conversation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    conversation_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize: db,
    modelName: "Conversations",
  }
);

module.exports = Conversations;
