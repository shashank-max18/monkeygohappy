var PLAY = 1;
var END = 0;
var gameState = PLAY;


var monkey, monkey_running, monkey_collided;

var ground, invisibleGround, groundImage;

var bananasGroup, bananaImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score = 0;

var gameOver, restart;


function preload() {
  bgImg = loadImage("jungle.jpg");
  
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  monkey_collided = loadAnimation("m.jpg");

  groundImage = loadImage("straight_line.jpg");

  bananaImage = loadImage("banana.png");

  obstacle1 = loadImage("stone.png");

  gameOverImg = loadImage("o.jpg");

  // It is r.png, you had it as jpg
  restartImg = loadImage("r.png");
}

function setup() {
  createCanvas(400, 400);


  monkey = createSprite(50, 380, 20, 50);

  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  // monkey.addAnimation("collided", trex_collided);
  monkey.scale = 0.2;

  ground = createSprite(200, 380, 800, 20);
 // ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -(6 + 3 * score / 100);

  gameOver = createSprite(300, 200);

  // changed oImg to gameOverImg
  gameOver.addImage(gameOverImg);

  restart = createSprite(300, 240);


  // changed oImg to restartImg
  restart.addImage(restartImg);

  gameOver.scale = 0.1;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;

  invisibleGround = createSprite(200, 390, 400, 10);
  invisibleGround.visible = false;

  bananasGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
}

function draw() {
  background("white");
  //trex.debug = true;

  text("Score: " + score, 300, 50);

  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60);
    ground.velocityX = -(6 + 3 * score / 100);

    if (keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }

    monkey.velocityY = monkey.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    monkey.collide(invisibleGround);
    spawnBananas();
    spawnObstacles();

    if (obstaclesGroup.isTouching(monkey)) {
      gameState = END;
    }
  } else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);

    //change the trex animation
    monkey.changeAnimation("collided", monkey_collided);

    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);

    if (mousePressedOver(restart)) {
      reset();
    }
  }


  drawSprites();
}

function spawnBananas() {
  //write code here to spawn the bananas
  if (frameCount % 60 === 0) {
    var banana = createSprite(400, 220, 40, 10);
    banana.y = Math.round(random(80, 220));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;

    //assign lifetime to the variable
    banana.lifetime = 134;

    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;

    //add each banana to the group
    bananasGroup.add(banana);
  }

}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(400, 365, 10, 40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3 * score / 100);

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      // changed stone to obstacle1
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle1);
        break;
      case 3:
        obstacle.addImage(obstacle1);
        break;
      case 4:
        obstacle.addImage(obstacle1);
        break;
      case 5:
        obstacle.addImage(obstacle1);
        break;
      case 6:
        obstacle.addImage(obstacle1);
        break;
      default:
        break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup.destroyEach();
  bananasGroup.destroyEach();

  monkey.changeAnimation("running", monkey_running);

  
  score = 0;

}