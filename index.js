const express = require('express');
const app = express();
const http = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server: http });

app.use(express.static(__dirname + '/public'));

wss.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (message) => {
        console.log('Received message from client:', message);
        // Perform any required actions based on the received message

        // Example: Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    socket.on('close', () => {
        console.log('A user disconnected');
    });
});

http.listen(3000, () => {
    console.log('Server listening on port 3000');
});
