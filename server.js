const express = require('express'); // Import express
const path = require('path'); // Import path for file handling
const http = require('http'); // Import http module
const { Server } = require('socket.io'); // Import socket.io

const app = express(); // Create an express application
const PORT = process.env.PORT || 3020; // Define the port
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server); // Create a new instance of Socket.IO

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected'); // Log when a user connects

    // Handle player movements
    socket.on('move', (data) => {
        socket.broadcast.emit('move', data); // Broadcast movement data to other clients
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected'); // Log when a user disconnects
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log server status
});
