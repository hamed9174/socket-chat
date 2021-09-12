// add express
const express = require('express');
// add path
const path = require('path');
// add socket io
const socketio = require('socket.io');
// add http
const http = require('http');
// create app
const app = express();
// import format message like textMessage and UserName and time
const formatMessage = require('./utils/messages');
// add function crud
const { getCurrentUser, getRoomUsers, userJoin, userLeave } = require('./utils/users');
// create server
const server = http.createServer(app);
// preparing socket io
const io = socketio(server);
// read static file
app.use(express.static(path.join(__dirname, 'public')));
// just but name
const botName = 'ChatCord Bot';


// everything put on io.on();
io.on('connection', socket => {
    // for Join to room
    console.log('connection')
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        socket.emit('message', formatMessage(botName, 'Welcome to ChatCord'));

        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has Join the chat`));
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    });


    // for chat in room
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    // for disconnect and leave the chat
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user) {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }

    });

});

const PORT = process.env.PORT || 3000;

// my mistake in server
server.listen(PORT, () => console.log(`App run in on port ${PORT}`));
