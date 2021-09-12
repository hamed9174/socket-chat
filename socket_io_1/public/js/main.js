const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// // Add room name to DOM
function outPutRoomName(room) {
  roomName.innerText = room;
}

// // Add users to DOM
function outPutUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

const chatForm = document.querySelector('#chat-form');
const chatMessages = document.querySelector('.chat-messages');

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

console.log(username, room);

const socket = io();

socket.emit('joinRoom', { username, room });

socket.on('roomUsers', ({ room, users }) => {
    outPutRoomName(room);
    outPutUsers(users);
})


socket.on('message', message => {
    chatMessages.scrollTop = chatMessages.scrollHeight;
    outPutMessage(message);
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    socket.emit('chatMessage', msg);
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

function outPutMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
    <p class="meta">${message.userName} <span>${message.time}</span></p>
    <p class="text">
      ${message.textMessage}
    </p>
    `;
    document.querySelector('.chat-messages').appendChild(div);
}