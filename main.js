const gameCanvas = document.getElementById("game-canvas");
const ctx = gameCanvas.getContext("2d");

// lapangan golf
ctx.fillStyle = "green";
ctx.fillRect(0, 0, 800, 600);

// bola
ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(175, 385, 20, 0, Math.PI * 2);
ctx.fill();
