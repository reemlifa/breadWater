/* VARIABLES */
let enterButton;
let playButton;
let screen = 0;
let retryButton;
let catcher, fallingObject;
let catcherImg, fallingObjectImg;
let score = 0;

/* PRELOAD LOADS FILES */
function preload() {
  catcherImg = loadImage("./water.png", 
    img => console.log("✅ Catcher image loaded successfully!", img), 
    err => console.log("❌ Error loading catcher image", err)
  );

  fallingObjectImg = loadImage("./bread.png", 
    img => console.log("✅ Falling object image loaded successfully!", img), 
    err => console.log("❌ Error loading falling object image", err)
  );
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400, 400);
  background("#494841");

  // Enter button 
  enterButton = new Sprite(width / 2, height / 2 + 30);
  enterButton.w = 150;
  enterButton.h = 65;
  enterButton.collider = "kinematic";
  enterButton.color = 'plum';
  enterButton.text = "Enter";

  // Move play and retry buttons off-screen
  playButton = new Sprite(-500, -500);
  retryButton = new Sprite(-500, -500);
  retryButton.layer = 1; // Ensure it's on a separate layer so objects ignore it
  screen = 0;

  // Create catcher 
  catcher = new Sprite(catcherImg, -500, -500, 60, 50, "kinematic"); // Start off-screen
  catcherImg.resize(60, 0);
  catcher.debug = true;

  // Create falling object (start off-screen)
  fallingObject = new Sprite(fallingObjectImg, -500, -500, 20, 20);
  fallingObject.collider = "dynamic";
  fallingObject.vel.y = 0; // Initially not falling
  fallingObject.vel.x = 0; // Ensure no sideways movement
  fallingObject.rotationLock = true; // Prevent any rotation
  fallingObject.layer = 0; // Different layer than retry button to ignore collisions
  fallingObject.debug = true;
  fallingObjectImg.resize(60, 0);
}

/* DRAW LOOP REPEATS */
function draw() {
  if (screen == 0) {
    background("#494841");
    fill("#FFFADD");
    textAlign(CENTER);
    textSize(50);
    text("BreadWater", width / 2, height / 2 - 75);

    if (enterButton.mouse.presses()) {
      showScreen1();
      screen = 1;
    }
  }

  if (screen == 1) {
    background("#494841");

    if (playButton.mouse.presses()) {
      showScreen2();
      screen = 2;
    }
  }

  if (screen == 2) {
    background("#494841");

    if (retryButton.mouse.presses()) {
      showScreen2(); // Restart the game without affecting falling object
      screen = 2;
    }

    // Move catcher
    if (kb.pressing("left")) {
      catcher.vel.x = -3;
    } else if (kb.pressing("right")) {
      catcher.vel.x = 3;
    } else {
      catcher.vel.x = 0;
    }

    // Keep catcher within screen bounds
    catcher.x = constrain(catcher.x, 50, width - 50);

    // If fallingObject reaches bottom, reset it and decrease score
    if (fallingObject.y >= height) {
      resetFallingObject();
      score -= 1;
    }

    // If fallingObject collides with catcher, reset position and increase score
    if (fallingObject.collides(catcher)) {
      print("Collision detected!");
      resetFallingObject();
      score += 1;
    }
  }
}

/* FUNCTIONS TO DISPLAY SCREENS */
function showScreen0() {
  enterButton.pos = { x: width / 2, y: height / 2 + 30 };
  retryButton.x = 1000;

  // Remove bread and water off the screen
  catcher.pos = { x: -500, y: -500 };
  fallingObject.pos = { x: -500, y: -500 };
  fallingObject.vel.y = 0;
  fallingObject.vel.x = 0;
}

function showScreen1() {
  background("#494841");
  textSize(20);
  text("The rules of the game go in here", width / 2, height / 2 - 50);

  // Hide enter button, show play button
  enterButton.pos = { x: -100, y: -100 };
  playButton.pos = { x: width / 2, y: height / 2 + 50 };
  playButton.w = 150;
  playButton.h = 65;
  playButton.collider = "kinematic";
  playButton.color = 'plum';
  playButton.text = "Play";
}

function showScreen2() {
  background("#494841");

  // Retry button should not block falling objects
  retryButton.pos = { x: 350, y: 35 };
  retryButton.w = 50;
  retryButton.h = 30;
  retryButton.collider = "kinematic"; // Keep it interactive
  retryButton.layer = 1; // Move it to a separate layer
  retryButton.text = 'Retry';

  // Hide play button
  playButton.pos = { x: -100, y: -100 };

  // Reset catcher position
  catcher.pos = { x: 200, y: 340 };

  // Reset falling object position properly
  resetFallingObject();
}

/* RESET FALLING OBJECT FUNCTION */
function resetFallingObject() {
  fallingObject.pos = { x: random(50, 300), y: 0 }; // Ensure it starts in the center 300px
  fallingObject.vel.y = random(1, 5); // Set a random downward velocity
  fallingObject.vel.x = 0; // Ensure no sideways movement
  fallingObject.rotationLock = true; // Prevent any unwanted rotation
}
