const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors')
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.use(cors())
app.get('/', (req, res) => {
    res.send('ok!');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('create', (data) => {
        socket.broadcast.emit('create', data)
    })
    socket.on('message', (data) => {
        socket.broadcast.emit('message', data)
    })
});

server.listen(5000, () => {
    console.log('listening on *:5000');
});
