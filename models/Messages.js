const { Model, DataTypes } = require("sequelize");
const db = require('../config/connection');

class Messages extends Model {}

Messages.init({
  message_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message_text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sender: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "user_id",
    },
  },
  conversation_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "Conversations",
      key: "conversation_id",
    },
  }
},
  {
    sequelize: db,
    modelName: "Messages",
  }
);

module.exports = Messages;
