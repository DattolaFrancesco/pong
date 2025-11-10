// canvas centrale del gioco
const canvas = document.querySelector("#canvas");
const canvasLeft = document.querySelector("#canvasLeft");
//............................................................................................................................................

// canvas left robot
const ctxLeft = canvasLeft.getContext("2d");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
canvasLeft.width = 450;
canvasLeft.height = 300;
canvas.style.border = "3px solid #87A330";
canvas.style.boxShadow = "0px 0px 60px #A1C349"
//............................................................................................................................................

// immagini per il primo livello 
const sfondoV = new Image();
sfondoV.src = "fuochi.png";
const Lono = new Image();
Lono.src = "Lono1.jpg";
const Razzismo = new Image();
Razzismo.src = "norazzismo.png";
const Lono2 = new Image();
Lono2.src = "Lonospiaggia.jpg";
const Lono3 = new Image();
Lono3.src = "Lonotvrotta.png";
const LonoGameOver = new Image();
LonoGameOver.src = "LonoVittoria2.png";
//............................................................................................................................................

// immagini robot e animazioni
const RobotImg = new Image();
RobotImg.src = "robot.png";
const RobotFrame2 = new Image();
RobotFrame2.src = "robotframe2.png";
const Robotframe3 = new Image();
Robotframe3.src = "robotframe3.png";
const Robotframe4 = new Image();
Robotframe4.src = "Robotfelice.png";
const RobotPiange = new Image();
RobotPiange.src = "RobotPiange.png";
// hearts
    const heart = new Image();
    heart.src = "heart3.png.png";
//............................................................................................................................................

// caricamento font e immagini
Promise.all([
    // primo livello
    new Promise(resolve => sfondoV.onload = resolve),
    new Promise(resolve => Lono.onload = resolve),
    new Promise(resolve => Razzismo.onload = resolve),
    new Promise(resolve => Lono2.onload = resolve),
    new Promise(resolve => Lono3.onload = resolve),
    new Promise(resolve => LonoGameOver.onload = resolve),
    
    // caricamento robot animazioni 
    new Promise(resolve => RobotImg.onload = resolve),
    new Promise(resolve => RobotFrame2.onload = resolve),
    new Promise(resolve => Robotframe3.onload = resolve),
    new Promise(resolve => Robotframe4.onload = resolve),
    new Promise(resolve => RobotPiange.onload = resolve),

    // hearts
    new Promise(resolve => heart.onload = resolve),

    // font
    document.fonts.ready
]).then(()=>{
    // font robot 
    ctxLeft.font = " 28px 'Jersey 10'";
    ctxLeft.fillText("test", 0, 0);
    Home();
})
//............................................................................................................................................

//                                                          VARIABILI GENERALI 

// variabile per devinire lo stato del gioco home..lvl1..lvl2..lvl3
let StatoDellaHome = 0 // 0 titolo; 1 spiegazione; ecc..

// listener space bar per movimento dialoghi
window.addEventListener("keyup", (e)=>{
    if(e.code === 'Space') StatoDellaHome ++;

})
// freccia dialoghi
let frecciaTimer = 0;
let frecciaOffset = 0;
// variabili movimento
let velocita = 10;
let keys = {
    a:false,
    d:false,
}

// listener movimento
window.addEventListener("keydown", (e)=>{
    if(e.key == 'a') keys.a = true;
    if(e.key == 'd') keys.d = true;
})
window.addEventListener("keyup", (e)=>{
    if(e.key == 'a') keys.a = false;
    if(e.key == 'd') keys.d = false;
})
// variabili barra giocatore
let barSize = 200;
let barH = 25;
let barX = canvas.width / 2 - 100;
let barY = canvas.height - barH - 40;

// vite giocatore
let lifes = 3;

//............................................................................................................................................

//                                                        FUNZIONI GENERALI
function movement(){
    if(keys.d){barX += velocita;} 
    if(keys.a){barX -= velocita;}
}

function drawBar(){
    ctx.save();
    ctx.fillStyle = "white";
    ctx.fillRect(barX,barY,barSize,barH);
    ctx.strokeStyle = '#87A330';
    ctx.shadowColor = "#87A330";
    ctx.lineWidth = "2"
    ctx.shadowBlur = 12
    ctx.strokeRect(barX,barY,barSize,barH);
    ctx.stroke();
    ctx.restore(); 
}
function bordiBar(){
    let margin = 10;
    barX = Math.max(margin, Math.min(canvas.width-barSize-margin,barX));
}

