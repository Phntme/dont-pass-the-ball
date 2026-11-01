const gameCanvas = document.getElementById("game-canvas");
const ctx = gameCanvas.getContext("2d");
const friction = 0.99;
gameCanvas.style.cursor = "grab";

// user input init
let startX = 0;
let startY = 0;

let isDragging = false;
let isMove = false;
let currentY = 0;
let currentX = 0;

// bola
let ball = {
  x: 175,
  y: 300,
  r: 15,
  vx: 0,
  vy: 0,
};

// bumper
let bumper = {
  x: 300,
  y: 150,
  w: 20,
  h: 300,
  color: "#2D3047",
};

// lubang
let hole = {
  x: 700,
  y: 300,
  r: 20,
  color: "#FFDBB5",
};

//nyawa
let lives = 3;

// uang
let cash = 0;

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

  // check movement bola
  if (Math.abs(ball.vy) < 0.1 && Math.abs(ball.vx) < 0.1) {
    ball.vy = 0;
    ball.vx = 0;
    isMove = false;
  }
}

function draw() {
  // update lapangan golf
  ctx.fillStyle = "#419D78";
  ctx.fillRect(0, 0, 800, 600);

  // draw bumper
  ctx.fillStyle = bumper.color;
  ctx.fillRect(bumper.x, bumper.y, bumper.w, bumper.h);

  // draw hole
  ctx.beginPath();
  ctx.fillStyle = hole.color;
  ctx.arc(hole.x, hole.y, hole.r, 0, Math.PI * 2);
  ctx.fill();

  // update bola
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fill();

  // draw line aim
  if (isDragging) {
    // ghost ball
    let gvx = (startX - currentX) * 0.1;
    let gvy = (startY - currentY) * 0.1;

    let gx = ball.x;
    let gy = ball.y;

    // draw
    ctx.beginPath();
    ctx.moveTo(gx, gy);

    for (let i = 0; i < 48; i++) {
      gx += gvx;
      gy += gvy;

      gvx *= friction;
      gvy *= friction;

      // ghost aadb collision
      // check ball x position
      if (gx + ball.r > gameCanvas.width) {
        gx = gameCanvas.width - ball.r;
        gvx *= -1;
      } else if (gx - ball.r < 0) {
        gx = ball.r;
        gvx *= -1;
      }
      // check ball y position
      if (gy + ball.r > gameCanvas.height) {
        gy = gameCanvas.height - ball.r;
        gvy *= -1;
      } else if (gy - ball.r < 0) {
        gy = ball.r;
        gvy *= -1;
      }

      ctx.lineTo(gx, gy);
    }

    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "white";
    ctx.lineWidth = "3";
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// mouse interact function
gameCanvas.addEventListener("mousedown", (e) => {
  if (!isMove) {
    isDragging = true;
    gameCanvas.style.cursor = "grabbing";
    startX = e.offsetX;
    startY = e.offsetY;

    currentX = startX;
    currentY = startY;
  }
});

gameCanvas.addEventListener("mouseup", (e) => {
  if (isDragging) {
    isDragging = false;
    gameCanvas.style.cursor = "grab";
    let dx = startX - e.offsetX;
    let dy = startY - e.offsetY;

    ball.vx = dx * 0.1;
    ball.vy = dy * 0.1;
    isMove = true;
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
