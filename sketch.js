var estado = "parado", defesas = 0, cor = 1;

var mudar, mudar1, mudar2, comoJogar, comoJogarImg, tutorial, tutorialImg;
var blocoJImg, bloco1Img, bloco2Img, bloco3Img, bloco4Img;
var bola, bolaP, bola0, bola1, bola2, bola3, bola4, bola5;
var blocoJ, bloco1, bloco2, bloco3, bloco4;
var música, botão, mola, quique, rebater;
var fundo, menu, menuImg, aresta1; 

function preload(){

  menuImg = loadImage("Imagens/Cenário/menu.jpg");
  mudar1 = loadImage("Imagens/Cenário/Mudar/mudar1.png");
  mudar2 = loadImage("Imagens/Cenário/Mudar/mudar2.png");
  tutorialImg = loadImage("Imagens/Cenário/tutorial.png");
  comoJogarImg = loadImage("Imagens/Cenário/comoJogar.png");


  bolaP = loadAnimation("Imagens/Bola/Bola0/bola0a.png");
  bola0 = loadAnimation("Imagens/Bola/Bola0/bola0a.png", "Imagens/Bola/Bola0/bola0b.png", "Imagens/Bola/Bola0/bola0c.png", "Imagens/Bola/Bola0/bola0d.png");
  bola1 = loadAnimation("Imagens/Bola/Bola1/bola1a.png", "Imagens/Bola/Bola1/bola1b.png", "Imagens/Bola/Bola1/bola1c.png", "Imagens/Bola/Bola1/bola1d.png");
  bola2 = loadAnimation("Imagens/Bola/Bola2/bola2a.png", "Imagens/Bola/Bola2/bola2b.png", "Imagens/Bola/Bola2/bola2c.png", "Imagens/Bola/Bola2/bola2d.png");
  bola3 = loadAnimation("Imagens/Bola/Bola3/bola3a.png", "Imagens/Bola/Bola3/bola3b.png", "Imagens/Bola/Bola3/bola3c.png", "Imagens/Bola/Bola3/bola3d.png");
  bola4 = loadAnimation("Imagens/Bola/Bola4/bola4a.png", "Imagens/Bola/Bola4/bola4b.png", "Imagens/Bola/Bola4/bola4c.png", "Imagens/Bola/Bola4/bola4d.png");
  bola5 = loadAnimation("Imagens/Bola/Bola5/bola5a.png", "Imagens/Bola/Bola5/bola5b.png", "Imagens/Bola/Bola5/bola5c.png", "Imagens/Bola/Bola5/bola5d.png");                      

  blocoJImg = loadImage("Imagens/Blocos/blocoJ.png");
  bloco1Img = loadImage("Imagens/Blocos/bloco1.png");
  bloco2Img = loadImage("Imagens/Blocos/bloco2.png");
  bloco3Img = loadImage("Imagens/Blocos/bloco3.png");
  bloco4Img = loadImage("Imagens/Blocos/bloco4.png");

  rebater = loadSound("Sons/rebater.mp3");
  música = loadSound("Sons/música.mp3");
  quique = loadSound("Sons/quique.mp3");
  botão = loadSound("Sons/botão.mp3");
  ponto = loadSound("Sons/ponto.mp3");
  mola = loadSound("Sons/mola.mp3");
}

