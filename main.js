const gameCanvas = document.getElementById("game-canvas");
const ctx = gameCanvas.getContext("2d");
const friction = 0.99;
gameCanvas.style.cursor = "grab";

// user input init
let startX = 0;
let startY = 0;

let isDragging = false;
let currentY = 0;
let currentX = 0;

let ball = {
  x: 175,
  y: 300,
  r: 20,
  vx: 0,
  vy: 0,
};

function update() {
  ball.x += ball.vx;
  ball.y += ball.vy;

  // friction
  ball.vx *= friction;
  ball.vy *= friction;

  // aadb collision
  // check ball x position
  if (ball.x + ball.r > gameCanvas.width) {
    ball.x = gameCanvas.width - ball.r;
    ball.vx *= -1;
  } else if (ball.x - ball.r < 0) {
    ball.x = ball.r;
    ball.vx *= -1;
  }
  // check ball y position
  if (ball.y + ball.r > gameCanvas.height) {
    ball.y = gameCanvas.height - ball.r;
    ball.vy *= -1;
  } else if (ball.y - ball.r < 0) {
    ball.y = ball.r;
    ball.vy *= -1;
  }
}

function draw() {
  // update lapangan golf
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, 800, 600);

  // update bola
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fill();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// mouse interact function
gameCanvas.addEventListener("mousedown", (e) => {
  isDragging = true;
  gameCanvas.style.cursor = "grabbing";
  startX = e.offsetX;
  startY = e.offsetY;

  currentX = startX;
  currentY = startY;
});

gameCanvas.addEventListener("mouseup", (e) => {
  if (isDragging) {
    isDragging = false;
    gameCanvas.style.cursor = "grab";
    let dx = startX - e.offsetX;
    let dy = startY - e.offsetY;

    ball.vx = dx * 0.1;
    ball.vy = dy * 0.1;
  }
});

gameCanvas.addEventListener("mousemove", (e) => {
  if (isDragging) {
    currentX = e.offsetX;
    currentY = e.offsetY;
  }
});

gameCanvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  isDragging = false;
  gameCanvas.style.cursor = "grab";
});
gameLoop();
