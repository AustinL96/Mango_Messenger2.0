//*** ADD CLICK EVEN FOR CLICKING ON CONVERSATIONS, NEEDED TO MAKE GET REQUESTS*/
const conversations = document.querySelectorAll('.conversation-name');

conversations.forEach((conversation) => {
  conversation.addEventListener('click', (e) => {
    e.preventDefault();
    const conversationId = conversation.getAttribute('id');
    console.log(conversationId)
    window.location.href = `/groupchat/${conversationId}`;
  })
})
//*** FOR CREATING NEW CONVERSATIONS */
const newConvo = document.getElementById("newGroupChatBtn");
if (newConvo) {
  newConvo.addEventListener("click", (e) => {
    e.preventDefault();
    //Get the parent div
    const parentDiv = newConvo.parentNode;

    //Create a holding div after parent div
    const newGroupChatDiv = document.createElement("div");
    parentDiv.insertAdjacentElement('afterend', newGroupChatDiv);

    //Create a new Form element
    const newForm = document.createElement("form");
    newForm.setAttribute('action', '/dashboard/newGroupChat');
    newForm.setAttribute('method', 'POST');

    //Create a new text Input element for the group chat title
    const newInput = document.createElement("input");
    newInput.setAttribute('name', 'groupTitle');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('placeholder', 'Enter the group chat title');

    //Create a new submit Button Element
    const submitBtn = document.createElement("button");

    //Append everything to the form element
    newForm.appendChild(newInput);
    newForm.appendChild(submitBtn);

    //Append that form to the holding div
    newGroupChatDiv.appendChild(newForm);
  });
}




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
