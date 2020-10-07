
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var ground;
var survivalTime=0;


function preload(){
  
  
  monkey_running =        loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {


  monkey = createSprite(50,350,20,50);
  monkey.addAnimation("running", monkey_running);
  
  monkey.scale = 0.1;
 
 ground = createSprite(400,350,900,10);
  ground.x = ground.width /2;
  ground.velocityX=-2;
  
  score=0;
  
  foodGroup=new Group();
  obstacleGroup=new Group();
}
 
function draw() {
   background(180);
  if(keyDown("space") && monkey.y>=100) {
    monkey.velocityY = -15;
  }
 monkey.velocityY=monkey.velocityY+0.8;
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  monkey.collide(ground);
  
  stroke("white");
  textSize(10);
  fill("white");
  text("Score:"+score,350,20);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=survivalTime+Math.ceil(frameRate()/70)
  text("Survival Time:"+survivalTime,120,50);
  
  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
      score=score+2;
      
    }  
   
  
  if(monkey.isTouching(obstacleGroup)){
    monkey.velocityY=0;
  foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    survivalTime=0;
    score=0;
  }
  
  
  
  
  foodBanana();
  enemyObstacle();
  
  
  drawSprites();
}

function foodBanana() {
  if(frameCount%80===0){
  var banana = createSprite(600,250,40,10);
  banana.y=random(120,200)
  banana.addImage(bananaImage);
  banana.velocityX = -3;
  banana.lifetime = 300;
  banana.scale = 0.1;
  foodGroup.add(banana);
}
}

function enemyObstacle() {
  if(frameCount%300===0){
  var obstacle = createSprite(800,320,10,40);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX= -3;
  obstacle.lifetime = 300;
  obstacle.scale = 0.1;
  obstacleGroup.add(obstacle);
}
}

