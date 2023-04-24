
/**
* This file should be used for universal browser JS. If there is a specific page that has custom
* elements that other hbs pages do not have, you'll get an error when trying to reference those elements

* I have separated the individual JS into their specific files and loaded the script tags with handlebars
*/







//*** SOCKET STUFF */

document.addEventListener('DOMContentLoaded', () => {
  const chatRoomId = document.getElementById('messageList').dataset.chatroomid.toLowerCase();
  console.log('Chat room ID:', chatRoomId);

  const chatSocket = io('/chat', { query: { chatRoomId } });

  chatSocket.on('connect', () => {
    console.log('connected to socket');
  });

  chatSocket.on('newMessage', (data) => {
    console.log('New message received:', data.message);

    const messageList = document.getElementById('messageList');
    const newMessage = document.createElement('li');
    newMessage.textContent = data.message;
    messageList.appendChild(newMessage);
  });

  const messageForm = document.getElementById('messageForm');
  const messageInput = document.getElementById('messageInput');

  messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('messageForm submitted');
    chatSocket.emit('sendMessage', { message: messageInput.value });
    console.log('Message emitted:', messageInput.value);
  });
});
