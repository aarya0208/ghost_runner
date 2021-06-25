var tower,towerImg;
var door,doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var ghost, ghostImg;
var invisibleBlock , invisibleBlockGroup;
var gameState = "PLAY";
var spookySound;

function preload(){
  towerImg = loadImage("tower.png");
  
  doorImg = loadImage("door.png");
  
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png")
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
 invisibleBlockGroup = new Group(); 
 doorsGroup = new Group();
 climbersGroup = new Group(); 
}

function draw(){
  background(0);
  if( gameState === "PLAY"){
    
 
  
  if(tower.y >400 ){
    tower.y = 300;    
  }
  if(keyDown("LEFT_ARROW")) {
   ghost.x = ghost.x-3
 }
  if(keyDown("RIGHT_ARROW")) {
   ghost.x = ghost.x+3;
 }
  
 if(keyDown("SPACE")) {
   ghost.velocityY = -5;
   
 }
   ghost.velocityY = ghost.velocityY + 0.8;
  
 if(climbersGroup.isTouching(ghost)) {
   ghost.velocityY = 0;
 } 
   if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
     ghost.destroy();
     gameState = "END" ;
   }
  
 spawnDoors();  
  
  drawSprites();
  }
  
  if(gameState === "END"){
    stroke("blue");
   fill("yellow");
    textSize(30);
    text("GAME OVER", 230,250);
  }
  
  
  
}
function spawnDoors() { 
  //write code here to spawn the doors in the tower 
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,10);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

