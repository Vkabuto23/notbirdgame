const canvas = document.getElementById('flappyBirdCanvas');
const ctx = canvas.getContext('2d');

// Переменные
let gap = 85;
let constant;

let birdX = 10;
let birdY = 150;
let birdSize = 20;
let gravity = 1.5;
let score = 0;

let pipeWidth = 40;
let pipe = [];

pipe[0] = {
    x: canvas.width,
    y: 0
};

// Нажатие на клавишу
document.addEventListener('keydown', moveUp);

function moveUp() {
    birdY -= 25;
}

// Логика игры
function draw() {
    // Очистка канваса
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Фон
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Земля
    ctx.fillStyle = "#d6b656";
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

    // Птичка
    ctx.fillStyle = "#ff0";
    ctx.fillRect(birdX, birdY, birdSize, birdSize);

    // Трубы
    for (let i = 0; i < pipe.length; i++) {
        constant = 150; // Расстояние между верхней и нижней трубой
        let pipeHeight = pipe[i].y + pipeWidth;

        // Верхняя труба
        ctx.fillStyle = "#228b22";
        ctx.fillRect(pipe[i].x, pipe[i].y, pipeWidth, pipeHeight);

        // Нижняя труба
        ctx.fillRect(pipe[i].x, pipeHeight + gap, pipeWidth, canvas.height - (pipeHeight + gap) - 50);

        pipe[i].x--;

        if (pipe[i].x === 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeHeight) - pipeHeight
            });
        }

        // Проверка на столкновение
        if (birdX + birdSize >= pipe[i].x && birdX <= pipe[i].x + pipeWidth &&
            (birdY <= pipe[i].y + pipeHeight || birdY + birdSize >= pipeHeight + gap) ||
            birdY + birdSize >= canvas.height - 50) {
            location.reload(); // Перезапуск игры
        }

        if (pipe[i].x === 5) {
            score++;
        }
    }

    birdY += gravity;

    // Отображение счета
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 10, canvas.height - 20);

    requestAnimationFrame(draw);
}

draw();
