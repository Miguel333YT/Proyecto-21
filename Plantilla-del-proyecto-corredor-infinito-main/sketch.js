//qui se crean las variables
var airplane, sky, birds;
var airplaneImg, skyImg, birdsImg;
var END =0;
var PLAY =1;
var gameState = PLAY;
var score;
var GameOverImg;


function preload() {
//aqui se añaden las imagenes al codigo
airplaneImg = loadImage ("..//imagenes//avion.png");
skyImg = loadImage ("..//imagenes//cielo.png");
birdsImg = loadImage ("..//imagenes//ave.gif");
GameOverImg = loadImage ("..//imagenes//gameOver.png");

}

function setup() {
    createCanvas(600,600);
    //aqui se crea un grupo para las aves (porque son varios sprites)
    birdsGroup= new Group();
    //aqui se crea el sprite del cielo, posicion, imagen, tamaño y velocidad
    sky = createSprite(300,300);
    sky.addImage(skyImg);
    sky.velocityX = -5;

  
  //aqui se crea el sprite del avion, su ubicacion, imagen, tamaño y un colisionador para que colisione con las aves
  airplane = createSprite(80,50,10,20);
  airplane.addImage(airplaneImg); 
  airplane.scale = 0.3; 
  airplane.setCollider("rectangle",0,0,450,100);
  //airplane.debug = true

    score = 0;
}

function draw() {
  drawSprites();

 //aqui se pone un texto en el lienzo de la puntuacion y su ubicacion
 text("Puntuación: "+ score, 500,50);
  
 //esto es lo que pasa cuando el juego empieza
  if(gameState===PLAY){
  
    airplane.y = World.mouseY;
    edges= createEdgeSprites();
    airplane.collide(edges);
    score = score + Math.round(frameCount/60);

    if (sky.x <0) {
      sky.x = sky.width/2;
    }

    if (frameCount % 80 == 0){
      createBirds()

    } 

    if(airplane.isTouching(birdsGroup)){
      
      gameState = END;
    }
  }
  if(gameState===END){

    //aqui se crea la imagen del game over, su ubicacion, tamaño y imagen
    GameOver = createSprite(300,250);
    GameOver.addImage(GameOverImg);
    GameOver.scale = 1;
    GameOver.visible = true;
    
    //aqui esta la configuracion para que cuando el juego se acabe, el cielo y las aves dejen de moverse (las ultimas 2 aves se siguen moviendo, y no se solucionar eso :( )
    sky.velocityX = 0;
    birdsGroup.velocityX = 0;
    //birdsGroup.destroy();
  
   
  }

}

//aqui se crean el sprite de las aves, gif, tamaño, velocidad, lifetime, su grupo y la configuracion para que aparezcan de manera aleatoria
function createBirds() {
  var birds= createSprite(600, random(0, 600), 10, 10);
  birds.addImage(birdsImg);
  birds.scale = 1; 
  birds.velocityX =-4;
  birds.lifetime = 160;
  birdsGroup.add(birds);
   
}

/*HISTORIA: Simon es un piloto que le gusta viajar en su avioneta, sin embargo, es invierno y los ganzos estan migrando hacia 
otros lugares mas calidos, por lo tanto, estan volando por los cielos muchos de ellos, Simon se da cuenta de esto ¡en pleno
vuelo! asi que si Simon quiere evitar chocar contra uno de ellos, tendra que poner en practica sus grandes habilidades como
piloto. ¡Ayuda a Simon a manejar su avioneta y evitar chocar contra uno de ellos! */