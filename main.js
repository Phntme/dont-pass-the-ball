const gameCanvas = document.getElementById("game-canvas");
const ctx = gameCanvas.getContext("2d");

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

  // aadb collision
  //   check ball x position
  if (ball.x + ball.r > gameCanvas.width || ball.x - ball.r < 0) {
    ball.vx *= -1;
  }
  //   check ball y position
  if (ball.y + ball.r > gameCanvas.height || ball.y - ball.r < 0) {
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

gameLoop();