function hearts(){
    if(lifes == 3){
        ctx.drawImage(heart,20,20,30,30);
        ctx.drawImage(heart,55,20,30,30);
        ctx.drawImage(heart,90,20,30,30);
    }
    if(lifes == 2){
        ctx.drawImage(heart,20,20,30,30);
        ctx.drawImage(heart,55,20,30,30);
    }
    if(lifes == 1){
        ctx.drawImage(heart,20,20,30,30);
    }

}
//............................................................................................................................................
//                                                        FUNZIONI HOME
function Home(){
    //canvas.style.border = "none";
    canvas.style.boxShadow = "none";
    if(StatoDellaHome == 0){
        ctx.strokeStyle = '#87A330';
        ctx.shadowColor = "#87A330";
        ctx.lineWidth = "2"
        ctx.shadowBlur = 12
        ctx.fillStyle = "#243010"
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctxLeft.fillStyle = "#243010"
        ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
        ctx.fillStyle = "white";
        ctx.font = " 100px 'Jersey 10'";
        ctx.fillText("CACCHIATE",canvas.width/2-200,canvas.height/2- 160);
        ctx.fillText("DI",canvas.width/2-200,canvas.height/2 - 80);
        ctx.fillText("FAMIGLIA",canvas.width/2-200,canvas.height/2 );
        ctx.font = " 40px 'Jersey 10'";
        ctx.fillText("THE GAME",canvas.width/2-200,canvas.height/2 + 50 );
        ctx.fillText("Press the space bar to continue...",canvas.width/2-200,canvas.height - 30 );
    }
    if(StatoDellaHome == 1){

        ctx.fillStyle = "#243010"
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctxLeft.fillStyle = "#243010"
        ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
        ctx.drawImage(Robotframe4,30,canvas.height/2 - 150,150,250);
        ctx.fillStyle = "white";
        ctx.font = " 50px 'Jersey 10'";
        ctx.fillText("Ciao sono Qwertyasd e ",canvas.width/2-200,canvas.height/2- 160);
        ctx.fillText("ti guidero' in tutta la durata",canvas.width/2-200,canvas.height/2- 100);
        ctx.fillText("del gioco...",canvas.width/2-200,canvas.height/2- 40);
        ctx.font = "15px Arial";
        ctx.fillText("▼", canvas.width/2 - 20, 355 + frecciaOffset);

    }
    if(StatoDellaHome == 2){
        ctx.fillStyle = "#243010"
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctxLeft.fillStyle = "#243010"
        ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
        ctx.drawImage(RobotFrame2,30,canvas.height/2 - 150,150,250);
        ctx.drawImage(heart,200,250,30,30);
        ctx.drawImage(heart,235,250,30,30);
        ctx.drawImage(heart,270,250,30,30);
        ctx.fillStyle = "white";
        ctx.font = " 40px 'Jersey 10'";
        ctx.fillText("queste sono le tue vite,",canvas.width/2-120,canvas.height/2 - 80);
        ctx.fillText("potrebbe essere facile all'inizio.",canvas.width/2-120,canvas.height/2 -40);
        ctx.fillText("ma non perderne troppe,",canvas.width/2-120,canvas.height/2);
        ctx.fillText("ne hai solo 3...",canvas.width/2-120,canvas.height/2 + 40);
        ctx.font = "15px Arial";
        ctx.fillText("▼", canvas.width/2 + 70,canvas.height/2 + 35 + frecciaOffset);
     
    }
    if(StatoDellaHome == 3){
        ctx.fillStyle = "#243010"
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctxLeft.fillStyle = "#243010"
        ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
        ctx.drawImage(Robotframe3,30,canvas.height/2 - 150,150,250);
        ctx.fillStyle = "white";
        ctx.font = " 40px 'Jersey 10'";
        ctx.fillText("Puoi rimbalzare ",canvas.width/2-120,canvas.height/2 - 80);
        ctx.fillText("in tutti i bordi che vedi ora,",canvas.width/2-120,canvas.height/2 -40);
        ctx.fillText("tranne in quello in basso",canvas.width/2-120,canvas.height/2);
        ctx.fillText("se lo tocchi perderai vite...",canvas.width/2-120,canvas.height/2 + 40);
        ctx.font = "15px Arial";
        ctx.fillText("▼", canvas.width/2 + 255,canvas.height/2 + 35 + frecciaOffset);
        ctx.fillStyle = "red"
        ctx.fillRect(10,canvas.height - 20,canvas.width - 20,10);

    }
    if(StatoDellaHome == 4){
        ctx.fillStyle = "#243010"
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctxLeft.fillStyle = "#243010"
        ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
        ctx.drawImage(Robotframe3,30,canvas.height/2 - 150,150,250);
        ctx.fillStyle = "white";
        ctx.font = " 40px 'Jersey 10'";
        ctx.fillText("questa e' la tua arma, la BARRA",canvas.width/2-180,canvas.height/2 - 280);
        ctx.fillText("se la colpisci in mezzo la palla andra'",canvas.width/2-180,canvas.height/2 -240);
        ctx.fillText("su dritta, se colpita ai lati",canvas.width/2-180,canvas.height/2 - 200);
        ctx.fillText("rimbalzera' a seconda di quanto",canvas.width/2-180,canvas.height/2-160);
        ctx.fillText("a lato e' stata presa...",canvas.width/2-180,canvas.height/2 - 120);
        ctx.font = "15px Arial";
        ctx.fillText("▼", canvas.width/2 + 125,canvas.height/2 - 125 + frecciaOffset);
        ctx.fillStyle = "red";
        ctx.save();
        ctx.fillStyle = "white";
        ctx.fillRect(barX,barY,barSize,barH);
        ctx.strokeRect(barX,barY,barSize,barH);
        ctx.stroke();
        ctx.restore(); 
        

    }
    console.log(StatoDellaHome)
    // valore oscilazzione freccia dialogo
    frecciaTimer += 0.05;
    frecciaOffset = Math.sin(frecciaTimer * 3) * 3;
    // loop
    requestAnimationFrame(Home);
}

//............................................................................................................................................

//                                                        VARIABILI 1 LIVELLO LONO

// variabile stage gioco
let stageGame = 0;

// variabile power
let powerx = 380;
let powery = 175;
let powersize = 50;

// variabili pallina power
let pallax = powerx + 28;
let pallay = powery + 30; 
let pallina2 = false;
let vivaBall2 = true;

