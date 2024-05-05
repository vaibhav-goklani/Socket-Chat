const express = require('express');
const { createServer } = require('http');
const path = require('path');
const { Server } = require('socket.io');

const PORT = 8000;
const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + "/public/index.html"));
});

io.on('connection', (socket) => {
    socket.on('chat message', (chatMessage) => {
        socket.broadcast.emit('chat message', chatMessage);
    })
});

server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});