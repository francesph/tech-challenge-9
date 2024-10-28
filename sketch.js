let columns = [];
let gaps = [];
let numColumns = 6; // Number of columns
let speed = 1; // Speed of movement
let columnWidth = 50;
let totalWidth = 0;



function setup() {
  createCanvas(400, 400);
  
  // Initialize column heights and gaps
  for (let i = 0; i < numColumns; i++) {
    columns.push(random(60, 250)); // Random height for each column
    gaps.push(random(45,55)); // Random gap size between columns
  }
}

function draw() {
  background('skyblue');


  // Move columns to the left
  let xOffset = 0; // Start x position offset
  for (let i = 0; i < numColumns; i++) {
    // Calculate the x position of the column
    let x = (frameCount * speed + xOffset) % (width + gaps.reduce((a, b) => a + b, 0)); // Move left
    
    // Draw the column
    fill(233, 122, 125); // Random color
    rect(x, height - columns[i], columnWidth, columns[i]); // Draw the rectangle
    
    // Update the xOffset for the next column
    xOffset += columnWidth + gaps[i]; // Add column width and gap

    // Reset the column height if it moves off-screen
    if (x + columnWidth < 0) {
      columns[i] = random(20, 250);
      gaps[i] = random(10, 20); // Reset gap size
    }
  }
}
