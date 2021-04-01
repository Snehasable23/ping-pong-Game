var pX, pX, pW, pH, pV;
var cX, cY, cV
var bX, bY, bD, vX, vY, vMax;
var maxAngle;
var pScore, cScore;
var freeze, started;

function setup() {
  createCanvas(600, 400);
  restart();
  
  maxAngle = 75/180 * PI;
  
  pScore = 0;
  cScore = 0;
  mode=0;
}

function restart() {
  pW = 20;
  pH = 100;
  pX = 0;
  pY = height/2;
  pV = 0;   //paddle's velocity
  
  cX = width -pW;
  cY = height/2;
  cV = 0;
  
  bX = width/2;
  bY = height/2;
  bD = height/20;  //ball's diameter
  
  vMax = 7;
  vX = 0;
  vY = 0;
  
  freeze = true;
}

function draw() {
  clear();
  if(mode==0) {
    background(0);
    fill(255,0,255);
    textSize(24);
    text('Press Enter to continue',170,180);
    fill(255,0,0);
    textSize(18);
    text('Keys to control left paddle: w & s',165,300);
    text('Keys to control right paddle: i & j',165,350);
  }
  
  if(mode==1) {
   background(0);
   //color of the line
   stroke(255);
  //size, thickness of the line
  //line(x1, y1, x2, y2)
  // line(300, 0, 300, 400);
  
  //draw dash lines for the net
  for(var i=0; i<height/10; i++) {
    var w = width/2;
    var h = height/10;
    line(w, h*i, w, height/20 + h*i);
  }
  
  //player
  // update paddle's position
  pY = pY + pV;
  //limit paddle's position
  if(pY<pH/2) {
    pY = pH/2;
  }
  if(pY>height-(pH/2)){
    pY = height-(pH/2);
  }
  noStroke();
  //fill the area with white color
  fill(255,0,255);
  //draw recangle x,y,width,height
  rect(pX,pY - pH/2,pW,pH);
  
  //computer
  // update paddle's position
  cY = cY + cV;
  //limit paddle's position
  if(cY<pH/2) {
    cY = pH/2;
  }
  if(cY>height-(pH/2)){
    cY = height-(pH/2);
  }
  //fill the area with white color
  fill(255,0,255);
  //draw recangle x,y,width,height
  rect(cX,cY - pH/2,pW,pH);
  
  //update ball's position
  bX = bX + vX;
  bY = bY + vY;
  
  //update ball's collision with player's paddle
  if(bX - bD/2 <= pX + pW && 
     bY >=pY - pH/2 &&
     bY <= pY + pH/2) {
    var range = (bY - pY) / (pH/2);
    var angle = range * maxAngle; // -1.3 to 1.3
    //update ball's velocity after collision
    vX = vMax * cos(angle);
    vY = vMax * sin(angle);
  }
  
  //update ball's collision with computer's paddle
  if(bX + bD/2 >= width - pW && 
     bY >=cY - pH/2 &&
     bY <= cY + pH/2) {
    var range = (bY - cY) / (pH/2);
    var angle = range * maxAngle; // -1.3 to 1.3
    //update ball's velocity after collision
    vX = -vMax * cos(angle);
    vY = -vMax * sin(angle);
  }
  
  //bounce back when hitting the walls
  if(bY + bD/2 >= height) {  //bottom wall
    vY *= -1;
    bY = height - bD/2;
  }
  if(bY - bD/2 <= 0) {  //top wall
    vY *= -1;
    bY = bD/2;
  }
  if(bX - bD/2 <= 0) {  //left wall
    vX *= -1;
    bX = bD/2;
    //computer score increases
    cScore++;
    //start a new game
    restart();
  }
  if(bX + bD/2 >= width) {  //right wall
    vX *= -1;
    bX = width-bD/2;
    //player score increases
    pScore++;
    //start a new game
    restart();
  }
  
  //draw ball
  fill(255);
  circle(bX,bY,bD);
  
  //chnage text size
  textSize(24);
  text('P1: '+pScore, 0.20*width, 0.25*height);
  text('P2: '+cScore, 0.70*width, 0.25*height);
  
  if(pScore>=2) {
    text('P1 wins',260,250);
    restart();
    text('Press Enter to continue',180,300);
    if (keyCode == 13){
     setup();
    }
  }
  if(cScore>=2) {
    text('P2 wins',260,250);
    restart();
    text('Press Enter to continue',180,300);
    if (keyCode == 13){
     setup();
    }
  }
  }
}

function keyPressed() {
  if(freeze == true) {
    vX = -vMax;
    vY = vMax;
    freeze = false;
  }
  if(key == 'w') {
    pV = -4;
  }
  if(key == 's') {
    pV = 4;
  }
  //demo for computer
  if(key == 'i') {
    cV = -4;
  }
  if(key == 'j') {
    cV = 4;
  }
  if(key == 'r') {
    restart();
    setup();
  }
  if(keyCode == ENTER) {
    setup();
    mode = 1;
  }
}