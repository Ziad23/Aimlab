var ball, score, ballImage
var balls, gameState, nextlevelball, nextlevelballs
var counter, enemy, enemies, numberofredballsthathavebeenclicked
function preload(){
ballImage = loadImage("blueball-removebg-preview.png")
enemyImage = loadImage("enemy.png")
zapSound = loadSound("zap.mp3")
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  score = 0
  gameState = 0
  counter = 100
  numberofredballsthathavebeenclicked = 0
  balls = createGroup()
  enemies = createGroup()
  nextlevelballs = createGroup()
}

function draw() {
  background("black");  
  randx = random(1,windowWidth-40)
  randy = random(1,windowHeight-40)
  enemyx = random(1,windowWidth-45)
  enemyy = random(1,windowHeight-45)
  textSize(23)
  text("Timer: " + counter, width-120, 30)
  fill("white")
  textSize(23)
  text("Score: " + score,20, 30)
  fill("white")
 
  spawnBalls()
  spawnEnemies()
 if(frameCount % 30 === 0 && counter > 0 && gameState === 0){
counter = counter - 1
 }
 if(counter <= 0){
  balls.setLifetimeEach(0)
  enemies.setLifetimeEach(0)
  gameState = 1
  textSize(32)
  text("Nice job, your score was " + score, width/2.6,height/2)
  text("Press r to retry", width/2.6, height/1.7)
 }
 if(numberofredballsthathavebeenclicked>2){
  balls.setLifetimeEach(0)
  enemies.setLifetimeEach(0)
  gameState = 1
  textSize(32)
  text("You hit too many red balls, your score was " + score, width/2.6,height/2)
  text("Press r to retry", width/2.6, height/1.7)
 }
 for(var ballNumber = 0;ballNumber < balls.length;ballNumber = ballNumber + 1){
if(mousePressedOver(balls.get(ballNumber)) && gameState === 0){
  balls.get(ballNumber).lifetime = 0
  score = score+2
}
 }
 for(var enemyNumber = 0;enemyNumber < enemies.length;enemyNumber = enemyNumber + 1){
  if(mousePressedOver(enemies.get(enemyNumber)) && gameState === 0){
    enemies.get(enemyNumber).lifetime = 0
    score = score-2
    zapSound.play()
    numberofredballsthathavebeenclicked = numberofredballsthathavebeenclicked+1
  }
   }
   for(var nextballnumber = 0;nextballnumber < nextlevelballs.length;nextballnumber = nextballnumber + 1){
    if(mousePressedOver(nextlevelballs.get(nextballnumber)) && gameState === 0){
      nextlevelballs.get(nextballnumber).lifetime = 0
    score = score+1
    }
     }
 if(keyDown("r") && gameState === 1){
   gameState = 0
   counter = 60
   score = 0
 }
 if(score>60){
   text("Level 2:",width/3,height/5)
   balls.setLifetimeEach(0)
  /* enemies.setLifetimeEach(0)*/
   nextLevel()
 }
  drawSprites();
}
function spawnBalls(){
  if(frameCount % 36 === 0 && counter > 0 && gameState === 0){
    ball = createSprite(randx,randy,40,40)
    ball.addImage("ball",ballImage)
    ball.scale = 0.365
    ball.lifetime = 200
    balls.add(ball)
  }
}
function spawnEnemies(){
  if(frameCount % 50 === 0 && counter>0 && gameState ===0 && counter<72){
    enemy = createSprite(enemyx,enemyy,40,40)
    enemy.addImage("enemyredball", enemyImage)
    enemy.scale = 0.23
    enemy.lifetime = 200
    enemies.add(enemy)
  }
}
function nextLevel(){
  if(frameCount %30 === 0 && counter>0 && gameState === 0 && counter<61){
    nextlevelball = createSprite(randx,randy,40,40)
    nextlevelball.addImage("ball",ballImage)
    nextlevelball.velocityX = Math.round(random(-5,5))
    nextlevelball.velocityY = Math.round(random(-5,5))
    nextlevelball.scale = 0.365
    nextlevelball.lifetime = 200
    nextlevelballs.add(nextlevelball)
  }
}

