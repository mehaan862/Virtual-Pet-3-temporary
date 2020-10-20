//Create variables here
var dog, happyDog, database, foodS, foodStock,feedDog,addFoods,lastFed,foodObj,feed,addFood;

function preload()
{
  //load images here
  dogImage=loadImage("Dog.png");
  happyDogImage=loadImage("happydog.png");
}

function setup() {
  createCanvas(500, 500);
  
  database=firebase.database();
  foodStock=database.ref("food");
  foodStock.on("value",readStock);

  dog=createSprite(200,200);
  dog.addImage(dogImage);
  dog.scale=0.3;

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw() {  
background(46, 139, 87);
 
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : "+lastFed%12 + "PM",350,350);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,350);
  }else{
    text("Last Feed : "+lastFed+"AM",350,350);
  }
 
  drawSprites();
  //add styles here
  if(foodS!==undefined){
  textSize(20);
  fill("black");
  text("FOOD LEFT: "+ foodS, 150,50);
  text("Press UP_ARROW to feed the dog!", 100,400);
  }
}
function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').set({
    food:x
  })
  
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFooods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}