// variabili pallina
let ballX =canvas.width/2;
let ballY =canvas.height/2 - 100;
let radius = 10;
let balldirectionX = (Math.round(Math.random())* 2 - 1)*8;
let balldirectionY = 8;
let ball2directionX = (Math.round(Math.random())* 2 - 1)*4;
let ball2directionY = 4;
let hitX = false;
let hitY = false;

// array rettangoli da spaccare
let Rsize = 100;
let Rheight = 20
let margin = 2;
let rettangoli = [{x:50,y:120,Rsize:Rsize,Rheight:Rheight, vita:2,color:'white'}];
let rettangoli2 = [{x:50,y:155,Rsize:Rsize,Rheight:Rheight, vita:2,color:'white'}];
let rettangoli3 = [{x:50,y:190,Rsize:Rsize,Rheight:Rheight, vita:2,color:'white'}];
let rettangoli3emezzo = [{x:458,y:190,Rsize:Rsize,Rheight:Rheight, vita:2,color:'white'}];
let rettangoli4 = [{x:50,y:225,Rsize:Rsize,Rheight:Rheight, vita:2,color:'white'}];
let vite = 2;

// creazione blocchi del primo livello
crearerectrow1();
crearerectrow2();
crearerectrow3();
crearerectrow3emezzo();
crearerectrow4();

// variabile lifes e gameover o victory
let victory = false;
let GameOver = false;
//............................................................................................................................................

//                                                          FUNZIONI SOLO PER IL PRIMO LIVELLO

// loop per far partire il primo livello
function Livello1(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctxLeft.clearRect(0,0,canvasLeft.width,canvasLeft.height);

    if(GameOver){
        ctx.fillStyle = "#243010";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctxLeft.fillStyle = "#243010";
        ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
        canvas.style.border = "none";
        canvas.style.boxShadow = "none";
        ctx.drawImage(LonoGameOver,350,-100 ,550,450);
        ctx.fillStyle = "red";
        ctx.font = " 40px 'Jersey 10'";
        ctx.fillText("EEEEEEEEAASY!!!",300,160);
        ctx.fillText("hihihiohhhh",300,210);
        ctx.drawImage(RobotPiange,10,canvas.height -270 ,150,250);
        ctx.fillStyle = "white";
        ctx.font = " 40px 'Jersey 10'";
        ctx.fillText("Lono e' stato troppo OP",220,600);
        ctx.fillText("Sara' per la prossima",220,650);
        return;
    }
    if(victory){
        ctx.fillStyle = "#243010";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctxLeft.fillStyle = "#243010";
        ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
        ctx.drawImage(Robotframe4,30,canvas.height/2 + 40,150,250);
        ctx.fillStyle = "white";
        ctx.font = " 40px 'Jersey 10'";
        ctx.fillText("Bravissimo hai sconfitto Lono",230,400);
        ctx.fillText("EEEEEAASY!!!!!!",230,450);
        canvas.style.border = "none";
        canvas.style.boxShadow = "none";
        return;
    }
    Go();
    stageG();
    vittoria();
    controlloLose();
    hearts();
    drawBall();
    disegnarect();
    movement();
    bordiBar();
    Ballmovement();
    collisioneBar();
    collsionwall();
    drawBar();
    Ball2()
    drawPower();
    requestAnimationFrame(Livello1);
};
// creazione rows
function crearerectrow1(){
    for(let i = 1; i < 7; i++){
    let x = rettangoli[i-1].x + Rsize + margin;
    let y = 120;
    rettangoli.push({x,y,Rsize,Rheight,vita:2, color:"white"})
    }
}
function crearerectrow2(){
    for(let i = 1; i < 7; i++){
    let x = rettangoli2[i-1].x + Rsize + margin;
    let y = 155;
    rettangoli2.push({x,y,Rsize,Rheight,vita:2, color:"white"})
    }
}
function crearerectrow3(){
    for(let i = 1; i < 3; i++){
    let x = rettangoli3[i-1].x + Rsize + margin;
    let y = 190;
    rettangoli3.push({x,y,Rsize,Rheight,vita:2, color:"white"})
    }
}
function crearerectrow3emezzo(){
    for(let i = 1; i < 3; i++){
    let x = rettangoli3emezzo[i-1].x + Rsize + margin;
    let y = 190;
    rettangoli3emezzo.push({x,y,Rsize,Rheight,vita:2, color:"white"})
    }
}
function crearerectrow4(){
    for(let i = 1; i < 7; i++){
    let x = rettangoli4[i-1].x + Rsize + margin;
    let y = 225;
    rettangoli4.push({x,y,Rsize,Rheight,vita:2, color:"white"})
    }
}

// power e pallina power
function drawPower(){
    if(!pallina2){ctx.drawImage(Razzismo,powerx,powery,powersize,powersize);}
    if(ballX + radius > powerx && ballX - radius < powerx + powersize 
       && ballY - radius < powery + powersize && ballY + radius > powery)
       {pallina2 = true;}
}
function Ball2(){
    if(pallina2 && vivaBall2){
        ctx.save();
        ctx.fillStyle = 'yellow'
        ctx.beginPath();
        ctx.arc(pallax,pallay, radius,0,Math.PI * 2)
        ctx.fill();
        ctx.restore(); 
    }
}

