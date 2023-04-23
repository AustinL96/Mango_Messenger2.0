const router = require('express').Router();
const { Users, Conversations, Messages } = require('../models');

//Create a new Conversation
router.post('/dashboard/newGroupChat', async (req, res) => {
  const groupChatName = req.body.groupTitle;
  console.log(groupChatName);
  try {
    const newConversation = await Conversations.create({
      conversation_id: req.params.conversation_id,
      conversation_name: groupChatName,
    });
    console.log('New Conversation Created: ${newConversation.conversation_name}')
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
  }
})

//***Load Group Chat Page */
router.get('/groupchat/:id', async (req, res) => {
  const chatRoomId = req.params.id;
  try {
    const conversationData = await Conversations.findByPk(chatRoomId, {
      raw: true
    });
    res.render('private/groupchat', { 
      conversation: conversationData,
      chatRoomId: chatRoomId
    });
  } catch (err) {
    console.log(err);
    res.redirect('/dashboard');
  }
});

module.exports = router;