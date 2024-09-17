const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gameOverScreen = document.getElementById('gameOver');

let player = {
    x: 50,
    y: 300,
    width: 50,
    height: 50,
    dy: 0,
    isJumping: false,
    isDucking: false,
};

let groundHeight = canvas.height - 50;
let gravity = 0.6;
let jumpPower = -12;
let isGameOver = false;

let obstacles = [];
let frames = 0;
let speed = 6;

let score = 0;

function drawPlayer() {
    if (player.isDucking) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(player.x, player.y + 25, player.width, player.height - 25); // Draw ducking player
    } else {
        ctx.fillStyle = 'blue';
        ctx.fillRect(player.x, player.y, player.width, player.height); // Draw normal player
    }
}

function handlePlayerJump() {
    if (player.isJumping) {
        player.dy += gravity;
        player.y += player.dy;

        if (player.y > groundHeight - player.height) {
            player.y = groundHeight - player.height;
            player.isJumping = false;
            player.dy = 0;
        }
    }
}

function handlePlayerDuck() {
    if (player.isDucking && !player.isJumping) {
        player.height = 25; // Reduce height when ducking
    } else {
        player.height = 50; // Normal height
    }
}

function createObstacle() {
    let size = Math.random() < 0.5 ? 50 : 25;
    let type = size === 50 ? 'ground' : 'air';
    let obstacle = {
        x: canvas.width,
        y: type === 'ground' ? groundHeight - size : groundHeight - size - 75,
        width: size,
        height: size,
        type: type,
    };
    obstacles.push(obstacle);
}

function drawObstacles() {
    ctx.fillStyle = 'red';
    obstacles.forEach((obstacle) => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function updateObstacles() {
    obstacles = obstacles.filter((obstacle) => obstacle.x + obstacle.width > 0);

    obstacles.forEach((obstacle) => {
        obstacle.x -= speed;

        // Collision detection
        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            isGameOver = true;
            gameOverScreen.style.display = 'block';
        }
    });
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

function resetGame() {
    isGameOver = false;
    gameOverScreen.style.display = 'none';
    obstacles = [];
    score = 0;
    frames = 0;
    speed = 6;
    player.y = groundHeight - player.height;
    player.isJumping = false;
    player.isDucking = false;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isGameOver) {
        drawPlayer();
        handlePlayerJump();
        handlePlayerDuck();

        if (frames % 100 === 0) {
            createObstacle();
        }

        drawObstacles();
        updateObstacles();
        drawScore();

        score++;
        frames++;
        speed += 0.002; // Gradual speed increase

        requestAnimationFrame(gameLoop);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !player.isJumping && !isGameOver) {
        player.isJumping = true;
        player.dy = jumpPower;
    }
    if (e.code === 'ArrowDown' && !isGameOver) {
        player.isDucking = true;
    }
    if (e.code === 'Space' && isGameOver) {
        resetGame();
        gameLoop();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowDown') {
        player.isDucking = false;
    }
});

resetGame();
gameLoop();