// disegnare blocchi e le loro collisioni
function disegnarect(){
               //BALL 1!!! 
    //riga 4
    for(let i = rettangoli4.length - 1; i >= 0; i--){
        
    hitX = false;
    hitY = false;
    if(rettangoli4[i].vita == 0){
        rettangoli4.splice(i,1);
        stageGame ++;
        continue;
    }
    if(rettangoli4[i].vita == 1){
        rettangoli4[i].color = 'red'
    }
    ctx.fillStyle = rettangoli4[i].color
    ctx.fillRect(rettangoli4[i].x,rettangoli4[i].y,rettangoli4[i].Rsize,rettangoli4[i].Rheight);


    //parte sinistra
    if(ballY < rettangoli4[i].y + Rheight && ballY > rettangoli4[i].y && ballX + radius > rettangoli4[i].x && ballX < rettangoli4[i].x )
        {hitX = true; rettangoli4[i].vita -= 1;
    }
    // parte alta
    else if(ballX > rettangoli4[i].x && rettangoli4[i].x + Rsize > ballX && ballY + radius > rettangoli4[i].y &&  ballY + radius < rettangoli4[i].y + Rheight){
       hitY = true;rettangoli4[i].vita -= 1;
    }
    // parte bassa
    else if(ballX > rettangoli4[i].x && rettangoli4[i].x + Rsize > ballX && ballY - radius < rettangoli4[i].y + Rheight && ballY - radius > rettangoli4[i].y){
       hitY = true;rettangoli4[i].vita -= 1;
    } 
    // parte destra 
    else if(ballY < rettangoli4[i].y + Rheight && ballY > rettangoli4[i].y && ballX - radius < rettangoli4[i].x + Rsize && ballX - radius > rettangoli4[i].x ){
        hitX = true;rettangoli4[i].vita -= 1;
    }

    

    if (hitX && hitY) {
  
        ball2directionX = -balldirectionX;
        balldirectionY = -balldirectionY;
        ballX += balldirectionX * 0.3;
        ballY += balldirectionY  * 0.3;
    }
    else if (hitX) {
        balldirectionX = -balldirectionX;
        ballX += balldirectionX * 0.3;
    }
    else if (hitY) {
        balldirectionY = -balldirectionY;
        ballY += balldirectionY * 0.3;
    }
}
// riga 3
for(let i = rettangoli3.length - 1; i >= 0; i--){
    hitX = false;
    hitY = false;
    if(rettangoli3[i].vita == 0){
        rettangoli3.splice(i,1);
        stageGame ++;
        continue;
    }
    if(rettangoli3[i].vita == 1){
        rettangoli3[i].color = 'red'
    }
    ctx.fillStyle = rettangoli3[i].color
    ctx.fillRect(rettangoli3[i].x,rettangoli3[i].y,rettangoli3[i].Rsize,rettangoli3[i].Rheight);
    
    //parte sinistra
    if(ballY < rettangoli3[i].y + Rheight && ballY > rettangoli3[i].y && ballX + radius > rettangoli3[i].x && ballX < rettangoli3[i].x )
        {hitX = true; rettangoli3[i].vita -= 1;
    }
    // parte alta
    else if(ballX > rettangoli3[i].x && rettangoli3[i].x + Rsize > ballX && ballY + radius > rettangoli3[i].y &&  ballY + radius < rettangoli3[i].y + Rheight){
       hitY = true;rettangoli3[i].vita -= 1;
    }
    // parte bassa
    else if(ballX > rettangoli3[i].x && rettangoli3[i].x + Rsize > ballX && ballY - radius < rettangoli3[i].y + Rheight && ballY - radius > rettangoli3[i].y){
       hitY = true;rettangoli3[i].vita -= 1;
    } 
    // parte destra 
    else if(ballY < rettangoli3[i].y + Rheight && ballY > rettangoli3[i].y && ballX - radius < rettangoli3[i].x + Rsize && ballX - radius > rettangoli3[i].x ){
        hitX = true;rettangoli3[i].vita -= 1;
    }
    
    if (hitX && hitY) {
  
        balldirectionX = -balldirectionX;
        balldirectionY = -balldirectionY;
        ballX += balldirectionX * 0.3;
        ballY += balldirectionY  * 0.3;
    }
    else if (hitX) {
        balldirectionX = -balldirectionX;
        ballX += balldirectionX * 0.3;
    }
    else if (hitY) {
        balldirectionY = -balldirectionY;
        ballY += balldirectionY * 0.3;
    }
}
// riga 3 e mezzo
for(let i = rettangoli3emezzo.length - 1; i >= 0; i--){
    hitX = false;
    hitY = false;
    if(rettangoli3emezzo[i].vita == 0){
        rettangoli3emezzo.splice(i,1);
        stageGame ++;
        continue;
    }
    if(rettangoli3emezzo[i].vita == 1){
        rettangoli3emezzo[i].color = 'red'
    }
    ctx.fillStyle = rettangoli3emezzo[i].color
    ctx.fillRect(rettangoli3emezzo[i].x,rettangoli3emezzo[i].y,rettangoli3emezzo[i].Rsize,rettangoli3emezzo[i].Rheight);
    
    //parte sinistra
    if(ballY < rettangoli3emezzo[i].y + Rheight && ballY > rettangoli3emezzo[i].y && ballX + radius > rettangoli3emezzo[i].x && ballX < rettangoli3emezzo[i].x )
        {hitX = true; rettangoli3emezzo[i].vita -= 1;
    }
    // parte alta
    else if(ballX > rettangoli3emezzo[i].x && rettangoli3emezzo[i].x + Rsize > ballX && ballY + radius > rettangoli3emezzo[i].y &&  ballY + radius < rettangoli3emezzo[i].y + Rheight){
       hitY = true;rettangoli3emezzo[i].vita -= 1;
    }
    // parte bassa
    else if(ballX > rettangoli3emezzo[i].x && rettangoli3emezzo[i].x + Rsize > ballX && ballY - radius < rettangoli3emezzo[i].y + Rheight && ballY - radius > rettangoli3emezzo[i].y){
       hitY = true;rettangoli3emezzo[i].vita -= 1;
    } 
    // parte destra 
    else if(ballY < rettangoli3emezzo[i].y + Rheight && ballY > rettangoli3emezzo[i].y && ballX - radius < rettangoli3emezzo[i].x + Rsize && ballX - radius > rettangoli3emezzo[i].x ){
        hitX = true;rettangoli3emezzo[i].vita -= 1;
    }
    
    if (hitX && hitY) {
  
        balldirectionX = -balldirectionX;
        balldirectionY = -balldirectionY;
        ballX += balldirectionX * 0.3;
        ballY += balldirectionY  * 0.3;
    }
    else if (hitX) {
        balldirectionX = -balldirectionX;
        ballX += balldirectionX * 0.3;
    }
    else if (hitY) {
        balldirectionY = -balldirectionY;
        ballY += balldirectionY * 0.3;
    }
}
// riga 2
for(let i = rettangoli2.length - 1; i >= 0; i--){
    hitX = false;
    hitY = false;
    if(rettangoli2[i].vita == 0){
        rettangoli2.splice(i,1);
        stageGame ++;
        continue;
    }
    if(rettangoli2[i].vita == 1){
        rettangoli2[i].color = 'red'
    }
    ctx.fillStyle = rettangoli2[i].color
    ctx.fillRect(rettangoli2[i].x,rettangoli2[i].y,rettangoli2[i].Rsize,rettangoli2[i].Rheight);
    
    //parte sinistra
    if(ballY < rettangoli2[i].y + Rheight && ballY > rettangoli2[i].y && ballX + radius > rettangoli2[i].x && ballX < rettangoli2[i].x )
        {hitX = true; rettangoli2[i].vita -= 1;
    }
    // parte alta
    else if(ballX > rettangoli2[i].x && rettangoli2[i].x + Rsize > ballX && ballY + radius > rettangoli2[i].y &&  ballY + radius < rettangoli2[i].y + Rheight){
       hitY = true;rettangoli2[i].vita -= 1;
    }
    // parte bassa
    else if(ballX > rettangoli2[i].x && rettangoli2[i].x + Rsize > ballX && ballY - radius < rettangoli2[i].y + Rheight && ballY - radius > rettangoli2[i].y){
       hitY = true;rettangoli2[i].vita -= 1;
    } 
    // parte destra 
    else if(ballY < rettangoli2[i].y + Rheight && ballY > rettangoli2[i].y && ballX - radius < rettangoli2[i].x + Rsize && ballX - radius > rettangoli2[i].x ){
        hitX = true;rettangoli2[i].vita -= 1;
    }
    
    if (hitX && hitY) {
  
        balldirectionX = -balldirectionX;
        balldirectionY = -balldirectionY;
        ballX += balldirectionX * 0.3;
        ballY += balldirectionY  * 0.3;
    }
    else if (hitX) {
        balldirectionX = -balldirectionX;
        ballX += balldirectionX * 0.3;
    }
    else if (hitY) {
        balldirectionY = -balldirectionY;
        ballY += balldirectionY * 0.3;
    }
}
// riga 1
for(let i = rettangoli.length - 1; i >= 0; i--){
    hitX = false;
    hitY = false;
    if(rettangoli[i].vita == 0){
        rettangoli.splice(i,1);
        stageGame ++;
        continue;
    }
    if(rettangoli[i].vita == 1){
        rettangoli[i].color = 'red'
    }
    ctx.fillStyle = rettangoli[i].color
    ctx.fillRect(rettangoli[i].x,rettangoli[i].y,rettangoli[i].Rsize,rettangoli[i].Rheight);
    
    //parte sinistra
    if(ballY < rettangoli[i].y + Rheight && ballY > rettangoli[i].y && ballX + radius > rettangoli[i].x && ballX < rettangoli[i].x )
        {hitX = true; rettangoli[i].vita -= 1;
    }
    // parte alta
    else if(ballX > rettangoli[i].x && rettangoli[i].x + Rsize > ballX && ballY + radius > rettangoli[i].y &&  ballY + radius < rettangoli[i].y + Rheight){
       hitY = true;rettangoli[i].vita -= 1;
    }
    // parte bassa
    else if(ballX > rettangoli[i].x && rettangoli[i].x + Rsize > ballX && ballY - radius < rettangoli[i].y + Rheight && ballY - radius > rettangoli[i].y){
       hitY = true;rettangoli[i].vita -= 1;
    } 
    // parte destra 
    else if(ballY < rettangoli[i].y + Rheight && ballY > rettangoli[i].y && ballX - radius < rettangoli[i].x + Rsize && ballX - radius > rettangoli[i].x ){
        hitX = true;rettangoli[i].vita -= 1;
    }
    if (hitX && hitY) {
  
        balldirectionX = -balldirectionX;
        balldirectionY = -balldirectionY;
        ballX += balldirectionX * 0.3;
        ballY += balldirectionY  * 0.3;
    }
    else if (hitX) {
        balldirectionX = -balldirectionX;
        ballX += balldirectionX * 0.3;
    }
    else if (hitY) {
        balldirectionY = -balldirectionY;
        ballY += balldirectionY * 0.3;
    }}

           
    
                // BALL 2 !!!
                //riga 4
    if(vivaBall2){
    for(let i = rettangoli4.length - 1; i >= 0; i--){
        
    hitX = false;
    hitY = false;
    if(rettangoli4[i].vita == 0){
        rettangoli4.splice(i,1);
        stageGame ++;
        continue;
    }
    if(rettangoli4[i].vita == 1){
        rettangoli4[i].color = 'red'
    }
    ctx.fillStyle = rettangoli4[i].color
    ctx.fillRect(rettangoli4[i].x,rettangoli4[i].y,rettangoli4[i].Rsize,rettangoli4[i].Rheight);


    //parte sinistra
    if(pallay < rettangoli4[i].y + Rheight && pallay > rettangoli4[i].y && pallax + radius > rettangoli4[i].x && pallax < rettangoli4[i].x )
        {hitX = true; rettangoli4[i].vita -= 1;
    }
    // parte alta
    else if(pallax > rettangoli4[i].x && rettangoli4[i].x + Rsize > pallax && pallay + radius > rettangoli4[i].y &&  pallay + radius < rettangoli4[i].y + Rheight){
       hitY = true;rettangoli4[i].vita -= 1;
    }
    // parte bassa
    else if(pallax > rettangoli4[i].x && rettangoli4[i].x + Rsize > pallax && pallay - radius < rettangoli4[i].y + Rheight && pallay - radius > rettangoli4[i].y){
       hitY = true;rettangoli4[i].vita -= 1;
    } 
    // parte destra 
    else if(pallay < rettangoli4[i].y + Rheight && pallay > rettangoli4[i].y && pallax - radius < rettangoli4[i].x + Rsize && pallax - radius > rettangoli4[i].x ){
        hitX = true;rettangoli4[i].vita -= 1;
    }

    

    if (hitX && hitY) {
  
        ball2directionX = -ball2directionX;
        ball2directionY = -ball2directionY;
        pallax += ball2directionX * 0.3;
        pallay += ball2directionY  * 0.3;
    }
    else if (hitX) {
        ball2directionX = -ball2directionX;
        pallax += ball2directionX * 0.3;
    }
    else if (hitY) {
        ball2directionY = -ball2directionY;
        pallay += ball2directionY * 0.3;
    }
}
// riga 3
for(let i = rettangoli3.length - 1; i >= 0; i--){
    hitX = false;
    hitY = false;
    if(rettangoli3[i].vita == 0){
        rettangoli3.splice(i,1);
        stageGame ++;
        continue;
    }
    if(rettangoli3[i].vita == 1){
        rettangoli3[i].color = 'red'
    }
    ctx.fillStyle = rettangoli3[i].color
    ctx.fillRect(rettangoli3[i].x,rettangoli3[i].y,rettangoli3[i].Rsize,rettangoli3[i].Rheight);
    
    //parte sinistra
    if(pallay < rettangoli3[i].y + Rheight && pallay > rettangoli3[i].y && pallax + radius > rettangoli3[i].x && pallax < rettangoli3[i].x )
        {hitX = true; rettangoli3[i].vita -= 1;
    }
    // parte alta
    else if(pallax > rettangoli3[i].x && rettangoli3[i].x + Rsize > pallax && pallay + radius > rettangoli3[i].y &&  pallay + radius < rettangoli3[i].y + Rheight){
       hitY = true;rettangoli3[i].vita -= 1;
    }
    // parte bassa
    else if(pallax > rettangoli3[i].x && rettangoli3[i].x + Rsize > pallax && pallay - radius < rettangoli3[i].y + Rheight && pallay - radius > rettangoli3[i].y){
       hitY = true;rettangoli3[i].vita -= 1;
    } 
    // parte destra 
    else if(pallay < rettangoli3[i].y + Rheight && pallay > rettangoli3[i].y && pallax - radius < rettangoli3[i].x + Rsize && pallax - radius > rettangoli3[i].x ){
        hitX = true;rettangoli3[i].vita -= 1;
    }
    
    if (hitX && hitY) {
  
        ball2directionX = -ball2directionX;
        ball2directionY = -ball2directionY;
        pallax += ball2directionX * 0.3;
        pallay += ball2directionY  * 0.3;
    }
    else if (hitX) {
        ball2directionX = -ball2directionX;
        pallax += ball2directionX * 0.3;
    }
    else if (hitY) {
        ball2directionY = -ball2directionY;
        pallay += ball2directionY * 0.3;
    }
}
// riga 3 e mezzo
for(let i = rettangoli3emezzo.length - 1; i >= 0; i--){
    hitX = false;
    hitY = false;
    if(rettangoli3emezzo[i].vita == 0){
        rettangoli3emezzo.splice(i,1);
        stageGame ++;
        continue;
    }
    if(rettangoli3emezzo[i].vita == 1){
        rettangoli3emezzo[i].color = 'red'
    }
    ctx.fillStyle = rettangoli3emezzo[i].color
    ctx.fillRect(rettangoli3emezzo[i].x,rettangoli3emezzo[i].y,rettangoli3emezzo[i].Rsize,rettangoli3emezzo[i].Rheight);
    
    //parte sinistra
    if(pallay < rettangoli3emezzo[i].y + Rheight && pallay > rettangoli3emezzo[i].y && pallax + radius > rettangoli3emezzo[i].x && pallax < rettangoli3emezzo[i].x )
        {hitX = true; rettangoli3emezzo[i].vita -= 1;
    }
    // parte alta
    else if(pallax > rettangoli3emezzo[i].x && rettangoli3emezzo[i].x + Rsize > pallax && pallay + radius > rettangoli3emezzo[i].y &&  pallay + radius < rettangoli3emezzo[i].y + Rheight){
       hitY = true;rettangoli3emezzo[i].vita -= 1;
    }
    // parte bassa
    else if(pallax > rettangoli3emezzo[i].x && rettangoli3emezzo[i].x + Rsize > pallax && pallay - radius < rettangoli3emezzo[i].y + Rheight && pallay - radius > rettangoli3emezzo[i].y){
       hitY = true;rettangoli3emezzo[i].vita -= 1;
    } 
    // parte destra 
    else if(pallay < rettangoli3emezzo[i].y + Rheight && pallay > rettangoli3emezzo[i].y && pallax - radius < rettangoli3emezzo[i].x + Rsize && pallax - radius > rettangoli3emezzo[i].x ){
        hitX = true;rettangoli3emezzo[i].vita -= 1;
    }
    
    if (hitX && hitY) {
  
        ball2directionX = -ball2directionX;
        ball2directionY = -ball2directionY;
        pallax += ball2directionX * 0.3;
        pallay += ball2directionY  * 0.3;
    }
    else if (hitX) {
        ball2directionX = -ball2directionX;
        pallax += ball2directionX * 0.3;
    }
    else if (hitY) {
        ball2directionY = -ball2directionY;
        pallay += ball2directionY * 0.3;
    }
}
// riga 2
for(let i = rettangoli2.length - 1; i >= 0; i--){
    hitX = false;
    hitY = false;
    if(rettangoli2[i].vita == 0){
        rettangoli2.splice(i,1);
        stageGame ++;
        continue;
    }
    if(rettangoli2[i].vita == 1){
        rettangoli2[i].color = 'red'
    }
    ctx.fillStyle = rettangoli2[i].color
    ctx.fillRect(rettangoli2[i].x,rettangoli2[i].y,rettangoli2[i].Rsize,rettangoli2[i].Rheight);
    
    //parte sinistra
    if(pallay < rettangoli2[i].y + Rheight && pallay > rettangoli2[i].y && pallax + radius > rettangoli2[i].x && pallax < rettangoli2[i].x )
        {hitX = true; rettangoli2[i].vita -= 1;
    }
    // parte alta
    else if(pallax > rettangoli2[i].x && rettangoli2[i].x + Rsize > pallax && pallay + radius > rettangoli2[i].y &&  pallay + radius < rettangoli2[i].y + Rheight){
       hitY = true;rettangoli2[i].vita -= 1;
    }
    // parte bassa
    else if(pallax > rettangoli2[i].x && rettangoli2[i].x + Rsize > pallax && pallay - radius < rettangoli2[i].y + Rheight && pallay - radius > rettangoli2[i].y){
       hitY = true;rettangoli2[i].vita -= 1;
    } 
    // parte destra 
    else if(pallay < rettangoli2[i].y + Rheight && pallay > rettangoli2[i].y && pallax - radius < rettangoli2[i].x + Rsize && pallax - radius > rettangoli2[i].x ){
        hitX = true;rettangoli2[i].vita -= 1;
    }
    
    if (hitX && hitY) {
  
        ball2directionX = -ball2directionX;
        ball2directionY = -ball2directionY;
        pallax += ball2directionX * 0.3;
        pallay += ball2directionY  * 0.3;
    }
    else if (hitX) {
        ball2directionX = -ball2directionX;
        pallax += ball2directionX * 0.3;
    }
    else if (hitY) {
        ball2directionY = -ball2directionY;
        pallay += ball2directionY * 0.3;
    }
}
// riga 1
for(let i = rettangoli.length - 1; i >= 0; i--){
    hitX = false;
    hitY = false;
    if(rettangoli[i].vita == 0){
        rettangoli.splice(i,1);
        stageGame ++;
        continue;
    }
    if(rettangoli[i].vita == 1){
        rettangoli[i].color = 'red'
    }
    ctx.fillStyle = rettangoli[i].color
    ctx.fillRect(rettangoli[i].x,rettangoli[i].y,rettangoli[i].Rsize,rettangoli[i].Rheight);
    
    //parte sinistra
    if(pallay < rettangoli[i].y + Rheight && pallay > rettangoli[i].y && pallax + radius > rettangoli[i].x && pallax < rettangoli[i].x )
        {hitX = true; rettangoli[i].vita -= 1;
    }
    // parte alta
    else if(pallax > rettangoli[i].x && rettangoli[i].x + Rsize > pallax && pallay + radius > rettangoli[i].y &&  pallay + radius < rettangoli[i].y + Rheight){
       hitY = true;rettangoli[i].vita -= 1;
    }
    // parte bassa
    else if(pallax > rettangoli[i].x && rettangoli[i].x + Rsize > pallax && pallay - radius < rettangoli[i].y + Rheight && pallay - radius > rettangoli[i].y){
       hitY = true;rettangoli[i].vita -= 1;
    } 
    // parte destra 
    else if(pallay < rettangoli[i].y + Rheight && pallay > rettangoli[i].y && pallax - radius < rettangoli[i].x + Rsize && pallax - radius > rettangoli[i].x ){
        hitX = true;rettangoli[i].vita -= 1;
    }
    if (hitX && hitY) {
  
        ball2directionX = -ball2directionX;
        ball2directionY = -ball2directionY;
        pallax += ball2directionX * 0.3;
        pallay += ball2directionY  * 0.3;
    }
    else if (hitX) {
        ball2directionX = -ball2directionX;
        pallax += ball2directionX * 0.3;
    }
    else if (hitY) {
        ball2directionY = -ball2directionY;
        pallay += ball2directionY * 0.3;
    }}}
}

