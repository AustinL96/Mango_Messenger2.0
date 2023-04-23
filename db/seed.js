const {
  Conversations,
  Messages,
  UserConversations,
  Users,
} = require("../models/index");
const db = require("../config/connection");

db.sync({ force: true }).then(() => {
  Conversations.bulkCreate([{}]).then(() => {
    console.log("Conversations seeded!");
    process.exit();
  });

  Messages.bulkCreate([{}]).then(() => {
    console.log("Messages seeded!");
    process.exit();
  });
  UserConversations.bulkCreate([{}]).then(() => {
    console.log("User Conversations seeded!");
    process.exit();
  });
  Users.bulkCreate([
    {
      username: "Bob",
      password: "woeifwefwef",
      email: "owiejfwef@woefijwef.com",
      created_at: "Tuesday",
    },
    {
      username: "Jimmy",
      password: "wikuiuikef",
      email: "owsaedfwefef@woefiyiuluibvf.com",
      created_at: "Wednesday",
    },
  ]).then(() => {
    console.log("Users seeded!");
    process.exit();
  });
});

// The code JD gave:

// const db = require('./connection');
// const { faker } = require('@faker-js/faker');

// const { User, Conversation, Message } = require('../models');

// const user_data = [];
// const conversations_data = [];

// let amount = 10;

// while (amount--) {
//   user_data.push({
//     username: faker.name.firstName(),
//     email: faker.internet.email(),
//     password: 'password'
//   });

//   conversations_data.push({
//     name: faker.internet.domainName()
//   });
// }

// db.sync({ force: true })
//   .then(async () => {
//     console.log('user model!', User);

//     const users = await User.bulkCreate(user_data);

//     console.log('Users have been generated');

//     const conversations = await Conversation.bulkCreate(conversations_data);

//     console.log('Conversations have been generated');

//     await users[0].addConversations(conversations[0]);
//     await users[0].addConversations(conversations[2]);
//     await users[1].addConversations(conversations[0]);
//     await users[1].addConversations(conversations[2]);

//     console.log('Users added to conversations');

//     let message_amount = 10;

//     while (message_amount--) {
//       await Message.create({
//         userId: users[0].id,
//         conversationId: conversations[0].id,
//         text: faker.lorem.paragraph()
//       });

//       await Message.create({
//         userId: users[1].id,
//         conversationId: conversations[0].id,
//         text: faker.lorem.paragraph(1)
//       });
//     }

//     console.log('Messages created successfully');

//     const user = await User.findByPk(1, {
//       include: [{
//         model: Conversation,
//         as: 'conversations'
//       }, Message]
//     });

//     console.log(user.messages);

//     process.exit();
//   });
