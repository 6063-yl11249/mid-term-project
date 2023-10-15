let size = 20;
let numSquares = 1500;
let squares = [];
let colors = ["pink", "lavender", "mediumslateblue", "lightcyan", "lightskyblue"];
rectMode(CENTER);

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  if (squares.length < numSquares) {
    let x = random(size, width - size);
    let y = random(size, height - size);
    let squareSize = size + random(-10, 10);
    let newSquare = {
      x: x,
      y: y,
      r: squareSize / 2,
      color: random(colors) // Select a random color from the 'colors' array
    };

    if (!isOverlapping(newSquare)) {
      squares.push(newSquare);
      fill(newSquare.color);
      rect(newSquare.x, newSquare.y, newSquare.r * 2, newSquare.r * 2);
    }
  }
}

function isOverlapping(newSquare) {
  for (let square of squares) {
    let d = dist(newSquare.x, newSquare.y, square.x, square.y);
    if (d < newSquare.r + square.r) {
      return true;
    }
  }
  return false;
}
