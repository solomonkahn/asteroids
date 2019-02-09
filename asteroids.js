//ship
var xPositions = [-16,16,0];
var yPositions = [15,14,-27];
var xCentre = 0;
var yCentre = 0; 
//rocks
var rockSpawnX1 = random(-200,0);
var rockSpawnX2 = random(0,150);
var rockSpawnX3 = random(-200,50);
var rockSpawnX4 = random(50,150);
var rockSpawnX5 = random(0,170);
var rockSpawnX6 = random(-100,100);

var rockSpawnY1 = random(-200,-50);
var rockSpawnY2 = random(70,150);
var rockSpawnY3 = random(80,150);
var rockSpawnY4 = random(-200,-70);
var rockSpawnY5 = random(-200,0);
var rockSpawnY6 = random(-100,150);


var x = 0;
var y = 0;
var d;
var directionX = [random(1,2),random(1,2),random(1,2),random(1,2),random(1,2),random(1,2)];
var directionY = [random(1,2),random(1,2),random(1,2),random(1,2),random(1,2),random(1,2)];

var rockX = [rockSpawnX1,rockSpawnX2,rockSpawnX3,rockSpawnX4,rockSpawnX5,rockSpawnX6];
var rockY = [rockSpawnY1,rockSpawnY2,rockSpawnY3,rockSpawnY4,rockSpawnY5,rockSpawnY6];



var xBall = 5;
var yBall = 5;
var wBall = 1;
var hBall = 1;
var shoot = false;
var hit = false;
var ballDistance;
var oldballX;
var oldballY;
var xOrigin = 100;
var yOrigin = 100;

var speed = 0;
var rotateNum = 1;
var rotatenumBall = 1;
var dis = dist(0,0,xBall,yBall);
var realballX;
var realballY;
var move = false;
var distance;
var counter = 0;
var lives = 3;
var gameOver = false;
var keys = [];
var keyPressed = function() { 
  keys[keyCode] = true;
};
 
var keyReleased = function() { 
  keys[keyCode] = false; 
};


var movement = function(){
      
    if (keyIsPressed && keys[RIGHT]) {
       rotateNum += 2;
    }
    
    if (keyIsPressed && keys[LEFT]) {
        rotateNum -= 2;
    }
        
    if ((keyIsPressed && keys[UP]) === true && speed <= 9) {
        move = true;
        speed += 0.05;

    }
  if (((keyIsPressed && keys[UP]) === false) && speed >= 0 && move === true) {
         
        speed -= 0.03;
    }
     yCentre -= (sin(rotateNum - 270)) * speed;
     xCentre -= (cos(rotateNum - 270)) * speed;
};

var end = function(){ 
    background(230, 0, 0);
    textSize(30);
    text("GAME OVER",-88,-30);
    textSize(20);
    text("Your Score Was: " + counter, -91,0);
    textSize(15);
    text("Press the restart button to play again", -104,186);
    
};


var draw = function() {
         
  
    background(0, 0, 0);
    movement();
    noFill();
    stroke(255, 255, 255);
     if (keyIsPressed && keys[ALT]) {
         playSound(getSound("retro/laser1"));
        shoot = true;
     }
    
     if (shoot === true){ 
         rotatenumBall += 0;
         d = 5;
         yBall -= (sin(rotatenumBall - 270)) * d;
         xBall -= (cos(rotatenumBall - 270)) * d;
         wBall = 3;
         hBall = 3;
         if ((dist(xCentre,yCentre,xBall,yBall) >= 150) || hit === true){
              xBall = 0;
              yBall = 0;
              shoot = false; 
              hit = false;
         }
     }
     
     if (shoot === false){
         rotatenumBall = rotateNum;
         xBall = xCentre;
         yBall = yCentre; 
         wBall = 1;
         hBall = 1;
     }
         
    

  
    translate(xOrigin,yOrigin);
    
    translate(xCentre, yCentre);
    rotate(rotateNum);
    triangle(xPositions[0],yPositions[0], xPositions[1],yPositions[1], xPositions[2], yPositions[2]); 
    rotate(-rotateNum);
    translate(-xCentre,-yCentre);
  
     translate(xBall, yBall);
   
    
    rotate(rotatenumBall);
    ellipse(x, y - 26, wBall,hBall);
    
   
    rotate(-rotatenumBall);
  
     translate(-xBall,-yBall);
 
  if (xCentre >215){
       xCentre = -215;
   }
   if (xCentre <-215){
       xCentre = 215;
   }
   if (yCentre < - 215){
       yCentre = 215;
   }
    if (yCentre >215){
       yCentre = -215;
   }

    if (xBall >200){
       xBall = -200;
   }
   if (xBall <-200){
       xBall = 200;
   }
   if (yBall < - 200){
       yBall = 200;
   }
    if (yBall >200){
       yBall = -200;
   }
  
   
 
   ellipse(rockX[0], rockY[0], 60,60);
   
   ellipse(rockX[1], rockY[1], 60,60);
   ellipse(rockX[2], rockY[2], 60,60);
   ellipse(rockX[3], rockY[3], 60,60);
   ellipse(rockX[4], rockY[4], 60,60);
   ellipse(rockX[5], rockY[5], 60,60);
    for (var i = 0; i < rockX.length; i++) {
          
        if (directionX[i] >= 1.5){
           rockX[i] -= 1.5;}
        if (directionX[i] <= 1.5 ){
           rockX[i] += 1.5;}
        if (rockX[i] >230){
           rockX[i] = -230;}
  
        if (rockX[i] <-230){
           rockX[i] = 230;}
       
       
        if (directionY[i] >= 1.5){
           rockY[i] -= 1;}   
        if (directionY[i] <= 1.5){
           rockY[i] += 1;}
          
        if (rockY[i] < -230){
            rockY[i] = 200; }
        if (rockY[i] >250 && rockY[i] < 300){
            rockY[i] = -230;}
    }
      
     for (var i = 0; i < rockY.length; i++) {
         distance = dist(rockX[i], rockY[i], xCentre,yCentre);
     if (distance <= 45 && gameOver === false){
         xCentre = 0;
         yCentre = 0;
         lives -= 1;
         playSound(getSound("retro/boom1"));
         gameOver = true;
         
     }
        
     }
     
  for (var i = 0; i < rockY.length; i++) {
         ballDistance = dist(rockX[i],rockY[i], xBall, yBall);
     if (ballDistance <= 60 && shoot === true && gameOver === false){
         hit = true;
        rockX[i] = random(-200,200);
        if (i < 3){
        rockY[i] = 350;}
        else{
        rockY[i] = -420;}
        counter += 50;
        playSound(getSound("retro/boom2"));
       
     }
  }
  
  
   if (gameOver === false){
    text("Score: " + counter , -190,-175); }
   
 if (gameOver === true){
       end();
 }
};
