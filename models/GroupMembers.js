const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");

class GroupMembers extends Model {}

GroupMembers.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "user_id",
      },
    },
    conversation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Conversations",
        key: "conversation_id",
      },
    },
    joined_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    sequelize: db,
    modelName: "GroupMembers",
  }
);

module.exports = GroupMembers;