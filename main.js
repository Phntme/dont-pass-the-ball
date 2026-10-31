const gameCanvas = document.getElementById("game-canvas");
const ctx = gameCanvas.getContext("2d");
let ballX = 175;
const velocityX = 2;

let ball = {
  x: 175,
  y: 385,
  r: 20,
  vx: 2,
  vy: 2,
};

function update() {
  ball.x += ball.vx;
  ball.y += ball.vy;
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

gameLoop();
