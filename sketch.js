var backgroundImage,backgroundImg ;
var girl , girl_cycling,girl_collide;
var obstaclesGroup,obstacle1,obstacle2;
var invisibleGround;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;


function preload () {

backgroundImage = loadImage("Background.jpg");
girl_cycling = loadAnimation("PNG/girl1.png","PNG/girl2.png","PNG/girl3.png","PNG/girl4.png","PNG/girl5.png","PNG/girl6.png");

obstacle1 = loadImage("PNG/obstacle1.png");
  obstacle2 = loadImage("PNG/obstacle2.png");
  girl_collided = loadImage("PNG/Boom.png")

}

function setup (){
createCanvas (1200,800);
backgroundImg = createSprite (0,20,1200,600);
backgroundImg.addImage ("background",backgroundImage);
backgroundImg.scale=4;
//backgroundImg.x=backgroundImg.width/2;
backgroundImg.velocityX = -6;




girl = createSprite (100,600,600,300)
girl.scale = 1.5
girl.addAnimation ("cycling",girl_cycling)

girl_collide = createSprite (100,600,600,300)
girl_collide.scale = 1.5
girl_collide.addImage ("collide",girl_collided)
girl_collide.visible = false;


invisibleGround = createSprite(600,675,1500,10);
  invisibleGround.visible = false;
  
obstaclesGroup = new Group();
  



}

function draw (){
  
background (255)

 
if (gameState===PLAY){
  score = score + Math.round(getFrameRate()/60);
  background.velocityX = -(6 + 3*score/100);




    if (backgroundImg.x<10){

//backgroundImg.x = backgroundImg.width/2;
backgroundImg.x = 1000




}

if(keyDown("UP_ARROW") && (girl.y >= 159)) {
  girl.velocityY = -15;
}
girl.velocityY = girl.velocityY + 0.8

girl.collide(invisibleGround);
if(obstaclesGroup.isTouching(girl)){
  gameState = END;
}
}
else if (gameState === END) {
//gameOver.visible = true;
//restart.visible = true;

//set velcity of each game object to 0
backGround.velocityX = 0;
girl.velocityY = 0;
obstaclesGroup.setVelocityXEach(0);


girl_collide.visible = true;


//set lifetime of the game objects so that they are never destroyed
obstaclesGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(-1);

if(mousePressedOver(restart)) {
reset();
}
}
drawSprites()

spawnObstacles();

}


function spawnObstacles() {
    if(frameCount % 100 === 0) {
      var obstacle = createSprite(1300,650,600,300);
      //obstacle.debug = true;
      obstacle.velocityX = -6
      
      //generate random obstacles
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        default: break;
      }
      
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.7;
      
      obstacle.lifetime = 300;
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
    }
}