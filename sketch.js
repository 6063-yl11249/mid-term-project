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

function preload() {
  mFont = loadFont("./Lostar.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  startTime = millis();
}

function draw() {
  background(0);

  //Draw the square moving with mouse
  squareMouse.push({ x: mouseX, y: mouseY, alpha: 5 });
  if (squareMouse.length > 10) {
    squareMouse.shift();
  }

  for (let i = 0; i < squareMouse.length; i++) {
    let currentSquare = squareMouse[i];
    stroke("deeppink");
    rect(currentSquare.x, currentSquare.y, 80, 80);
    currentSquare.alpha += 10;
    fill(255, currentSquare.alpha);
  }
  // Remove completely faded out squares
  squareMouse = squareMouse.filter((rect) => rect.alpha > 0);

  // Draw the lines
  let currentTime = millis() - startTime;

  for (let i = 0; i <= numLines; i++) {
    let x0 = map(i, 0, numLines, 0, width); 
    let t = sin(currentTime * 0.001 * speed + PI / 2); // Adjust the speed factor with a phase shift
    let x1Initial = map(i, 0, numLines, (4 / 10) * width, (6 / 10) * width);
    let x2 = map(i, 0, numLines, 0, width);
    let x1 = x1Initial;

    if (i <= numLines / 2) {
      // Move to the left for the first half
      let moveDistance = map(abs(t), 0, 1, 0, (4 / 10) * width);
      if (t > 0) {
        x1 = max(x0, x1Initial - moveDistance);
      } else {
        x1 = min(x1Initial, x1Initial + moveDistance);
      }
    } else {
      // Move to the right for the second half
      let moveDistance = map(abs(t), 0, 1, 0, (4 / 10) * width);
      if (t > 0) {
        x1 = min(x2, x1Initial + moveDistance);
      } else {
        x1 = max(x1Initial, x1Initial - moveDistance);
      }
    }

    let y1 = height / 2;
    line(x0, 0, x1, y1);
    line(x1, y1, x2, height);
  }

  // Create the squares fade in/ out
  rectMode(CENTER);
  noStroke();
  for (let i = squares.length - 1; i >= 0; i--) {
    let square = squares[i];

    square.r -= 0.2;

    // If the square's size is less than or equal to 0, remove it from the array
    if (square.r <= 0) {
      squares.splice(i, 1);
    } else {
      fill(square.color);
      rect(square.x, square.y, square.r, square.r);
    }
  }

  if (squares.length < numSquares) {
    let x = random(size, width - size);
    let y = random(size, height - size);
    let squareSize = size + random(-10, 10);
    let newSquare = {
      x: x,
      y: y,
      r: squareSize,
      color: color(colors[colorIndex]),
    };

    colorIndex = (colorIndex + 1) % colors.length;

    squares.push(newSquare);
    fill(newSquare.color);
    rect(newSquare.x, newSquare.y, newSquare.r, newSquare.r);
  }

  //Add text of the book title
  textFont(mFont);
  textSize(mSize);
  fill(255);
  textAlign(CENTER, CENTER);
  text(word, width / 2, height / 2, width - 300, height);
}