function setup(){
    
  createCanvas(windowWidth, windowHeight);

  aresta1 = createSprite(width-width-5, height/2, 10, height);
  fundo = createSprite(width/2, height/2, width, height);
  fundo.shapeColor = "#fad682";

  menu = createSprite(width+410, height/2);
  menu.addImage(menuImg);
  menu.scale = 2;

  mudar = createSprite(width-105, height-70);
  mudar.addImage("mudar1", mudar1);
  mudar.addImage("mudar2", mudar2);
  mudar.scale = 0.7;

  comoJogar = createSprite(width-110, height/2-20);
  comoJogar.setCollider("rectangle", 1, 5, 130, 198);
  comoJogar.addImage(comoJogarImg);
  comoJogar.scale = 0.7;

  tutorial = createSprite(width/2 + 200, height/2-30);
  tutorial.addImage(tutorialImg);
  tutorial.visible = false;

  blocoJ = createSprite(width/2-110, height-height+50);
  blocoJ.depth = menu.depth-1;
  blocoJ.addImage(blocoJImg);
  blocoJ.scale = 0.6;

  bloco1 = createSprite(width/2-537, height-20);
  bloco1.addImage(bloco1Img);
  bloco1.shapeColor = "blue";
  bloco1.scale = 0.7;

  bloco2 = createSprite(width/2-251, height-20);
  bloco2.addImage(bloco2Img);
  bloco2.shapeColor = "orange";
  bloco2.scale = 0.7;

  bloco3 = createSprite(width/2+35, height-20);
  bloco3.addImage(bloco3Img);
  bloco3.shapeColor = "green";
  bloco3.scale = 0.7;

  bloco4 = createSprite(width/2+322, height-20);
  bloco4.addImage(bloco4Img);
  bloco4.shapeColor = "purple";
  bloco4.scale = 0.7;

  bola = createSprite(width/2-110, height/2, 40, 40);
  bola.addAnimation("bolaP", bolaP);
  bola.addAnimation("bola0", bola0);
  bola.addAnimation("bola1", bola1);
  bola.addAnimation("bola2", bola2);
  bola.addAnimation("bola3", bola3);
  bola.addAnimation("bola4", bola4);
  bola.addAnimation("bola5", bola5);
  x = [-5, 5]; //velocidade x
  bola.velocityY = 0;
  bola.velocityX = 0;
  bola.scale = 0.04;

  música.setVolume(0.1);
  música.loop();
}

function draw(){

  background(0);
  drawSprites();

  blocoJ.collide(aresta1);
  blocoJ.collide(menu);

  if(estado == "jogando"){
      noCursor();
  }else{
      cursor();
  }

  textFont("Times New Roman");
  strokeWeight(5);
  fill("#ffe854");
  textSize(70);
  stroke(0);

  if(defesas < 10){
      text(defesas, width-127, height-height+85);
  }else if(defesas > 9 && defesas < 100){
      text(defesas, width-148, height-height+85);
  }else if(defesas > 99 && defesas < 1000){
      text(defesas, width-170, height-height+85);
  }else if(defesas > 999 && defesas < 10000){
      text(defesas, width-181, height-height+85);
  }

  if(estado == "parado"){

    mudança();

    if(mouseIsOver(comoJogar)){
      tutorial.visible = true;
      comoJogar.scale = 0.75;
    }else{
      tutorial.visible = false;
      comoJogar.scale = 0.7;
    }

    if(mouseIsOver(bola)){

      bola.scale = 0.05;

      stroke(0);
      textSize(35);
      fill("#ffe854");
      strokeWeight(5);
      textFont("Times New Roman");
      text("JOGAR", width/2-166, height/2+90);

    }else{
      bola.scale = 0.04;
    }

    if(mousePressedOver(bola)){

      bola.changeAnimation("bola0");
      bola.velocityY = random(4, 6);
      bola.velocityX = random(x);
      estado = "jogando";
      botão.play();
      defesas = 0;
    }
  }

  if(estado == "jogando"){
    movimento();
    colisão();
    gol();
  }
}

function movimento(){

  if(keyDown("a") || keyDown("LEFT_ARROW")){
      blocoJ.x -= 10;
  }
  if(keyDown("d") || keyDown("RIGHT_ARROW")){
      blocoJ.x += 10;
  }
}

