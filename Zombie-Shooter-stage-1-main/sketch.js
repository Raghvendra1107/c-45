var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,spawnZombie
var score=0
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/1.jpg")
  z1 = loadImage("assets/r.png")
  z2 = loadImage("assets/h.png")
  z3 = loadImage("assets/v.png")
  z4 = loadImage("assets/n.png")

}

function setup() {

  
  createCanvas(windowWidth-500,windowHeight);
  edges=createEdgeSprites()


  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.5
 lg= new Group() 
zg = new Group()

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


}

function draw() {
  background(0);
   
 spawnZombie();
player.collide(edges)


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 spawnlazer();
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(keyDown("RIGHT_ARROW")){
player.x = player.x+30
}
if(keyDown("LEFT_ARROW")){
  player.x = player.x-30
  }
if(zg.isTouching(lg)){
zg.destroyEach()
lg.destroyEach()
score=+1
}

  

drawSprites();
fill("white")
textSize(20)
text("zombies finished - "+score,width/2,100)
if(zg.isTouching(player)){
  player.velocityX=0
  zg.velocityXEach=0
  fill("white")
  textSize(50)
  text("game over - ",width/2,height/2)
  
  }
}
function spawnZombie(){
  if (frameCount % 200 === 0){
    var zombie = createSprite(displayWidth-100,displayHeight-300,40,10);
    zombie.y = Math.round(random(80,displayHeight-80));
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1:zombie.addImage(z1);
              break;
      case 2: zombie.addImage(z2);
              break;
      case 3: zombie.addImage(z3);
              break;
      case 4: zombie.addImage(z4);
              break;
     
      default: break;
    }
    zombie.scale = 0.3;
    zombie.velocityX = -3;
    zg.add(zombie)
  }
}
function spawnlazer (){
  lazer = createSprite(player.x,player.y,20,8);
 lazer.shapeColor="red"
 lazer.velocityX= +4
 lg.add(lazer);
 
 
 }