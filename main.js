// canvas centrale del gioco
const canvas = document.querySelector("#canvas");
const canvasLeft = document.querySelector("#canvasLeft");
//...........................................................................................

// canvas left robot
const ctxLeft = canvasLeft.getContext("2d");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
canvasLeft.width = 450;
canvasLeft.height = 300;
canvas.style.border = "3px solid #87A330";
canvas.style.boxShadow = "0px 0px 60px #A1C349"
//...........................................................................................

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
Lono3.src = "LonoSalotto.jpg";
const LonoGameOver = new Image();
LonoGameOver.src = "LonoVittoria2.png";
//...........................................................................................
// immagini per il secondo livello
const FraInizio = new Image();
FraInizio.src = "FraInizio.jpeg";
const Robot2Braccio = new Image();
Robot2Braccio.src = "robot2Braccio.png";
const tazzaCalda = new Image();
tazzaCalda.src = "tazzaCalda.png";
const Bomb = new Image();
Bomb.src = "bomb.png";
const esplosione = new Image();
esplosione.src = "esplosione.png";
const FrankGover = new Image();
FrankGover.src = "frankGover.png";
const FrankT = new Image();
FrankT.src = "TazzaFrank.png";
const FrankV = new Image();
FrankV.src = "FrankVittoria.png";

// immagini livello 3
const RickyWIP = new Image();
RickyWIP.src = "RickyWIP.png";

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
//...........................................................................................

