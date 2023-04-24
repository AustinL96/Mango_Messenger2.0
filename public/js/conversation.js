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
const greetingDiv = document.getElementById('greetingDiv')
const newConvo = document.getElementById("newGroupChatBtn");
newConvo.addEventListener("click", (e) => {
  e.preventDefault();
  //Get the parent div
  // const parentDiv = newConvo.parentNode;

  //Create a holding div after parent div
  
  
  //Create a new Form element
  const newForm = document.createElement("form");
  newForm.setAttribute('action', '/dashboard/newGroupChat');
  newForm.setAttribute('class', 'newConvoForm');
  newForm.setAttribute('method', 'POST');
  

  //Create a new text Input element for the group chat title
  const newInput = document.createElement("input");
  newInput.setAttribute('name', 'groupTitle');
  newInput.setAttribute('class', 'newConvoInput');
  newInput.setAttribute('type', 'text');
  newInput.setAttribute('placeholder', 'Enter the group chat title');

  //Create a new submit Button Element
  const submitBtn = document.createElement("button");
  submitBtn.setAttribute('class', 'newConvoButton');
  submitBtn.textContent = 'Create a chatroom!';

  //Append everything to the form element
  newForm.appendChild(newInput);
  newForm.appendChild(submitBtn);

  //Append that form to the holding div
  greetingDiv.insertAdjacentElement('beforeend', newForm);
})