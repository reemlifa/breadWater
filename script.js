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
  catcherImg = loadImage("assets/water.png");
  fallingObjectImg = loadImage("assets/bread.png");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400, 400);
  background("#494841");


  // enter button 
  enterButton = new Sprite(width / 2, height / 2 + 30);
  enterButton.w = 150;
  enterButton.h = 65;
  enterButton.collider = "kinematic";
  enterButton.color = 'plum';
  enterButton.text = "enter";


  // move play and retry button off screen
  playButton = new Sprite(-500, -500);
  retryButton = new Sprite(-500, -500);
  screen = 0;

  //Create catcher 
  catcher = new Sprite(catcherImg, -200, -340, 60, 50, "kinematic");

  //Create falling object
  fallingObject = new Sprite(fallingObjectImg, random(width), -150, -150, 20);
  fallingObject.collider = "kinematic";

  catcherImg.resize(60, 0);
  fallingObjectImg.resize(60, 0);

  // resetFallingObject();
}

function resetFallingObject() {
  let randomObject = random([fallingObjectImg]);
  fallingObject = new Sprite(randomObject, random(width), 150, 150, 20);
  fallingObject.rotationLock = true;
}


/* DRAW LOOP REPEATS */
function draw() {

  if (screen == 0) { // just need to put text back in screen 0 instead of setup()
    fill("#FFFADD");
    textAlign(CENTER);
    textSize(50);
    text("BreadWater", width / 2, height / 2 - 75);
    if (enterButton.mouse.presses()) {
      print("pressed");
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
    background("#494841"); // This makes sure the background is always the bottom most layer and the trailing effect goes away thank you!! yeah ofc lmk if the water thing doesnt work ill come back to it ill mark it as solved for now


    if (retryButton.mouse.presses()) {
      showScreen0();
      screen = 0;
    }

    //If fallingObject reaches bottom, move back to top
    if (fallingObject.y >= height) {
      fallingObject.y = 0;
      fallingObject.x = random(width);
      fallingObject.vel.y = random(1,5);
    }


    //Move catcher
    if (kb.pressing("left")) {
      catcher.vel.x = -3;
    } else if (kb.pressing("right")) {
      catcher.vel.x = 3;
    } else {
      catcher.vel.x = 0;
    }

    //Stop catcher at edges of screen
    if (catcher.x < 50) {
      catcher.x = 50;
    }
    else if (catcher.x > 350) {
      catcher.x = 350;
    }

    //If fallingObject collides with catcher, move back to top
    if (fallingObject.collides(catcher)) {
      fallingObject.y = 0;
      fallingObject.x = random(width);
      fallingObject.vel.y = random(1,5);
      fallingObject.direction = "down";
      score = score + 1;
    } 
    if (fallingObject.y >= 398) {
      score = score - 1;
    }
  }
}


/* FUNCTIONS TO DISPLAY SCREENS */

// You just had to get the enter button back onto the screen and remove the retry button! Got it thank you!
// how did you get the water to not repeat by the way?
// line 81
function showScreen0() {
  enterButton.pos = { x: width / 2, y: height / 2 + 30 };
  retryButton.x = 1000;

  // Remove bread and water off the screen as well here:

  // i just want the bread and water removed from screen 0 and 1 
  catcher.pos = { x: -500, y: -500 };
  fallingObject.pos = { x: -500, y: -500 };
}


function showScreen1() {
  background("#494841");
  textSize(20);
  text("The rules of the game go in here",
    width / 2,
    height / 2 - 50);
  // put the enter button off screen
  enterButton.pos = { x: -100, y: -100 };
  // put the play button on screen
  playButton.pos = { x: width / 2, y: height / 2 + 50 };
  playButton.w = 150;
  playButton.h = 65;
  playButton.collider = "kinematic";
  playButton.color = 'plum';
  playButton.text = "Play";
}

function showScreen2() {
  background("#494841");
  retryButton.pos = { x: 350, y: 35 };
  retryButton.w = 80;
  retryButton.h = 30;
  retryButton.collider = "kinematic";
  textSize(10);
  retryButton.text = 'retry';
  textSize(20);
  text("The game goes in here",
    width / 2,
    height / 2 - 50);

  // put the play button off screen
  playButton.pos = { x: -100, y: -100 };

  // put catcher back on position
  catcher.pos = { x: 200, y: 340 };
  fallingObject.pos = { x : random(width), y: 20 }
  fallingObject.vel.y = random(1, 5); 
}