// caricamento font e immagini
Promise.all([
    // primo livello
    new Promise(resolve => sfondoV.onload = resolve),
    new Promise(resolve => Lono.onload = resolve),
    new Promise(resolve => Razzismo.onload = resolve),
    new Promise(resolve => Lono2.onload = resolve),
    new Promise(resolve => Lono3.onload = resolve),
    new Promise(resolve => LonoGameOver.onload = resolve),
    
    // secondo livello
    new Promise(resolve => FraInizio.onload = resolve),
    new Promise(resolve => tazzaCalda.onload = resolve),
    new Promise(resolve => Bomb.onload = resolve),
    new Promise(resolve => esplosione.onload = resolve),
    new Promise(resolve => FrankGover.onload = resolve),
    new Promise(resolve => FrankT.onload = resolve),
    new Promise(resolve => FrankV.onload = resolve),
    // terzo livello
    new Promise(resolve => RickyWIP.onload = resolve),

    // caricamento robot animazioni 
    new Promise(resolve => RobotImg.onload = resolve),
    new Promise(resolve => RobotFrame2.onload = resolve),
    new Promise(resolve => Robotframe3.onload = resolve),
    new Promise(resolve => Robotframe4.onload = resolve),
    new Promise(resolve => RobotPiange.onload = resolve),
    new Promise(resolve => Robot2Braccio.onload = resolve),
    

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
//...........................................................................................
//                                                          VARIABILI GENERALI 

// variabile per devinire lo stato del gioco home..lvl1..lvl2..lvl3
let StatoDellaHome = 0 // 0 titolo; 1 spiegazione; ecc..
let Lvl1 = false;
let lvl1finito = false;
let lvl2 = false;

// listener space bar per movimento dialoghi
window.addEventListener("keyup", (e)=>{
    if(e.code === 'Space')StatoDellaHome ++;
})
window.addEventListener("keyup", (e)=>{
    if(e.code === 'Enter'){
        Lvl1 = true;
    }})
window.addEventListener("keyup", (e)=>{
    if(e.code === 'KeyR')
        location.reload();
})
window.addEventListener("keyup", (e)=>{
    if((e.code === 'Digit2' || e.code === 'Numpad2') && lvl1finito)
    livello2();
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

//...........................................................................................

//                                                        FUNZIONI GENERALI
function movement(){
    if(keys.d){barX += velocita;} 
    if(keys.a){barX -= velocita;}
}
function drawBar(){
    ctx.save();
    ctx.fillStyle = "white";
    ctx.fillRect(barX,barY,barSize,barH);
    ctx.strokeStyle = 'black';
    ctx.shadowColor = "black";
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
//...........................................................................................
//                                                        FUNZIONI HOME
function Home(){
    if(Lvl1)return Livello1();
    canvas.style.border = "none";
    canvas.style.boxShadow = "none";
    ctx.strokeStyle = '#87A330';
    ctx.shadowColor = "#87A330";
    ctx.lineWidth = "2"
    ctx.shadowBlur = 12
    if(StatoDellaHome == 0){
        
        ctx.fillStyle = "#243010"
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctxLeft.fillStyle = "#243010"
        ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
        ctx.fillStyle = "white";
        ctx.font = " 100px 'Jersey 10'";
        ctx.fillText("CACCHIATE",0,canvas.height/2- 160);
        ctx.fillText("DI",0,canvas.height/2 - 80);
        ctx.fillText("FAMIGLIA",0,canvas.height/2 );
        ctx.font = " 40px 'Jersey 10'";
        ctx.fillText("THE GAME",0,canvas.height/2 + 50 );

        ctx.fillText("Press the space bar to continue...",0,canvas.height - 80 );
        ctx.fillText("or press enter to skip the introduction...",0,canvas.height - 40 );
        ctx.font = "15px Arial";
        ctx.fillText("▼", canvas.width/2 + 80,canvas.height - 85 + frecciaOffset);
        ctx.fillText("▼", canvas.width/2 + 175,canvas.height - 45 + frecciaOffset);
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
        canvas.style.border = "3px solid #87A330";
        canvas.style.boxShadow = "0px 0px 60px #A1C349"
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
        ctx.fillText("questa e' la tua arma, la BARRA,",canvas.width/2-180,canvas.height/2 - 280);
        ctx.fillText("muovila con i tasti 'a' e 'w'.",canvas.width/2-180,canvas.height/2 -240);
        ctx.fillText("Se la colpisci in mezzo la palla andra'",canvas.width/2-180,canvas.height/2 -200);
        ctx.fillText("su dritta, se colpita ai lati",canvas.width/2-180,canvas.height/2 - 160);
        ctx.fillText("rimbalzera' a seconda di quanto",canvas.width/2-180,canvas.height/2-120);
        ctx.fillText("a lato e' stata presa...",canvas.width/2-180,canvas.height/2 - 80);
        ctx.font = "15px Arial";
        ctx.fillText("▼", canvas.width/2 + 125,canvas.height/2 - 85 + frecciaOffset);
        ctx.fillStyle = "red";
        ctx.fillStyle = "white";
        ctx.fillRect(barX,barY,barSize,barH);
        ctx.strokeRect(barX,barY,barSize,barH);
        ctx.stroke();
        }
    if(StatoDellaHome == 5){
        ctx.fillStyle = "#243010"
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctxLeft.fillStyle = "#243010"
        ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
        ctx.drawImage(Robotframe3,30,canvas.height/2 ,150,250);
        ctx.fillStyle = "white";
        ctx.font = " 40px 'Jersey 10'";
        ctx.fillText("per vincere distruggi tutti",canvas.width/2-180,canvas.height/2 - 80);
        ctx.fillText("i rettangoli colorati, serve piu",canvas.width/2-180,canvas.height/2 -40);
        ctx.fillText("di una hit per toglierli di torno.",canvas.width/2-180,canvas.height/2);
        ctx.fillText("Ci sono dei PowerUp che puoi ",canvas.width/2-180,canvas.height/2 + 40);
        ctx.fillText("utilizzare a tuo vantaggio...",canvas.width/2-180,canvas.height/2 + 80);
        ctx.fillStyle = "yellow"
        ctx.fillRect(200,100,100,20);
        ctx.fillStyle = "lightgreen"
        ctx.fillRect(305,100,100,20);
        ctx.fillStyle = "violet"
        ctx.fillRect(410,100,100,20);
        ctx.fillStyle = "orange"
        ctx.fillRect(515,100,100,20);
         ctx.fillStyle = "white"
        ctx.font = "15px Arial";
        ctx.fillText("▼", canvas.width/2 + 205,canvas.height/2 + 75 + frecciaOffset);
        }
    if(StatoDellaHome == 6){
        ctx.fillStyle = "#243010"
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctxLeft.fillStyle = "#243010"
        ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
        ctx.drawImage(Robotframe4,30,canvas.height/2 ,150,250);
        ctx.fillStyle = "white";
        ctx.font = " 40px 'Jersey 10'";
        ctx.fillText("Perfetto mi sembri pronto!",canvas.width/2-180,canvas.height/2 - 80);
        ctx.fillText("Clicca 'invio' per giocare.",canvas.width/2-180,canvas.height/2 -40);
        }

    // valore oscilazzione freccia dialogo
    frecciaTimer += 0.05;
    frecciaOffset = Math.sin(frecciaTimer * 3) * 3;
    // loop
    requestAnimationFrame(Home);
}

//...........................................................................................

//                                                        VARIABILI 1 LIVELLO LONO

// variabile stage gioco
let stageGame1 = 0;
let CreazioneLvl1 = true;
let lvl1ready = false;

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
let ballY =canvas.height/2-50
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
if(CreazioneLvl1){
crearerectrow1();
crearerectrow2();
crearerectrow3();
crearerectrow3emezzo();
crearerectrow4();
}



// variabile lifes e gameover o victory
let victory = false;
let GameOver = false;
//...........................................................................................

//                                                          FUNZIONI SOLO PER IL PRIMO LIVELLO

// loop per far partire il primo livello
function Livello1(){
    window.addEventListener("keyup", (e)=>{
    if(e.code === 'Space') lvl1ready = true;
    })
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctxLeft.clearRect(0,0,canvasLeft.width,canvasLeft.height);
    canvas.style.border = "3px solid #87A330";
    canvas.style.boxShadow = "0px 0px 60px #87A330";
    if(GameOver){
        CreazioneLvl1 = false;
        ctx.strokeStyle = 'black';
        ctx.shadowColor = "black";
        ctx.lineWidth = "3"
        ctx.shadowBlur = 12
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
        ctx.drawImage(RobotPiange,30,canvas.height -300 ,150,250);
        ctx.fillStyle = "white";
        ctx.font = " 40px 'Jersey 10'";
        ctx.fillText("Lono e' stato troppo OP",220,600);
        ctx.fillText("Sara' per la prossima.",220,650);
        ctx.fillText("Premi 'r' per riprovare...",220,700);
        return;
    }
    //vittoria();
    if(rettangoli4.length === 0 &&  rettangoli3emezzo.length === 0 && rettangoli3.length === 0 &&  rettangoli2.length === 0 &&  rettangoli.length === 0){
        ctx.save();
        ctx.strokeStyle = '#87A330';
        ctx.shadowColor = "#87A330";
        ctx.lineWidth = "3"
        ctx.shadowBlur = 12
        ctx.fillStyle = "#243010";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctxLeft.fillStyle = "#243010";
        ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
        ctx.drawImage(Robotframe4,30,canvas.height/2 + 40,150,250);
        ctx.fillStyle = "white";
        ctx.font = " 40px 'Jersey 10'";
        ctx.fillText("Bravissimo hai sconfitto Lono",230,400);
        ctx.fillText("EEEEEAASY!!!!!!",230,450);
        ctx.fillText("Premi '2' per andare al prossimo livello!",230,500);
        canvas.style.border = "none";
        canvas.style.boxShadow = "none";
        ctx.restore();
        ballX =canvas.width/2;
        ballY =canvas.height/2
        return lvl1finito = true;
    }
    
    Go();
    stageG1();
    controlloLose();
    hearts();
    movement();
    bordiBar();
    if(lvl1ready)Ballmovement();
    drawBall();
    collisioneBar();
    collsionwall();
    drawBar();
    Ball2()
    drawPower();
    disegnarect();
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
    //  neon
    ctx.strokeStyle = 'black';
    ctx.shadowColor = "black";
    ctx.lineWidth = "3"
    ctx.shadowBlur = 12
    //riga 4
    for(let i = rettangoli4.length - 1; i >= 0; i--){
        
    hitX = false;
    hitY = false;
    if(rettangoli4[i].vita == 0){
        rettangoli4.splice(i,1);
        stageGame1 ++;
        continue;
    }
    if(rettangoli4[i].vita == 1){
        rettangoli4[i].color = 'red'
    }
    if(rettangoli4[i].vita == 2){
        rettangoli4[i].color = 'violet'
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
        stageGame1 ++;
        continue;
    }
    if(rettangoli3[i].vita == 1){
        rettangoli3[i].color = 'red'
    }
    if(rettangoli3[i].vita == 2){
        rettangoli3[i].color = 'yellow'
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
        stageGame1 ++;
        continue;
    }
    if(rettangoli3emezzo[i].vita == 1){
        rettangoli3emezzo[i].color = 'red'
    }
    if(rettangoli3emezzo[i].vita == 2){
        rettangoli3emezzo[i].color = 'yellow'
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
        stageGame1 ++;
        continue;
    }
    if(rettangoli2[i].vita == 1){
        rettangoli2[i].color = 'red'
    }
    if(rettangoli2[i].vita == 2){
        rettangoli2[i].color = 'lightgreen'
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
        stageGame1 ++;
        continue;
    }
    if(rettangoli[i].vita == 1){
        rettangoli[i].color = 'red'
    }
    if(rettangoli[i].vita == 2){
        rettangoli[i].color = 'orange'
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

    //.................................................................................................     
    
    //                                    BALL 2 !!!
                //riga 4
    if(vivaBall2){
    for(let i = rettangoli4.length - 1; i >= 0; i--){
        
    hitX = false;
    hitY = false;
    if(rettangoli4[i].vita == 0){
        rettangoli4.splice(i,1);
        stageGame1 ++;
        continue;
    }
    if(rettangoli4[i].vita == 1){
        rettangoli4[i].color = 'red'
    }
    if(rettangoli4[i].vita == 2){
        rettangoli4[i].color = 'violet'
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
        stageGame1 ++;
        continue;
    }
    if(rettangoli3[i].vita == 1){
        rettangoli3[i].color = 'red'
    }
    if(rettangoli3[i].vita == 2){
        rettangoli3[i].color = 'yellow'
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
        stageGame1 ++;
        continue;
    }
    if(rettangoli3emezzo[i].vita == 1){
        rettangoli3emezzo[i].color = 'red'
    }
    if(rettangoli3emezzo[i].vita == 2){
        rettangoli3emezzo[i].color = 'yellow'
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
        stageGame1 ++;
        continue;
    }
    if(rettangoli2[i].vita == 1){
        rettangoli2[i].color = 'red'
    }
    if(rettangoli2[i].vita == 2){
        rettangoli2[i].color = 'lightgreen'
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
        stageGame1 ++;
        continue;
    }
    if(rettangoli[i].vita == 1){
        rettangoli[i].color = 'red'
    }
    if(rettangoli[i].vita == 2){
        rettangoli[i].color = 'orange'
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
// stage primo livello
function stageG1(){
    
    if(stageGame1 >= 0 && stageGame1 < 10){
        ctx.drawImage(Lono,0,0,canvas.width,canvas.height);
    }
    if(stageGame1 >= 0 && stageGame1 < 4){
         // robot 
        ctxLeft.fillStyle = "#243010";
        ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
        ctxLeft.drawImage(RobotImg,15,canvasLeft.height -100,150,100);
        ctxLeft.fillStyle = "white";
        ctxLeft.font = " 35px 'Jersey 10'";
        ctxLeft.fillText("Lono e' furioso,",170,200);
        ctxLeft.fillText("una sua compagna",170,225);
        ctxLeft.fillText("l'ha SNITCHATO...",170,250);
        ctxLeft.fillText("Premi 'Space' per iniziare...",50,50);
    }
    if(stageGame1 >= 4 && stageGame1 < 6){
        ctxLeft.fillStyle = "#243010";
        ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
        ctxLeft.drawImage(RobotFrame2,15,canvasLeft.height -100,150,100);
        ctxLeft.fillStyle = "white";
        ctxLeft.font = " 40px 'Jersey 10'";
        ctxLeft.fillText("Stai andando",170,200);
        ctxLeft.fillText("alla grande!",170,225);
        ctxLeft.fillText("continua cosi'",170,250);
       
    }
    if(stageGame1 >= 6 && stageGame1 < 10){
        ctxLeft.fillStyle = "#243010";
        ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
        ctxLeft.drawImage(Robotframe3,15,canvasLeft.height -100,150,100);
        ctxLeft.fillStyle = "white";
        ctxLeft.font = " 40px 'Jersey 10'";
        ctxLeft.fillText("Perde colpi...",170,200);
       
    }
    if(stageGame1 >= 10 && stageGame1 < 21){
        ctx.drawImage(Lono2,0,0,canvas.width,canvas.height);
    }
    if(stageGame1 >= 10 && stageGame1 < 21){
        ctxLeft.fillStyle = "#243010";
        ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
        ctxLeft.drawImage(Robotframe3,15,canvasLeft.height -100,150,100);
        ctxLeft.fillStyle = "white";
        ctxLeft.font = " 40px 'Jersey 10'";
        ctxLeft.fillText("Si e' inzuppato,",170,200);
        ctxLeft.fillText("tutte le scarpe",170,225);
        ctxLeft.fillText("sta cedendo...",170,250);
       
    }
    if(stageGame1 >= 21){
        ctxLeft.fillStyle = "#243010";
        ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
        ctxLeft.drawImage(Robotframe4,15,canvasLeft.height -100,150,100);
        ctxLeft.fillStyle = "white";
        ctxLeft.font = " 40px 'Jersey 10'";
        ctxLeft.fillText("Sua madre ha",170,200);
        ctxLeft.fillText("visto il pc rotto",170,225);
        ctxLeft.fillText("e' la fine per lui..",170,250);
       
    }
    if(stageGame1 >= 21){
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
        ballY =canvas.height/2 - 50;
        if(powerPresoCL){
        balldirectionX /= 1.5;
        balldirectionY /= 1.5;
        powerPresoCL = false
    }
    }
    if(pallay + radius > canvas.height){
        vivaBall2 = false;
    }

    
}

// collisione con barra pallaina primo lvl
function collisioneBar(){
    if(ballY + radius >= barY && ballX + radius > barX && barX + barSize > ballX ){
       
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
    ctx.shadowBlur = 0;     
    ctx.shadowColor = 'none';
    ctx.strokeStyle = 'none'; 
    ctx.lineWidth = 0;
    ctx.beginPath();
    ctx.fillStyle = 'white'
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
//...........................................................................................
// variabili livello 2 
let stageGame2 = 0;
let inizioLvl2 = false;
let powerPreso = false;
let powerPresoCL = false;
let lvl2power = false;
let lvl2powerx = 576;
let lvl2powery = 243
let lvl2bomb = false;
let bombPreso = false;
let lvl2bombx = 275;
let lvl2bomby = 195;
let esplosioneTime = 0;
let lvl2finito = false;

// salto per iniziare il lvl2
window.addEventListener("keyup", (e)=>{    
if( lvl1finito && e.code === 'Space'){
        inizioLvl2 = true;
        stageGame2 = 1;
    }
});

// per iniziare lvl3
window.addEventListener("keyup", (e)=>{
    if((e.code === 'Digit3' || e.code === 'Numpad3') && lvl2finito)
    livello3();
})

// rettangoli lvl2
let lvl2rettangoli = [{x:50,y:150,Rsize:Rsize,Rheight:Rheight, vita:4,color:'white'}];
let lvl2rettangoli1emezzo = [{x:50,y:175,Rsize:Rsize,Rheight:Rheight, vita:3,color:'white'}];
let lvl2rettangoli1 = [{x:152,y:200,Rsize:Rsize,Rheight:Rheight, vita:3,color:'white'}];
let lvl2rettangoli2emezzo = [{x:50,y:250,Rsize:Rsize,Rheight:Rheight, vita:3,color:'white'}];
let lvl2rettangoli2 = [{x:152,y:225,Rsize:Rsize,Rheight:Rheight, vita:3,color:'white'}];
let lvl2rettangoli3 = [{x:152,y:300,Rsize:Rsize,Rheight:Rheight, vita:2,color:'white'}];
let lvl2rettangoli3emezzo = [{x:50,y:275,Rsize:Rsize,Rheight:Rheight, vita:2,color:'white'}];
let lvl2rettangoli4 = [{x:50,y:325,Rsize:Rsize,Rheight:Rheight, vita:1,color:'red'}];

//                               FUNZIONI LVL2
lvl2crearerectrow4();
lvl2crearerectrow3();
lvl2crearerectrow3emezzo();
lvl2crearerectrow2();
lvl2crearerectrow2emezzo();
lvl2crearerectrow1();
lvl2crearerectrow1emezzo();
lvl2crearerectrow();

function livello2(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctxLeft.clearRect(0,0,canvasLeft.width,canvasLeft.height);
    if(lifes == 0){
        ctx.fillStyle = "#243010";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctxLeft.fillStyle = "#243010";
        ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
        canvas.style.border = "none";
        canvas.style.boxShadow = "none";
        ctx.strokeStyle = 'red';
        ctx.shadowColor = "red";
        ctx.lineWidth = "3"
        ctx.shadowBlur = 12
        ctx.drawImage(FrankGover,0,canvas.height-700,550,650);
        ctx.strokeStyle = 'white';
        ctx.shadowColor = "#243010";
        ctx.lineWidth = "3"
        ctx.shadowBlur = 0
        ctx.fillStyle = "#243010";
        ctx.fillRect(540,195,20,90);
        ctx.strokeStyle = 'black';
        ctx.shadowColor = "black";
        ctx.lineWidth = "3"
        ctx.shadowBlur = 12
        ctx.fillStyle = "red";
        ctx.font = " 40px 'Jersey 10'";
        ctx.fillText("GoooooDooooo!!!",20,260);
        ctx.fillText("NABBO hahaha",20,300);
        ctxLeft.drawImage(Robot2Braccio,-80,-10,300,150);
        ctxLeft.fillStyle = "rgb(128, 253, 255)"
        ctxLeft.fillText("la bomba ti toglie",220,50);
        ctxLeft.fillText("una vita...",220,70);
        ctxLeft.fillText("idiota!",220,90);

        return;
    }
    if(lvl2rettangoli4.length === 0 &&  lvl2rettangoli3emezzo.length === 0 && lvl2rettangoli3.length === 0 && lvl2rettangoli2.length === 0 && lvl2rettangoli2emezzo.length === 0 && lvl2rettangoli1.length === 0 && lvl2rettangoli1emezzo.length === 0 && lvl2rettangoli.length === 0){
        ctx.fillStyle = "#243010";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctxLeft.fillStyle = "#243010";
        ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
        canvas.style.border = "none";
        canvas.style.boxShadow = "none";
        ctx.strokeStyle = 'rgb(0, 179, 255)';
        ctx.shadowColor = "rgb(0, 179, 255)";
        ctx.lineWidth = "3"
        ctx.shadowBlur = 12
        ctx.drawImage(FrankV,0,canvas.height-700,550,650);
        ctx.strokeStyle = '#87A330';
        ctx.shadowColor = "#87A330";
        ctx.lineWidth = "3"
        ctx.shadowBlur = 12
        ctx.drawImage(Robotframe4,30,50,150,250);
        ctx.fillStyle = "white";
        ctx.font = " 40px 'Jersey 10'";
        ctx.fillText("Bravissimo hai sconfitto Frank",230,50);
        ctx.fillText("Vabbe era facile lui!",230,100);
        ctx.fillText("Premi '3' per andare al prossimo livello!",230,150);


        return lvl2finito = true;
    }
    if(inizioLvl2)Ballmovement();
    stageG2();
    if(!powerPreso)lvl2drawpower();
    if(!bombPreso)lvl2drawBomb();
    esplosioneBomb();
    lvl2disegnaRect();
    controlloLose();
    hearts();
    if(bombPreso)esplosioneBomb();
    movement();
    bordiBar();
    lvl2drawBall();
    collisioneBar();
    collsionwall();
    drawBar();
    canvas.style.border = "3px solid #87A330";
    canvas.style.boxShadow = "0px 0px 60px #87A330";
    // valore oscilazzione freccia dialogo
    frecciaTimer += 0.05;
    frecciaOffset = Math.sin(frecciaTimer * 3) * 3;
    requestAnimationFrame(livello2);
}
function stageG2(){
    if(stageGame2 == 0){
    ctx.fillStyle= "#243010"
    ctxLeft.fillStyle= "#243010"
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
    ctxLeft.drawImage(Robotframe4,15,canvasLeft.height -100,150,100);
    ctxLeft.fillStyle = "white";
    ctxLeft.font = " 35px 'Jersey 10'";
    ctxLeft.fillText("Stai  per  affrontare",180,200);
    ctxLeft.fillText("il  FRANK...",180,225);
    ctxLeft.fillText("premi  'space'",180,250);
    ctxLeft.fillText("per  sfidarlo...",180,275);
    ctxLeft.font = "10px Arial";
    ctxLeft.fillText("▼", 360,270 + frecciaOffset);
    ctx.drawImage(FraInizio,0,0,canvas.width,canvas.height);
    ctxLeft.drawImage(Robot2Braccio,-80,-10,300,150);
    ctxLeft.font = " 25px 'Jersey 10'";
    ctxLeft.fillStyle = "rgb(128, 253, 255)"
    ctxLeft.fillText("c'è un PowerUp",220,50);
    ctxLeft.fillText("e anche qualcos'altro...",220,70);
    ctxLeft.fillText("attento!",220,90);
}
    if(stageGame2 == 1){
    ctx.fillStyle= "#243010"
    ctxLeft.fillStyle= "#243010"
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
    ctxLeft.drawImage(Robotframe4,15,canvasLeft.height -100,150,100);
    ctxLeft.fillStyle = "white";
    ctxLeft.font = " 35px 'Jersey 10'";
    ctxLeft.fillText("Forza!!",180,200);
    ctx.drawImage(FraInizio,0,0,canvas.width,canvas.height);
    ctxLeft.drawImage(Robot2Braccio,-80,-10,300,150);
    ctxLeft.font = " 25px 'Jersey 10'";
    ctxLeft.fillStyle = "rgb(128, 253, 255)"
    ctxLeft.fillText("toccando la tazza Frank",220,50);
    ctxLeft.fillText("si scotterà, potresti",220,70);
    ctxLeft.fillText("usarlo a tuo vantaggio!",220,90);
}
    if(stageGame2 == 2){
    ctx.fillStyle= "#243010"
    ctxLeft.fillStyle= "#243010"
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
    ctxLeft.drawImage(Robotframe3,15,canvasLeft.height -100,150,100);
    ctxLeft.fillStyle = "white";
    ctxLeft.font = " 35px 'Jersey 10'";
    ctxLeft.fillText("Si è scottato con il",180,200);
    ctxLeft.fillText("suo cappucciono...",180,230);
    ctx.drawImage(FrankT,0,-40,canvas.width,canvas.height + 200);
    ctxLeft.drawImage(Robot2Braccio,-80,-10,300,150);
    ctxLeft.font = " 25px 'Jersey 10'";
    ctxLeft.fillStyle = "rgb(128, 253, 255)"
    ctxLeft.fillText("Che idiota",220,50);

}
}
function lvl2drawBall(){

    ctx.save();            
    ctx.shadowBlur = 0;     
    ctx.shadowColor = 'none';
    ctx.strokeStyle = 'none'; 
    ctx.lineWidth = 0;
    ctx.beginPath();
    ctx.fillStyle = 'white'
    ctx.arc(ballX,ballY, radius,0,Math.PI * 2)
    ctx.fill();
    ctx.restore();
   
}
function lvl2crearerectrow4(){
    for(let i = 1; i < 7; i++){
    let x = lvl2rettangoli4[i-1].x + Rsize + margin;
    let y = 325;
    lvl2rettangoli4.push({x,y,Rsize,Rheight,vita:1, color:"red"})
    }
}
function lvl2crearerectrow3(){
    for(let i = 1; i < 3; i++){
    let x = lvl2rettangoli3[i-1].x + Rsize*2 + margin*2-1;
    let y = 300;
    lvl2rettangoli3.push({x,y,Rsize,Rheight,vita:2, color:"white"})
    }
}
function lvl2crearerectrow3emezzo(){
    for(let i = 1; i < 4; i++){
    let x = lvl2rettangoli3emezzo[i-1].x + Rsize*2 + margin*2-1;
    let y = 275;
    lvl2rettangoli3emezzo.push({x,y,Rsize,Rheight,vita:2, color:"white"})
    }
}
function lvl2crearerectrow2(){
    for(let i = 1; i < 3; i++){
    let x = lvl2rettangoli2[i-1].x + Rsize*2 + margin*2;
    let y = lvl2rettangoli2[i-1].y;
    lvl2rettangoli2.push({x,y,Rsize,Rheight,vita:3, color:"white"})
    }
}
function lvl2crearerectrow2emezzo(){
    for(let i = 1; i < 4; i++){
    let x = lvl2rettangoli2emezzo[i-1].x + Rsize*2 + margin*2-1;
    let y = lvl2rettangoli2emezzo[i-1].y;
    lvl2rettangoli2emezzo.push({x,y,Rsize,Rheight,vita:3, color:"white"})
    }
}
function lvl2crearerectrow1(){
    for(let i = 1; i < 3; i++){
    let x = lvl2rettangoli1[i-1].x + Rsize*2 + margin*2;
    let y = lvl2rettangoli1[i-1].y;
    lvl2rettangoli1.push({x,y,Rsize,Rheight,vita:3, color:"white"})
    }
}
function lvl2crearerectrow1emezzo(){
    for(let i = 1; i < 4; i++){
    let x = lvl2rettangoli1emezzo[i-1].x + Rsize*2 + margin*2;
    let y = lvl2rettangoli1emezzo[i-1].y;
    lvl2rettangoli1emezzo.push({x,y,Rsize,Rheight,vita:3, color:"white"})
    }
}
function lvl2crearerectrow(){
    for(let i = 1; i < 7; i++){
    let x = lvl2rettangoli[i-1].x + Rsize + margin;
    let y = lvl2rettangoli[i-1].y;
    lvl2rettangoli.push({x,y,Rsize,Rheight,vita:4, color:"white"})
    }
}
function lvl2disegnaRect(){
    
    // neon 
    ctx.strokeStyle = 'black';
    ctx.shadowColor = "black";
    ctx.lineWidth = "3"
    ctx.shadowBlur = 12
    //riga 4
    for(let i = lvl2rettangoli4.length - 1; i >= 0; i--){
        
    hitX = false;
    hitY = false;
    if(lvl2rettangoli4[i].vita == 0){
        lvl2rettangoli4.splice(i,1);
        continue;
    }
    if(lvl2rettangoli4[i].vita == 1){
        lvl2rettangoli4[i].color = 'red'
    }

    ctx.fillStyle = lvl2rettangoli4[i].color
    ctx.fillRect(lvl2rettangoli4[i].x,lvl2rettangoli4[i].y,lvl2rettangoli4[i].Rsize,lvl2rettangoli4[i].Rheight);


    //parte sinistra
    if(ballY < lvl2rettangoli4[i].y + Rheight && ballY > lvl2rettangoli4[i].y && ballX + radius > lvl2rettangoli4[i].x && ballX < lvl2rettangoli4[i].x )
        {hitX = true; lvl2rettangoli4[i].vita -= 1;
    }
    // parte alta
    else if(ballX > lvl2rettangoli4[i].x && lvl2rettangoli4[i].x + Rsize > ballX && ballY + radius > lvl2rettangoli4[i].y &&  ballY + radius < lvl2rettangoli4[i].y + Rheight){
       hitY = true;lvl2rettangoli4[i].vita -= 1;
    }
    // parte bassa
    else if(ballX > lvl2rettangoli4[i].x && lvl2rettangoli4[i].x + Rsize > ballX && ballY - radius < lvl2rettangoli4[i].y + Rheight && ballY - radius > lvl2rettangoli4[i].y){
       hitY = true;lvl2rettangoli4[i].vita -= 1;
    } 
    // parte destra 
    else if(ballY < lvl2rettangoli4[i].y + Rheight && ballY > lvl2rettangoli4[i].y && ballX - radius < lvl2rettangoli4[i].x + Rsize && ballX - radius > lvl2rettangoli4[i].x ){
        hitX = true;lvl2rettangoli4[i].vita -= 1;
    }

    if (hitX && hitY) {

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
for(let i = lvl2rettangoli3.length - 1; i >= 0; i--){
    hitX = false;
    hitY = false;
    if(lvl2rettangoli3[i].vita == 0){
        lvl2rettangoli3.splice(i,1);
        continue;
    }
    if(lvl2rettangoli3[i].vita == 1){
        lvl2rettangoli3[i].color = 'red'
    }
    if(lvl2rettangoli3[i].vita == 2){
        lvl2rettangoli3[i].color = '#ff7402ff'
    }
    ctx.fillStyle = lvl2rettangoli3[i].color
    ctx.fillRect(lvl2rettangoli3[i].x,lvl2rettangoli3[i].y,lvl2rettangoli3[i].Rsize,lvl2rettangoli3[i].Rheight);
    
    //parte sinistra
    if(ballY < lvl2rettangoli3[i].y + Rheight && ballY > lvl2rettangoli3[i].y && ballX + radius > lvl2rettangoli3[i].x && ballX < lvl2rettangoli3[i].x )
        {hitX = true; lvl2rettangoli3[i].vita -= 1;
    }
    // parte alta
    else if(ballX > lvl2rettangoli3[i].x && lvl2rettangoli3[i].x + Rsize > ballX && ballY + radius > lvl2rettangoli3[i].y &&  ballY + radius < lvl2rettangoli3[i].y + Rheight){
       hitY = true;lvl2rettangoli3[i].vita -= 1;
    }
    // parte bassa
    else if(ballX > lvl2rettangoli3[i].x && lvl2rettangoli3[i].x + Rsize > ballX && ballY - radius < lvl2rettangoli3[i].y + Rheight && ballY - radius > lvl2rettangoli3[i].y){
       hitY = true;lvl2rettangoli3[i].vita -= 1;
    } 
    // parte destra 
    else if(ballY < lvl2rettangoli3[i].y + Rheight && ballY > lvl2rettangoli3[i].y && ballX - radius < lvl2rettangoli3[i].x + Rsize && ballX - radius > lvl2rettangoli3[i].x ){
        hitX = true;lvl2rettangoli3[i].vita -= 1;
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
for(let i = lvl2rettangoli3emezzo.length - 1; i >= 0; i--){
    hitX = false;
    hitY = false;
    if(lvl2rettangoli3emezzo[i].vita == 0){
        lvl2rettangoli3emezzo.splice(i,1);
        continue;
    }
    if(lvl2rettangoli3emezzo[i].vita == 1){
        lvl2rettangoli3emezzo[i].color = 'red'
    }
    if(lvl2rettangoli3emezzo[i].vita == 2){
        lvl2rettangoli3emezzo[i].color = '#ff7402ff'
    }
    ctx.fillStyle = lvl2rettangoli3emezzo[i].color
    ctx.fillRect(lvl2rettangoli3emezzo[i].x,lvl2rettangoli3emezzo[i].y,lvl2rettangoli3emezzo[i].Rsize,lvl2rettangoli3emezzo[i].Rheight);
    
    //parte sinistra
    if(ballY < lvl2rettangoli3emezzo[i].y + Rheight && ballY > lvl2rettangoli3emezzo[i].y && ballX + radius > lvl2rettangoli3emezzo[i].x && ballX < lvl2rettangoli3emezzo[i].x )
        {hitX = true; lvl2rettangoli3emezzo[i].vita -= 1;
    }
    // parte alta
    else if(ballX > lvl2rettangoli3emezzo[i].x && lvl2rettangoli3emezzo[i].x + Rsize > ballX && ballY + radius > lvl2rettangoli3emezzo[i].y &&  ballY + radius < lvl2rettangoli3emezzo[i].y + Rheight){
       hitY = true;lvl2rettangoli3emezzo[i].vita -= 1;
    }
    // parte bassa
    else if(ballX > lvl2rettangoli3emezzo[i].x && lvl2rettangoli3emezzo[i].x + Rsize > ballX && ballY - radius < lvl2rettangoli3emezzo[i].y + Rheight && ballY - radius > lvl2rettangoli3emezzo[i].y){
       hitY = true;lvl2rettangoli3emezzo[i].vita -= 1;
    } 
    // parte destra 
    else if(ballY < lvl2rettangoli3emezzo[i].y + Rheight && ballY > lvl2rettangoli3emezzo[i].y && ballX - radius < lvl2rettangoli3emezzo[i].x + Rsize && ballX - radius > lvl2rettangoli3emezzo[i].x ){
        hitX = true;lvl2rettangoli3emezzo[i].vita -= 1;
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
for(let i = lvl2rettangoli2.length - 1; i >= 0; i--){
    hitX = false;
    hitY = false;
    if(lvl2rettangoli2[i].vita == 0){
        lvl2rettangoli2.splice(i,1);
        continue;
    }
    if(lvl2rettangoli2[i].vita == 1){
        lvl2rettangoli2[i].color = 'red'
    }
    if(lvl2rettangoli2[i].vita == 2){
        lvl2rettangoli2[i].color = '#ff7402ff'
    }
    if(lvl2rettangoli2[i].vita == 3){
        lvl2rettangoli2[i].color = '#83f52c'
    }
    ctx.fillStyle = lvl2rettangoli2[i].color
    ctx.fillRect(lvl2rettangoli2[i].x,lvl2rettangoli2[i].y,lvl2rettangoli2[i].Rsize,lvl2rettangoli2[i].Rheight);
    
    //parte sinistra
    if(ballY < lvl2rettangoli2[i].y + Rheight && ballY > lvl2rettangoli2[i].y && ballX + radius > lvl2rettangoli2[i].x && ballX < lvl2rettangoli2[i].x )
        {hitX = true; lvl2rettangoli2[i].vita -= 1;
    }
    // parte alta
    else if(ballX > lvl2rettangoli2[i].x && lvl2rettangoli2[i].x + Rsize > ballX && ballY + radius > lvl2rettangoli2[i].y &&  ballY + radius < lvl2rettangoli2[i].y + Rheight){
       hitY = true;lvl2rettangoli2[i].vita -= 1;
    }
    // parte bassa
    else if(ballX > lvl2rettangoli2[i].x && lvl2rettangoli2[i].x + Rsize > ballX && ballY - radius < lvl2rettangoli2[i].y + Rheight && ballY - radius > lvl2rettangoli2[i].y){
       hitY = true;lvl2rettangoli2[i].vita -= 1;
    } 
    // parte destra 
    else if(ballY < lvl2rettangoli2[i].y + Rheight && ballY > lvl2rettangoli2[i].y && ballX - radius < lvl2rettangoli2[i].x + Rsize && ballX - radius > lvl2rettangoli2[i].x ){
        hitX = true;lvl2rettangoli2[i].vita -= 1;
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
// riga 2 e mezzo
for(let i = lvl2rettangoli2emezzo.length - 1; i >= 0; i--){
    hitX = false;
    hitY = false;
    if(lvl2rettangoli2emezzo[i].vita == 0){
        lvl2rettangoli2emezzo.splice(i,1);
        continue;
    }
    if(lvl2rettangoli2emezzo[i].vita == 1){
        lvl2rettangoli2emezzo[i].color = 'red'
    }
    if(lvl2rettangoli2emezzo[i].vita == 2){
        lvl2rettangoli2emezzo[i].color = '#ff7402ff'
    }
    if(lvl2rettangoli2emezzo[i].vita == 3){
        lvl2rettangoli2emezzo[i].color = '#83f52c'
    }
    ctx.fillStyle = lvl2rettangoli2emezzo[i].color
    ctx.fillRect(lvl2rettangoli2emezzo[i].x,lvl2rettangoli2emezzo[i].y,lvl2rettangoli2emezzo[i].Rsize,lvl2rettangoli2emezzo[i].Rheight);
    
    //parte sinistra
    if(ballY < lvl2rettangoli2emezzo[i].y + Rheight && ballY > lvl2rettangoli2emezzo[i].y && ballX + radius > lvl2rettangoli2emezzo[i].x && ballX < lvl2rettangoli2emezzo[i].x )
        {hitX = true; lvl2rettangoli2emezzo[i].vita -= 1;
    }
    // parte alta
    else if(ballX > lvl2rettangoli2emezzo[i].x && lvl2rettangoli2emezzo[i].x + Rsize > ballX && ballY + radius > lvl2rettangoli2emezzo[i].y &&  ballY + radius < lvl2rettangoli2emezzo[i].y + Rheight){
       hitY = true;lvl2rettangoli2emezzo[i].vita -= 1;
    }
    // parte bassa
    else if(ballX > lvl2rettangoli2emezzo[i].x && lvl2rettangoli2emezzo[i].x + Rsize > ballX && ballY - radius < lvl2rettangoli2emezzo[i].y + Rheight && ballY - radius > lvl2rettangoli2emezzo[i].y){
       hitY = true;lvl2rettangoli2emezzo[i].vita -= 1;
    } 
    // parte destra 
    else if(ballY < lvl2rettangoli2emezzo[i].y + Rheight && ballY > lvl2rettangoli2emezzo[i].y && ballX - radius < lvl2rettangoli2emezzo[i].x + Rsize && ballX - radius > lvl2rettangoli2emezzo[i].x ){
        hitX = true;lvl2rettangoli2emezzo[i].vita -= 1;
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
for(let i = lvl2rettangoli1.length - 1; i >= 0; i--){
    hitX = false;
    hitY = false;
    if(lvl2rettangoli1[i].vita == 0){
        lvl2rettangoli1.splice(i,1);
        continue;
    }
    if(lvl2rettangoli1[i].vita == 1){
        lvl2rettangoli1[i].color = 'red'
    }
    if(lvl2rettangoli1[i].vita == 2){
        lvl2rettangoli1[i].color = '#ff7402ff'
    }
    if(lvl2rettangoli1[i].vita == 3){
        lvl2rettangoli1[i].color = '#2cb2f5ff'
    }
    ctx.fillStyle = lvl2rettangoli1[i].color
    ctx.fillRect(lvl2rettangoli1[i].x,lvl2rettangoli1[i].y,lvl2rettangoli1[i].Rsize,lvl2rettangoli1[i].Rheight);
    
    //parte sinistra
    if(ballY < lvl2rettangoli1[i].y + Rheight && ballY > lvl2rettangoli1[i].y && ballX + radius > lvl2rettangoli1[i].x && ballX < lvl2rettangoli1[i].x )
        {hitX = true; lvl2rettangoli1[i].vita -= 1;
    }
    // parte alta
    else if(ballX > lvl2rettangoli1[i].x && lvl2rettangoli1[i].x + Rsize > ballX && ballY + radius > lvl2rettangoli1[i].y &&  ballY + radius < lvl2rettangoli1[i].y + Rheight){
       hitY = true;lvl2rettangoli1[i].vita -= 1;
    }
    // parte bassa
    else if(ballX > lvl2rettangoli1[i].x && lvl2rettangoli1[i].x + Rsize > ballX && ballY - radius < lvl2rettangoli1[i].y + Rheight && ballY - radius > lvl2rettangoli1[i].y){
       hitY = true;lvl2rettangoli1[i].vita -= 1;
    } 
    // parte destra 
    else if(ballY < lvl2rettangoli1[i].y + Rheight && ballY > lvl2rettangoli1[i].y && ballX - radius < lvl2rettangoli1[i].x + Rsize && ballX - radius > lvl2rettangoli1[i].x ){
        hitX = true;lvl2rettangoli1[i].vita -= 1;
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
// riga 1 e mezzo
for(let i = lvl2rettangoli1emezzo.length - 1; i >= 0; i--){
    hitX = false;
    hitY = false;
    if(lvl2rettangoli1emezzo[i].vita == 0){
        lvl2rettangoli1emezzo.splice(i,1);
        continue;
    }
    if(lvl2rettangoli1emezzo[i].vita == 1){
        lvl2rettangoli1emezzo[i].color = 'red'
    }
    if(lvl2rettangoli1emezzo[i].vita == 2){
        lvl2rettangoli1emezzo[i].color = '#ff7402ff'
    }
    if(lvl2rettangoli1emezzo[i].vita == 3){
        lvl2rettangoli1emezzo[i].color = '#2cb2f5ff'
    }
    ctx.fillStyle = lvl2rettangoli1emezzo[i].color
    ctx.fillRect(lvl2rettangoli1emezzo[i].x,lvl2rettangoli1emezzo[i].y,lvl2rettangoli1emezzo[i].Rsize,lvl2rettangoli1emezzo[i].Rheight);
    
    //parte sinistra
    if(ballY < lvl2rettangoli1emezzo[i].y + Rheight && ballY > lvl2rettangoli1emezzo[i].y && ballX + radius > lvl2rettangoli1emezzo[i].x && ballX < lvl2rettangoli1emezzo[i].x )
        {hitX = true; lvl2rettangoli1emezzo[i].vita -= 1;
    }
    // parte alta
    else if(ballX > lvl2rettangoli1emezzo[i].x && lvl2rettangoli1emezzo[i].x + Rsize > ballX && ballY + radius > lvl2rettangoli1emezzo[i].y &&  ballY + radius < lvl2rettangoli1emezzo[i].y + Rheight){
       hitY = true;lvl2rettangoli1emezzo[i].vita -= 1;
    }
    // parte bassa
    else if(ballX > lvl2rettangoli1emezzo[i].x && lvl2rettangoli1emezzo[i].x + Rsize > ballX && ballY - radius < lvl2rettangoli1emezzo[i].y + Rheight && ballY - radius > lvl2rettangoli1emezzo[i].y){
       hitY = true;lvl2rettangoli1emezzo[i].vita -= 1;
    } 
    // parte destra 
    else if(ballY < lvl2rettangoli1emezzo[i].y + Rheight && ballY > lvl2rettangoli1emezzo[i].y && ballX - radius < lvl2rettangoli1emezzo[i].x + Rsize && ballX - radius > lvl2rettangoli1emezzo[i].x ){
        hitX = true;lvl2rettangoli1emezzo[i].vita -= 1;
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
// riga 0
for(let i = lvl2rettangoli.length - 1; i >= 0; i--){
    hitX = false;
    hitY = false;
    if(lvl2rettangoli[i].vita == 0){
        lvl2rettangoli.splice(i,1);
        continue;
    }
    if(lvl2rettangoli[i].vita == 1){
        lvl2rettangoli[i].color = 'red'
    }
    if(lvl2rettangoli[i].vita == 2){
        lvl2rettangoli[i].color = '#ff7402ff'
    }
    if(lvl2rettangoli[i].vita == 3){
        lvl2rettangoli[i].color = '#2cb2f5ff'
    }
    if(lvl2rettangoli[i].vita == 4){
        lvl2rettangoli[i].color = '#9400f7ff'
    }
    ctx.fillStyle = lvl2rettangoli[i].color
    ctx.fillRect(lvl2rettangoli[i].x,lvl2rettangoli[i].y,lvl2rettangoli[i].Rsize,lvl2rettangoli[i].Rheight);
    
    //parte sinistra
    if(ballY < lvl2rettangoli[i].y + Rheight && ballY > lvl2rettangoli[i].y && ballX + radius > lvl2rettangoli[i].x && ballX < lvl2rettangoli[i].x )
        {hitX = true; lvl2rettangoli[i].vita -= 1;
    }
    // parte alta
    else if(ballX > lvl2rettangoli[i].x && lvl2rettangoli[i].x + Rsize > ballX && ballY + radius > lvl2rettangoli[i].y &&  ballY + radius < lvl2rettangoli[i].y + Rheight){
       hitY = true;lvl2rettangoli[i].vita -= 1;
    }
    // parte bassa
    else if(ballX > lvl2rettangoli[i].x && lvl2rettangoli[i].x + Rsize > ballX && ballY - radius < lvl2rettangoli[i].y + Rheight && ballY - radius > lvl2rettangoli[i].y){
       hitY = true;lvl2rettangoli[i].vita -= 1;
    } 
    // parte destra 
    else if(ballY < lvl2rettangoli[i].y + Rheight && ballY > lvl2rettangoli[i].y && ballX - radius < lvl2rettangoli[i].x + Rsize && ballX - radius > lvl2rettangoli[i].x ){
        hitX = true;lvl2rettangoli[i].vita -= 1;
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
}
function lvl2drawpower(){
    if(!lvl2power)ctx.drawImage(tazzaCalda,lvl2powerx,lvl2powery,60,50);
    if(ballX + radius > lvl2powerx && ballX - radius < lvl2powerx + 60
       && ballY - radius < lvl2powery + 60 && ballY + radius > lvl2powery)
       {
        powerPresoCL = true;
        powerPreso = true;
        lvl2power = true;
        balldirectionX *= 1.5;
        balldirectionY *= 1.5;
        stageGame2 = 2;

       }

}
function lvl2drawBomb(){
    if(!lvl2bomb)ctx.drawImage(Bomb,lvl2bombx,lvl2bomby,60,50);
    if(ballX + radius > lvl2bombx && ballX - radius < lvl2bombx + 60
       && ballY - radius < lvl2bomby + 60 && ballY + radius > lvl2bomby)
       {
        bombPreso = true;
        lvl2bomb = true;
        lifes -= 1
       }

}
function esplosioneBomb(){
   if(bombPreso){
    if(esplosioneTime < 500){
    if(lifes == 0){
            ctx.drawImage(esplosione,15,10,40,40);
    }
    if(lifes == 1){
            ctx.drawImage(esplosione,50,10,40,40);
    }
    if(lifes == 2){
            ctx.drawImage(esplosione,85,10,40,40);
    }
    esplosioneTime ++;
    }}
}

//...........................................................................................
// variabili livello 3
//                               FUNZIONI LVL3

function livello3(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctxLeft.clearRect(0,0,canvasLeft.width,canvasLeft.height);
        canvas.style.border = "none";
        canvas.style.boxShadow = "none";
        ctx.fillStyle = "#243010";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctxLeft.fillStyle = "#243010";
        ctxLeft.fillRect(0,0,canvasLeft.width,canvasLeft.height);
        ctx.fillStyle = "white"
        ctx.font = " 40px 'Jersey 10'";
        ctx.fillText("Livello 3 in sviluppo....",20,100);
        ctx.fillText("Si puo' dire che hai battutto il gioco!",20,150);
        ctx.fillText("per ora......Ma attento!",20,200);
        ctx.fillText("il boss finale",20,260);
        ctx.font = " 60px 'Jersey 10'";
        ctx.fillStyle = "red"
        ctx.fillText("Rickyciutausan",250,260);
        ctx.fillStyle = "white"
        ctx.font = " 40px 'Jersey 10'";
        ctx.fillText("è quasi pronto all'azione",20,310);
        ctx.drawImage(RickyWIP,-1250,-120,3000,1500)
    requestAnimationFrame(livello3);
}