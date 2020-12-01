var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score=0;
var ground;
var survivalTime=0;
var play=0;
var end=1;
var gameState=play;
var gameState=end;


function preload(){
  
  
    monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600,400);
  
  monkey=createSprite(50,315,10,10);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,1200,10);
  ground.velocityX=-2;
  ground.x=ground.width/2;
  
  bananaGroup=new Group();
  obstacleGroup=new Group();
  
   
}


function draw() {
  background("white");
  
    stroke("black");
    textSize(20);
    fill("black");
    text("score: "+score,450,50);

    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate())
    text("survivalTime:"+survivalTime,100,50);
  

    if(ground.x<0){
    ground.x=ground.width/2;
    }
  
    if(keyDown("space")){
      monkey.velocityY=-12;
    }

   if(bananaGroup.isTouching(monkey)){
    
      
      for (var k = 0; k < bananaGroup.length; k++) {
       if ( bananaGroup.contains( bananaGroup.get(k))) {
       if ( monkey.isTouching( bananaGroup.get(k))) {
          bananaGroup.get(k).destroy();
           score = score + 1; 
       } 
       }
     }
   }
      monkey.velocityY = monkey.velocityY+0.8;
      monkey.collide(ground);
  
  
  spawnBanana();
  spawnObstacles();
   

  if(obstacleGroup.isTouching(monkey)){
     ground.velocity=0;
     monkey.velocityY=0;
     obstacleGroup.velocity=0;
     text("gameover",300,200)
    
  }
  

 
  drawSprites();
  
   
}



function spawnBanana(){
  if(frameCount%100===0){
    var rand=Math.round(random(120,200));
    var banana=createSprite(650,200);
    banana.scale=0.1;
    banana.y=rand;
    banana.addImage(bananaImage);
    banana.velocityX=-4;
    banana.lifetime.x=10;
    bananaGroup.add(banana);
  }
}



function spawnObstacles(){
   if(frameCount%300===0){
       var obstacle=createSprite(650,330);
       obstacle.scale=0.1;
       obstacle.addImage(obstacleImage);
       obstacle.velocityX=-4;
       obstacle.lifetime.x=10;
       obstacleGroup.add(obstacle) ; 
    }
}





