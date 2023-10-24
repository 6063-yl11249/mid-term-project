let size = 30;
let numSquares = 300;
let squares = [];
let colors = ["#5d36e7", "#6e44ff", "#936bff", "#b892ff", "#dcaaf1"];
let colorIndex = 0;

let squareMouse = [];

let numLines = 16;
let startTime;
let speed = 0.5;

let mFont;
let mSize = 120;
let word = "The Metaverse";

class Square {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }

  update() {
    this.size -= 0.2;
  }

  display() {
    noStroke();
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  }
}

function preload() {
  mFont = loadFont("./Lostar.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  startTime = millis();
}

function draw() {
  background(0);

  drawLines();

  manageSquares();

  addText();

  drawSquareWithMouse();
}

function drawSquareWithMouse() {
  squareMouse.push({ x: mouseX, y: mouseY, alpha: 5 });
  if (squareMouse.length > 10) {
    squareMouse.shift();
  }

  for (let i = 0; i < squareMouse.length; i++) {
    let currentSquare = squareMouse[i];
    stroke("deeppink");
    strokeWeight(3);
    rect(currentSquare.x, currentSquare.y, 80, 80);
    currentSquare.alpha += 10;
    fill(255, currentSquare.alpha);
  }

  squareMouse = squareMouse.filter((rect) => rect.alpha > 0);
}

function drawLines() {
  let currentTime = millis() - startTime;
  strokeWeight(1);
  for (let i = 0; i <= numLines; i++) {
    let x0 = map(i, 0, numLines, 0, width);
    let t = sin(currentTime * 0.001 * speed + PI / 2);
    let x1Initial = map(i, 0, numLines, (4 / 10) * width, (6 / 10) * width);
    let x2 = map(i, 0, numLines, 0, width);
    let x1 = x1Initial;

    if (i <= numLines / 2) {
      let moveDistance = map(abs(t), 0, 1, 0, (4 / 10) * width);
      if (t > 0) {
        x1 = max(x0, x1Initial - moveDistance);
      } else {
        x1 = min(x1Initial, x1Initial + moveDistance);
      }
    } else {
      let moveDistance = map(abs(t), 0, 1, 0, width - (6 / 10) * width);
      if (t > 0) {
        x1 = min(x1Initial + moveDistance, x0);
      } else {
        x1 = max(x1Initial - moveDistance, x1Initial);
      }
    }

    line(x0, 0, x1, height / 2);
    line(x1, height / 2, x2, height);
  }
}

function addText() {
  textFont(mFont);
  textSize(mSize);
  fill("#cdb4db");
  stroke("#ffc8dd");
  strokeWeight(8);
  strokeJoin(ROUND);
  textAlign(CENTER, CENTER);
  text(word, width / 2, height / 2, width - 300, height);
}

function manageSquares() {
  rectMode(CENTER);
  for (let i = squares.length - 1; i >= 0; i--) {
    let square = squares[i];
    square.update();

    if (square.size <= 0) {
      squares.splice(i, 1);
    } else {
      square.display();
    }
  }

  if (squares.length < numSquares) {
    let x = random(size, width - size);
    let y = random(size, height - size);
    let squareSize = size + random(-10, 10);
    let newSquare = new Square(x, y, squareSize, color(colors[colorIndex]));

    colorIndex = (colorIndex + 1) % colors.length;

    squares.push(newSquare);
    newSquare.display();
  }
}
