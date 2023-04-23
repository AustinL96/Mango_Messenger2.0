const Conversations = require("./Conversations");
const Messages = require("./Messages");
const GroupMembers = require("./GroupMembers");
const Users = require("./Users");

//***Users belong to many Conversations through the GroupMembers join table, and has many Messages where the user is the sender */
Users.belongsToMany(Conversations, {
  through: "GroupMembers",
  foreignKey: "user_id",
});
Users.hasMany(Messages, {
  foreignKey: "sender",
});

//***Conversations belong to many Users through the GroupMembers join table, and has many Messages belonging to the conversation */
Conversations.belongsToMany(Users, {
  through: "GroupMembers",
  foreignKey: "conversation_id",
});
Conversations.hasMany(Messages, {
  foreignKey: "conversation_id",
});

//***GroupMembers belong to a User and a Conversation */
GroupMembers.belongsTo(Users, {
  foreignKey: "user_id",
});
GroupMembers.belongsTo(Conversations, {
  foreignKey: "conversation_id",
});

//***Messages belong to a User (the sender) and a Conversation */
Messages.belongsTo(Users, {
  foreignKey: "sender",
});
Messages.belongsTo(Conversations, {
  foreignKey: "conversation_id",
});

module.exports = {
  Conversations,
  Messages,
  Users,
  GroupMembers,
};