// vittori
function vittoria(){
    if( rettangoli4.length === 0 &&  rettangoli3emezzo.length === 0 &&  rettangoli2.length === 0 &&  rettangoli.length === 0) 
        victory = true;
}

// stage primo livello
function stageG(){
    
    if(stageGame >= 0 && stageGame < 10){
        ctx.drawImage(Lono,0,0,canvas.width,canvas.height);
    }
    if(stageGame >= 0 && stageGame < 4){
         // robot 
        ctxLeft.fillStyle = "#243010";
        ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
        ctxLeft.drawImage(RobotImg,5,50,150,250);
        ctxLeft.fillStyle = "white";
        ctxLeft.font = " 40px 'Jersey 10'";
        ctxLeft.fillText("Lono e' furioso,",170,75);
        ctxLeft.fillText("una sua compagna",170,105);
        ctxLeft.fillText("l'ha SNITCHATO...",170,140);
    }
    if(stageGame >= 4 && stageGame < 6){
        ctxLeft.fillStyle = "#243010";
        ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
        ctxLeft.drawImage(RobotFrame2,5,50,150,250);
        ctxLeft.fillStyle = "white";
        ctxLeft.font = " 40px 'Jersey 10'";
        ctxLeft.fillText("Stai andando",170,80);
        ctxLeft.fillText("alla grande!",170,110);
        ctxLeft.fillText("continua cosi'",170,140);
       
    }
    if(stageGame >= 6 && stageGame < 10){
        ctxLeft.fillStyle = "#243010";
        ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
        ctxLeft.drawImage(Robotframe3,5,50,150,250);
        ctxLeft.fillStyle = "white";
        ctxLeft.font = " 40px 'Jersey 10'";
        ctxLeft.fillText("Perde colpi...",170,80);
       
    }
    if(stageGame >= 10 && stageGame < 21){
        ctx.drawImage(Lono2,0,0,canvas.width,canvas.height);
    }
    if(stageGame >= 10 && stageGame < 21){
        ctxLeft.fillStyle = "#243010";
        ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
        ctxLeft.drawImage(Robotframe3,5,50,150,250);
        ctxLeft.fillStyle = "white";
        ctxLeft.font = " 40px 'Jersey 10'";
        ctxLeft.fillText("Si e' inzuppato,",170,80);
        ctxLeft.fillText("tutte le scarpe",170,110);
        ctxLeft.fillText("sta cedendo...",170,140);
       
    }
    if(stageGame >= 21){
        ctxLeft.fillStyle = "#243010";
        ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
        ctxLeft.drawImage(Robotframe4,5,50,150,250);
        ctxLeft.fillStyle = "white";
        ctxLeft.font = " 40px 'Jersey 10'";
        ctxLeft.fillText("Sua madre ha",170,80);
        ctxLeft.fillText("visto il pc rotto",170,110);
        ctxLeft.fillText("e' la fine per lui..",170,140);
       
    }
    if(stageGame >= 21){
        ctx.drawImage(Lono3,0,0,canvas.width,canvas.height);
    }
};

