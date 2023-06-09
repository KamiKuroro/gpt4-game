const dino = document.querySelector('.dino');
const obstacle = document.querySelector('.obstacle');
const scoreElement = document.getElementById('scoreValue');
const highScoreElement = document.getElementById('highScoreValue');
let isJumping = false;
let score = 0;
let highScore = 0;

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isJumping) {
        jump();
    }
});

document.addEventListener('touchstart', (event) => {
    if (!isJumping) {
        jump();
    }
});

function jump() {
    isJumping = true;
    let position = 0;
    const upInterval = setInterval(() => {
        if (position >= 80) {
            clearInterval(upInterval);
            const downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 4;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            position += 4;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function gameOver() {
    alert('Game Over! Reload the page to play again.');
    obstacle.style.animation = 'none';
    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
    }
    score = 0;
    setTimeout(() => {
        startObstacle();
    }, 1000);
}

function startObstacle() {
    obstacle.style.animation = 'moveObstacle 2s infinite linear';
}

function updateScore() {
    score++;
    scoreElement.textContent = score;
}

setInterval(() => {
    const dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
    const obstacleRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue('right'));
    const obstacleLeft = window.innerWidth - obstacleRight - obstacle.clientWidth;
    const dinoLeft = parseInt(window.getComputedStyle(dino).getPropertyValue('left'));
    const dinoRight =parseInt(window.getComputedStyle(dino).getPropertyValue('right'));

    if (obstacleRight + obstacle.clientWidth >= dinoRight && dinoTop <= 40 && obstacleRight - (dino.clientWidth + dinoRight) < 0) {
        gameOver();
    } else {
        updateScore();
    }
}, 80);

