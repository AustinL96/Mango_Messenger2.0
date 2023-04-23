// const messageOutput = document.querySelector("#message-output");
// const messageInput = document.querySelector("#message-input");


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


//***Creating a new Conversation */
const newConvo = document.getElementById("newGroupChatBtn");
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
})




const socket = io();
const messageOutput = document.getElementById('message-output');
const messageInput = document.getElementById('message-input');
console.log(messageInput)


socket.on('chat_message', data => {
  messageOutput.insertAdjacentHTML('beforeend', `
  <li>${data.text}</li>
  `);
});

function chatMessage(e) {
  const message_text = e.target.value;
  console.log(message_text)

  socket.emit('chat_message', {
    text: message_text
  });
}

messageInput.addEventListener('keydown', chatMessage);  








// Everything below this point JD helped with Code

// io.on((socket) => {
//   socket.emit();
// });
// socket.on("chat_message", (message_data) => {
//   messageOutput.insertAdjacentHTML(
//     "beforeend",
//     `
//   <li>${message_data.text}</li>
//   `
//   );
// });

// function chatMessage(e) {
//   const message_text = e.target.value;

//   socket.emit("chat_message", {
//     text: message_text,
//   });
// }

// messageInput.addEventListener("keydown", chatMessage);
