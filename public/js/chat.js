const socket = io();
const messageOutput = document.getElementById('message-output');
const messageInput = document.getElementById('message-input');
const chatBtn = document.querySelector('#chat-btn');
// Get the conversation id from the url, so we can save the reference in our table on the
// backend
const conversation_id = window.location.pathname.split('/')[2];

socket.on('connect', () => {
  socket.emit('join_room', conversation_id);
});

// Listener to receive chat history from the server
socket.on('chat_history', messages => {
  messages.forEach(message => {
    // Create a formated date to output
    const date = dayjs(message.createAt).format('MM/DD/YYYY hh:mma -');
    // Loop over all message history and output a message for each one
    messageOutput.insertAdjacentHTML('beforeend', `
    <li>${date} ${message.User.username}: ${message.message_text}</li>
    `);
  });
})

socket.on('chat_message', data => {
  messageOutput.insertAdjacentHTML('beforeend', `
  <li>${data.username}: ${data.message.message_text}</li>
  `);
});

function chatMessage(e) {
  const sendChat = () => {
    e.preventDefault();
    const message_text = messageInput.value;
    // If they haven't entered anything into the chat input, just return and break out
    if (!message_text) {
      e.preventDefault();
      return;
    };

    // Send the conversation id and the text message
    // We don't need to send a user_id, as that would be insecure
    socket.emit('chat_message', {
      conversation_id,
      message_text
    });

    messageInput.value = '';
  }

  // If the Send button is pressed, send the chat
  if (e.target.tagName === 'BUTTON') {
    return sendChat();
  }
  // Wait for the enter key to be pressed and also check to ensure the user has typed
  // something into the input box
  if (e.target.keyCode === 13) {
    sendChat();
  }
}

messageInput.addEventListener('keydown', chatMessage);
chatBtn.addEventListener('click', chatMessage);