// Get the canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Define some game constants
const GRAVITY = 0.5;
const JUMP_HEIGHT = 15;
const DUCK_HEIGHT = 20;
const PLAYER_SIZE = 50;
const OBSTACLE_SIZE = 50;
const OBSTACLE_SPEED = 5;

// Define the player object
let player = {
    x: 100,
    y: canvas.height / 2,
    width: PLAYER_SIZE,
    height: PLAYER_SIZE,
    velocity: 0,
    isJumping: false,
    isDucking: false
};

// Define the obstacle object
let obstacle = {
    x: canvas.width,
    y: canvas.height / 2,
    width: OBSTACLE_SIZE,
    height: OBSTACLE_SIZE
};

// Main game loop
function update() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update the player position
    player.y += player.velocity;
    player.velocity += GRAVITY;

    // Check if the player is jumping
    if (player.isJumping) {
        player.velocity = -JUMP_HEIGHT;
        player.isJumping = false;
    }

    // Check if the player is ducking
    if (player.isDucking) {
        player.height = PLAYER_SIZE / 2;
    } else {
        player.height = PLAYER_SIZE;
    }

    // Check for collision with the ground
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.velocity = 0;
    }

    // Update the obstacle position
    obstacle.x -= OBSTACLE_SPEED;

    // Check for collision with the obstacle
    if (obstacle.x < player.x + player.width &&
        obstacle.x + obstacle.width > player.x &&
        obstacle.y < player.y + player.height &&
        obstacle.y + obstacle.height > player.y) {
        // Game over
        alert('Game Over!');
        window.location.reload();
    }

    // Check if the obstacle is off the screen
    if (obstacle.x < -obstacle.width) {
        obstacle.x = canvas.width;
        obstacle.y = Math.random() * (canvas.height - obstacle.height);
    }

    // Draw the player
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw the obstacle
    ctx.fillStyle = 'red';
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    // Request the next frame
    requestAnimationFrame(update);
}

// Handle keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        player.isJumping = true;
    }
    if (e.key === 'ArrowDown') {
        player.isDucking = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowDown') {
        player.isDucking = false;
    }
});

// Start the game loop
update();
