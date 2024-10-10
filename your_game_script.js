const canvas = document.getElementById('pongCanvas'); // Get the canvas element
const context = canvas.getContext('2d'); // Get the 2D drawing context

// Set the canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth < 600 ? window.innerWidth : 600; // Adjust width for mobile
    canvas.height = window.innerHeight < 800 ? window.innerHeight : 800; // Adjust height for mobile
}

// Call resize function on window resize
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial call to set canvas size

// Socket.IO connection
const socket = io(); // Establish connection to server

// Game variables
let playerY = canvas.height / 2 - 50; // Player's Y position
const paddleHeight = 100; // Height of the paddle

// Draw the paddle
function drawPaddle() {
    context.fillStyle = '#000'; // Paddle color
    context.fillRect(10, playerY, 10, paddleHeight); // Draw paddle rectangle
}

// Game loop
function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawPaddle(); // Draw the player's paddle
    requestAnimationFrame(gameLoop); // Call game loop recursively
}

// Move player paddle
function movePlayer(y) {
    playerY = y; // Update player Y position
    socket.emit('move', { y: playerY }); // Emit movement data to server
}

// Listening for movements from other clients
socket.on('move', (data) => {
    playerY = data.y; // Update position from other players
});

// Handle touch events for mobile
canvas.addEventListener('touchmove', (event) => {
    const touchY = event.touches[0].clientY - canvas.getBoundingClientRect().top; // Get touch Y position
    movePlayer(touchY - paddleHeight / 2); // Move player paddle based on touch
});

// Start the game loop
gameLoop();
