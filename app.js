const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsFill");
const save = document.getElementById("jsSave");

const CANVAS_SIZE = 500;
const INITIALIZING_COLOR = "#2c2c2c";

ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIALIZING_COLOR;
ctx.fillStyle = INITIALIZING_COLOR;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else if (!filling) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function changeColors(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
function handleRange(event) {
  ctx.lineWidth = event.target.value;
}
function handleFillMode() {
  if (filling) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}
function handleCanvasClick(event) {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM(event) {
  event.preventDefault();
}
function handleSave() {
  const image = canvas.toDataURL("image/jpeg");
  link = document.createElement("a");
  link.href = image;
  link.download = "hello.jpg";
  link.click();
}
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", changeColors)
);

if (range) {
  range.addEventListener("input", handleRange);
}

if (mode) {
  mode.addEventListener("click", handleFillMode);
}
if (save) {
  save.addEventListener("click", handleSave);
}