function colisão(){

  //arestas

    if(bola.isTouching(aresta1) || bola.isTouching(menu)){

      if(bola.isTouching(aresta1)){
          bola.velocityX--;
      }
      if(bola.isTouching(menu)){
          bola.velocityX++;
      }

      bola.bounceOff(aresta1);
      bola.bounceOff(menu);
      quique.play();
    }

  //bloco jogador

    if(blocoJ.isTouching(bola)){

      bola.changeAnimation("bola5");
      bola.bounceOff(blocoJ);
      rebater.play();

      if(bola.y > width-width+50){
          defesas++;
      }
    }

  //bloco 1   

    if(bloco1.y > height-10){
        bloco1.velocityY = -5;
    }
    if(bloco1.y <= height-20){
        bloco1.velocityY = 0;
    }    

    if(bloco1.isTouching(bola)){

        bola.changeAnimation("bola1");
        bola.bounceOff(bloco1);
        bloco1.velocityY = 5;
        bola.velocityY --;
        mola.play();
    }

  //bloco 2

    if(bloco2.y > height-10){
        bloco2.velocityY = -5;
    }
    if(bloco2.y <= height-20){
        bloco2.velocityY = 0;
    } 

    if(bloco2.isTouching(bola)){

        bola.changeAnimation("bola2");
        bola.bounceOff(bloco2);
        bloco2.velocityY = 5;
        bola.velocityY --;
        mola.play();
    }

  //bloco 3

    if(bloco3.y > height-10){
        bloco3.velocityY = -5;
    }
    if(bloco3.y <= height-20){
        bloco3.velocityY = 0;
    } 

    if(bloco3.isTouching(bola)){

        bola.changeAnimation("bola3");
        bola.bounceOff(bloco3);
        bloco3.velocityY = 5;
        bola.velocityY --;
        mola.play();
    }

  //bloco 4

    if(bloco4.y > height-10){
        bloco4.velocityY = -5;
    }
    if(bloco4.y <= height-20){
        bloco4.velocityY = 0;
    }

    if(bloco4.isTouching(bola)){

        bola.changeAnimation("bola4");
        bola.bounceOff(bloco4);
        bloco4.velocityY = 5;
        bola.velocityY --;
        mola.play();
    }
}

function gol(){

  if(bola.y < height-height){

    ponto.play();
    bola.x = width/2-110;
    bola.y = height/2;
    blocoJ.x = width/2-110;
    estado = "parado";
    bola.velocityX = 0;
    bola.velocityY = 0;
    bola.changeAnimation("bolaP");
  }
}

function mudança(){
  
  var controle;

  if(mouseDown("leftButton")){
    controle = "apertado";
  }else{
    controle = "solto";
  }

  if(mouseIsOver(mudar)){
    mudar.changeAnimation("mudar2");
    mudar.scale = 0.75;
  }else{
    mudar.changeAnimation("mudar1");
    mudar.scale = 0.7;
  }

  if(mousePressedOver(mudar) && controle == "solto" && cor == 1){

    fundo.shapeColor = "#c0e3b6";
    controle = "apertado";
    cor = 2;
  }

  if(mousePressedOver(mudar) && controle == "solto" && cor == 2){

    fundo.shapeColor = "#b6bae3";
    controle = "apertado";
    cor = 3;
  }

  if(mousePressedOver(mudar) && controle == "solto" && cor == 3){

    fundo.shapeColor = "#e6c3a8";
    controle = "apertado";
    cor = 4;
  }

  if(mousePressedOver(mudar) && controle == "solto" && cor == 4){

    fundo.shapeColor = "#5afa8d";
    controle = "apertado";
    cor = 5;
  }

  if(mousePressedOver(mudar) && controle == "solto" && cor == 5){

    fundo.shapeColor = "#e6a8e0";
    controle = "apertado";
    cor = 6;
  }

  if(mousePressedOver(mudar) && controle == "solto" && cor == 6){

    fundo.shapeColor = "#ff7385";
    controle = "apertado";
    cor = 7;
  }

  if(mousePressedOver(mudar) && controle == "solto" && cor == 7){

    fundo.shapeColor = "#616060";
    controle = "apertado";
    cor = 8;
  }

  if(mousePressedOver(mudar) && controle == "solto" && cor == 8){

    fundo.shapeColor = "#557816";
    controle = "apertado";
    cor = 9;
  }

  if(mousePressedOver(mudar) && controle == "solto" && cor == 9){

    fundo.shapeColor = "#8a6633";
    controle = "apertado";
    cor = 10;
  }

  if(mousePressedOver(mudar) && controle == "solto" && cor == 10){
    
    fundo.shapeColor = "#fad682";
    controle = "apertado";
    cor = 1;
  }
}