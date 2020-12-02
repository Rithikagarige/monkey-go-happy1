var PLAY=1;
var END=0;
var gameState=PLAY;

var monkey , monkey_running
var  bananaImage, obstacleImage,ground,invisibleGround;
var FoodGroup, obstacleGroup;
var score;

function preload(){

monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_collided=loadAnimation("sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,200);
  monkey=createSprite(50,180,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;
   
  ground=createSprite (200,190,900,10);
  ground.velocityX=-6;
  ground.x=ground.width/2;
  
  invisibleGround=createSprite(200,190,400,10);
  invisibleGround.visible=false;
  
  
  score=0;
  
  FoodGroup= createGroup();
  obstacleGroup=createGroup();
}


function draw() {
background(220);
  
  text("score="+ score,500,50);
  
   monkey.collide(invisibleGround);
  
  if (gameState===PLAY){
    
  monkey.velocityY= monkey.velocityY + 0.8;
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
    spawnBananas();
  spawnObstacles();
  
 
  
  if(keyDown("space")&& monkey.y >= 153){
   monkey.velocityY=-13;
 }
  
  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
  }
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score=score+1;
    }
  }
    else if(gameState===END){
      ground.velocityX=0;
      monkey.changeAnimation("monkey", monkey_collided);
      obstacleGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      
      
      
    }  
  drawSprites();
}

function spawnObstacles(){
  if (frameCount% 100===0){
    var obstacle= createSprite(600,180,20,20);
    //obstacle=Math.round(random(150,200));
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-6;
    
    obstacleGroup.add(obstacle);
  }
}

function spawnBananas(){
 if(frameCount % 100===0){
   var bananas=createSprite(600,120,40,20);
   bananas.y=Math.round(random(100,150));
   bananas.addImage(bananaImage);
   bananas.scale=0.1;
   bananas.velocityX=-4;
   
   FoodGroup.add(bananas);
 } 
}


