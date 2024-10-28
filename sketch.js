let columns = [];
let numColumns = 5; 
let columnWidth = 50;
let ball;
let columnSpeed = 1.5;
let gameState = "start"; 
let score = 0;
let scoredColumns = []; 
function setup() {
  createCanvas(400, 400);
  resetGame();
   
  ball = {
    x: 100, 
    y: height - 30, 
    size: 20, 
    velocityY: 0, 
    gravity: 0.2,
    jumpStrength: 7, 
    isGrounded: false 
  };
}

function draw() {
  background('skyblue');
  
  if (gameState === "start") {
    drawStartScreen(); 
  } else if (gameState === "play") {
    playGame(); 
    displayScore();
  }
}

function drawStartScreen() {
  fill(255); 
  rect(0, 0, width, height); 

  fill(0); 
  textAlign(CENTER);
  textSize(32);
  text("Press SPACE to Start", width / 2, height / 2 - 20);
  textSize(16);
  text("Jump with SPACE", width / 2, height / 2 + 20);
}

function playGame() {
  // Move columns to the left
  for (let i = 0; i < columns.length; i++) {
    columns[i].x -= columnSpeed; 

    // Reset columns
    if (columns[i].x < -columnWidth) {
      columns[i].height = random(60, 250);
      columns[i].x = width + columnWidth;
      scoredColumns[i] = false; 
    }

    // Draw the column
    fill(233, 122, 125);
    rect(columns[i].x, height - columns[i].height, columnWidth, columns[i].height);
  }

  // ball gravity
  if (!ball.isGrounded) {
    ball.velocityY += ball.gravity;
    ball.y += ball.velocityY;
  }

  // collision with columns
  ball.isGrounded = false; 
  for (let i = 0; i < columns.length; i++) {
    if (
      ball.x > columns[i].x &&
      ball.x < columns[i].x + columnWidth &&
      ball.y + ball.size / 2 >= height - columns[i].height
    ) {
      // Ball lands on the column
      ball.y = height - columns[i].height - ball.size / 2; // Position on top of the column
      ball.velocityY = 0; // Reset vertical velocity
      ball.isGrounded = true; // Ball is grounded

      // Increase score only if this column hasn't been scored yet
      if (!scoredColumns[i]) {
        score++; // Increment score when landing on a column
        scoredColumns[i] = true; // Mark this column as scored
      }
      break; // Stop checking after landing on one column
    }
  }

  // Check if the ball touches the thin rectangle at the bottom
  if (ball.y + ball.size / 2 >= height - 10) {
    score = 0; // Reset score to zero
    ball.y = height - ball.size / 2;
    ball.velocityY = 0; 
    ball.isGrounded = true; 
  }

  // Clamp ball to ground level if it goes below
  if (ball.y + ball.size / 2 > height) {
    ball.y = height - ball.size / 2; // Keep ball on ground
    ball.velocityY = 0; // Reset vertical velocity
    ball.isGrounded = true; // Reset grounded status
  }

  // Draw the ball
  fill(255, 0, 0); // Color of the ball
  ellipse(ball.x, ball.y, ball.size, ball.size); // Draw the ball

  // Draw a thin rectangle at the bottom of the screen
  fill(0); // Color of the rectangle (black)
  rect(0, height - 10, width, 10); // Draw a thin rectangle at the bottom
}

function displayScore() {
  fill(0);
  textAlign(LEFT);
  textSize(32);
  text("Score: " + score, 10, 30);
}

function resetGame() {
  // Initialize column heights and scored status
  columns = [];
  scoredColumns = []; // Reset scored columns
  for (let i = 0; i < numColumns; i++) {
    columns.push({
      height: random(60, 250),
      x: i * (columnWidth + random(45, 55)), // X position based on index
    });
    scoredColumns.push(false); // Initialize all columns as not scored
  }

  score = 0;
}

function resetScoredColumns() {
  // Reset the scored status for all columns
  scoredColumns.fill(false);
}

function keyPressed() {
  if (gameState === "start" && key === ' ') {
    gameState = "play"; // Switch to the play state
  }

  if (gameState === "play") {
    if (key === ' ') { // Check if spacebar is pressed
      ball.velocityY = -ball.jumpStrength; // Jump up
      ball.isGrounded = false; // Ball is no longer grounded
    }
  }
}
