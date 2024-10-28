let columns = [];
let numColumns = 5; 
let columnWidth = 50;
let ball;
let columnSpeed = 1;
let gameState = "start"; 
let score = 0;
let scoredColumns = []; // Track which columns have been scored

function setup() {
  createCanvas(400, 400);
  resetGame();
   
  ball = {
    x: 100, // Initial X position
    y: height - 30, // Initial Y position near the bottom
    size: 20, // Diameter of the ball
    velocityY: 0, // Initial vertical velocity
    gravity: 0.2, // Gravity effect
    jumpStrength: 7, // Strength of the jump
    isGrounded: false // Check if the ball is on the ground
  };
}

function draw() {
  background('skyblue');
  
  if (gameState === "start") {
    drawStartScreen(); // Draw the start screen
  } else if (gameState === "play") {
    playGame(); // Run the game logic
    displayScore();
  }
}

function drawStartScreen() {
  fill(255); // White background for start screen
  rect(0, 0, width, height); // Draw the background

  fill(0); // Black text
  textAlign(CENTER);
  textSize(32);
  text("Press SPACE to Start", width / 2, height / 2 - 20);
  textSize(16);
  text("Jump with SPACE", width / 2, height / 2 + 20);
}

function playGame() {
  // Move columns to the left
  for (let i = 0; i < columns.length; i++) {
    columns[i].x -= columnSpeed; // Move left

    // Reset column if it goes off-screen
    if (columns[i].x < -columnWidth) {
      columns[i].height = random(60, 250);
      columns[i].x = width + columnWidth;
      scoredColumns[i] = false; // Reset scored status for the column
    }

    // Draw the column
    fill(233, 122, 125); // Column color
    rect(columns[i].x, height - columns[i].height, columnWidth, columns[i].height);
  }

  // Apply gravity to the ball
  if (!ball.isGrounded) {
    ball.velocityY += ball.gravity; // Apply gravity
    ball.y += ball.velocityY; // Move down
  }

  // Check for collision with columns
  ball.isGrounded = false; // Assume the ball is in the air
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

  // Reset ball if it goes below the ground
  if (ball.y > height) {
    ball.y = height - 30; // Reset ball position
    ball.velocityY = 0; // Reset vertical velocity
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
 