// gameover lifes
function Go(){
    if(lifes == 0){
        GameOver = true;
    }
}

// colisione muri pallina primo lvl
function collsionwall(){
    if(ballX + radius >= canvas.width){
        balldirectionX = -balldirectionX;
    }
    if(ballX - radius < radius){
        balldirectionX = -balldirectionX;
    }
    if(ballY - radius < 0){
        balldirectionY = -balldirectionY;
    }
        // ball 2
    if(pallax + radius >= canvas.width){
        ball2directionX = -ball2directionX;
    }
    if(pallax - radius < radius){
        ball2directionX = -ball2directionX;
    }
    if(pallay - radius < 0){
        ball2directionY = -ball2directionY;
    }
}

// perdita vite pallina primo lvl
function controlloLose(){
    if(ballY + radius > canvas.height){
        lifes -= 1;
        ballX =canvas.width/2;
        ballY =canvas.height/2 - 100;
    }
    if(pallay + radius > canvas.height){
        vivaBall2 = false;
    }
    
}

// collisione con barra pallaina primo lvl
function collisioneBar(){
    if(ballY + radius >= barY && ballX + radius > barX && barX + barSize > ballX + radius){
       
        let centerdistance = ballX - (barX + barSize/2);
        let normalized = centerdistance/(barSize/2);

        balldirectionX = normalized * 6;
        balldirectionY = -Math.abs(balldirectionY)
    }
    if(pallay + radius >= barY && pallax + radius > barX && barX + barSize > pallax + radius){
       
        let centerdistance = pallax - (barX + barSize/2);
        let normalized = centerdistance/(barSize/2);

        ball2directionX = normalized * 6;
        ball2directionY = -Math.abs(ball2directionY)
    }
}

// disegno pallina primo lvl e suo movimento
function drawBall(){
    ctx.save();
    ctx.fillStyle = 'white'
    ctx.beginPath();
    ctx.arc(ballX,ballY, radius,0,Math.PI * 2)
    ctx.fill();
    ctx.restore();
}
function Ballmovement(){
    ballX += balldirectionX;
    ballY += balldirectionY;
    if(pallina2){
        pallax += ball2directionX;
        pallay += ball2directionY;
}
}
//............................................................................................................................................







