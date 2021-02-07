var starImg, fairyImg, bgImg;
var fairy , fairyVoice;
var star, starBody;
var ground

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	starImg = loadImage("images/star.png");
	fairyImg = loadAnimation("images/fairyImage1.png","images/fairyImage2.png");
	bgImg = loadImage("images/starNight.png");
	fairyVoice = loadSound("sound/JoyMusic.mp3");

}

function setup() {
	createCanvas(800, 750);

	// fairyVoice.play();

	fairy = createSprite(130, 520);
	fairy.addAnimation("fairyflying",fairyImg);  
	fairy.scale =0.25;
	fairy.setCollider("circle", 440, 0, 70)
	fairy.debug = false

	star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;
	star.setCollider("circle", 0, 0, 40)
	star.debug = false

	engine = Engine.create();
	world = engine.world;

	starBody = Bodies.circle(650 , 30 , 5 , {restitution:1.5, isStatic:true});
	World.add(world, starBody);

	ground = Bodies.rectangle(400, 800, 800, 50,{isStatic:true})
	World.add(world, ground)
	
	Engine.run(engine);

}


function draw() {
  background(bgImg);
  star.x = starBody.position.x
  star.y = starBody.position.y
  rectMode(CENTER)
  rect(ground.position.x, ground.position.y, 800, 50)
  if (fairy.isTouching(star))
  {
    Matter.Body.setStatic(starBody, true)
	fairy.velocityX = 0
  }
  keyPressed();
  drawSprites();

}

function keyPressed() {
	if (keyWentDown("left"))
	{
		fairy.velocityX = -5
	}

	if (keyWentDown("right"))
	{
		fairy.velocityX = 5
	}


	if (keyWentDown("down"))
	{
	   Matter.Body.setStatic(starBody, false)
	}


}
