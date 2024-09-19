const socket = io();


const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');
const allmessages = document.getElementById('messages');
let currentUser = null
socket.on('connect', () => {
    currentUser = socket.id;
});


socket.on('message', (messageData) => {
    const li = document.createElement('li');
    if(messageData.sender === currentUser) {
        li.style.backgroundColor = 'lightblue'; 
        li.style.textAlign = 'right';
        li.style.color = 'black';
        li.style.border = '1px solid black';
        li.style.borderRadius = '10px';
        li.style.paddingRight = '10px';
        li.style.paddingTop = '5px';
        li.style.paddingBottom = '5px';
    } else {
        li.style.backgroundColor = 'lightgreen';
        li.style.textAlign = 'left';
        li.style.color = 'black';
        li.style.border = '1px solid black';
        li.style.borderRadius = '10px';
        li.style.paddingLeft = '10px';
        li.style.paddingTop = '5px';
        li.style.paddingBottom = '5px';
    }
    li.innerText = messageData.message;
    allmessages.appendChild(li);
    allmessages.scrollTop = allmessages.scrollHeight;
    
})

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if(!message) return;
    socket.emit('message', {
        message});
    messageInput.value = '';

})
