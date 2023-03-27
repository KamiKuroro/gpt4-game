const dino = document.querySelector('.dino');
const obstacle = document.querySelector('.obstacle');
let isJumping = false;

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isJumping) {
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

setInterval(() => {
    const dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
    const obstacleRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue('right'));
    const obstacleLeft = window.innerWidth - obstacleRight - obstacle.clientWidth;

    if (obstacleLeft >= 0 && obstacleLeft < 40 && dinoTop <= 40) {
        alert('Game Over! Reload the page to play again.');
        gameOver()
    }
}, 50);

function gameOver() {
    obstacle.style.animation = 'none';
    setTimeout(() => {
        startObstacle();
    }, 1000);
}

function startObstacle() {
    obstacle.style.animation = 'moveObstacle 2s infinite linear';
}