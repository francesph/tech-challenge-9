let gaps = [];
let columns = [];
let numColumns = 5; // Number of columns
let columnWidth = 50;
let ball;
let columnSpeed = 0.5;
let jumpDistance = 2; // Distance the ball moves forward when jumping

function setup() {
  createCanvas(400, 400);
  
  // Initialize column heights and gaps
  for (let i = 0; i < numColumns; i++) {
    columns.push({
      height: random(60, 250),
      x: i * (columnWidth + random(45, 55)), // X position based on index
    });
  }

  // Initialize the ball
  ball = {
    x: 100, // Initial X position
    y: height - 30, // Initial Y position near the bottom
    size: 20, // Diameter of the ball
    velocityY: 0, // Initial vertical velocity
    gravity: 0.2, // Gravity effect
    jumpStrength: 9, // Strength of the jump
    isGrounded: true, // Check if the ball is on the ground
    jumpCount: 0 // Track number of jumps
  };
}

function draw() {
  background('skyblue');

  // Move columns to the left
  for (let i = 0; i < columns.length; i++) {
    columns[i].x -= columnSpeed; // Move left

    // Reset column if it goes off-screen
    if (columns[i].x < -columnWidth) {
      columns[i].height = random(60, 250);
      columns[i].x = width + columnWidth;
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
      ball.jumpCount = 0; // Reset jump count on landing
      break; // Stop checking after landing on one column
    }
  }

  // Clamp ball to ground level if it goes below
  if (ball.y + ball.size / 2 > height) {
    ball.y = height - ball.size / 2; // Keep ball on ground
    ball.velocityY = 0; // Reset vertical velocity
    ball.isGrounded = true; // Reset grounded status
    ball.jumpCount = 0; // Reset jump count
  }

  // Draw the ball
  fill(255, 0, 0); // Color of the ball
  ellipse(ball.x, ball.y, ball.size, ball.size); // Draw the ball
}

function keyPressed() {
  if (key === ' ') { // Check if spacebar is pressed
    if (ball.isGrounded || ball.jumpCount < 1) { // Allow jump if grounded or first jump
      ball.velocityY = -ball.jumpStrength; // Jump up
      ball.isGrounded = false; // Ball is no longer grounded
      ball.jumpCount++; // Increment jump count
    }
  }

  // Move ball forward when the right arrow key is pressed
  if (keyCode === RIGHT_ARROW && ball.isGrounded) {
    ball.x += jumpDistance; // Move ball forward
    // Prevent moving off the right edge of the canvas
    if (ball.x + ball.size / 2 > width) {
      ball.x = width - ball.size / 2; // Clamp to the right edge
    }
  }
}
