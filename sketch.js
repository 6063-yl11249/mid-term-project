let size = 30;
let numSquares = 300;
let squares = [];
let colors = ["#5d36e7", "#6e44ff", "#936bff", "#b892ff", "#dcaaf1"];
let colorIndex = 0;

let squareMouse = [];

let mFont;
let mSize = 120;
let word = "The Metaverse";

function preload() {
  mFont = loadFont("./Lostar.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
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
// Remove completely faded out ellipses
  squareMouse = squareMouse.filter(rect => rect.alpha > 0);

  //Add the mouse click function to create effect


  // Draw the lines
  let numLines = 12;
  for (let l = 0; l <= numLines; l += 1) {
    x0 = map(l, 0, numLines, 0, width);
    x1 = map(l, 0, numLines, (4 / 10) * width, (6 / 10) * width);
    x2 = map(l, 0, numLines, -width, 2 * width);
    noFill();
    stroke(255);
    line(x0, 0, x1, height / 2);
    line(x1, height / 2, x2, height);
  }
  //Make one side of lines moving with mouse

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
  text(word, width / 2, height / 2, width-300,height);
}
