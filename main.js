const gameCanvas = document.getElementById("game-canvas");
const ctx = gameCanvas.getContext("2d");
let ballX = 175;
const velocityX = 2;

function gameLoop() {
  ballX += velocityX;

  // update lapangan golf
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, 800, 600);

  // update bola
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.arc(ballX, 385, 20, 0, Math.PI * 2);
  ctx.fill();

  requestAnimationFrame(gameLoop);
}

gameLoop();
