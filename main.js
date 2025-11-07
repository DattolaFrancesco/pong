const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// variabili barra giocatore
let barSize = 250;
let barH = 25;
let barX = canvas.width / 2 - 125;
let barY = canvas.height - barH - 20;


// variabili pallina
let ballX =canvas.width/2;
let ballY =canvas.height/2;
let radius = 10;
let balldirectionX = (Math.round(Math.random())* 2 - 1)*2;
let balldirectionY = 2;
let hitX = false;
let hitY = false;

// array rettangoli da spaccare
let Rsize = 110;
let Rheight = 20
let margin = 2;
let rettangoli = [{x:50,y:120,Rsize:Rsize,Rheight:Rheight}];
let rettangoli2 = [{x:50,y:155,Rsize:Rsize,Rheight:Rheight}];
let rettangoli3 = [{x:50,y:190,Rsize:Rsize,Rheight:Rheight}];
let rettangoli4 = [{x:50,y:225,Rsize:Rsize,Rheight:Rheight}];

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
crearerectrow1();
crearerectrow2();
crearerectrow3();
crearerectrow4();

//loop

function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    gameOver();
    disegnarect();
    movement();
    bordiBar();
    Ballmovement();
    collisioneBar();
    collsionwall();
    drawBall();
    drawBar();
    requestAnimationFrame(loop);
}loop();


function movement(){
    if(keys.d){barX += velocita;} 
    if(keys.a){barX -= velocita;}
}
function Ballmovement(){
    ballX += balldirectionX;
    ballY += balldirectionY;
    

}
function drawBall(){
    ctx.beginPath();
    ctx.arc(ballX,ballY, radius,0,Math.PI * 2)
    ctx.fill();
}
function drawBar(){
    ctx.fillStyle = "white";
    ctx.fillRect(barX,barY,barSize,barH);
}
function bordiBar(){
    let margin = 10;
    barX = Math.max(margin, Math.min(canvas.width-barSize-margin,barX));
}
function collisioneBar(){
    if(ballY + radius >= barY && ballX + radius > barX && barX + barSize > ballX + radius){
       
        let centerdistance = ballX - (barX + barSize/2);
        let normalized = centerdistance/(barSize/2);

        balldirectionX = normalized * 6;
        balldirectionY = -Math.abs(balldirectionY)
    }}

function collsionwall(){
    if(ballX + radius >= canvas.width){
        balldirectionX = -balldirectionX;
    }
    if(ballX - radius < radius){
        balldirectionX = -balldirectionX;
    }
    if(ballY - radius < 0){
        balldirectionY = -balldirectionY;
    }}
function gameOver(){
    if(ballY + radius > canvas.height){
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
    }}
function crearerectrow1(){
    for(let i = 1; i < 8; i++){
    let x = rettangoli[i-1].x + Rsize + margin;
    let y = 120;
    rettangoli.push({x,y,Rsize,Rheight})
    }
}
function crearerectrow2(){
    for(let i = 1; i < 8; i++){
    let x = rettangoli2[i-1].x + Rsize + margin;
    let y = 155;
    rettangoli2.push({x,y,Rsize,Rheight})
    }
}
function crearerectrow3(){
    for(let i = 1; i < 8; i++){
    let x = rettangoli3[i-1].x + Rsize + margin;
    let y = 190;
    rettangoli3.push({x,y,Rsize,Rheight})
    }
}
function crearerectrow4(){
    for(let i = 1; i < 8; i++){
    let x = rettangoli4[i-1].x + Rsize + margin;
    let y = 225;
    rettangoli4.push({x,y,Rsize,Rheight})
    }
}
function disegnarect(){
    for(let i = 0; i < rettangoli.length; i++){
        
        hitX = false;
        hitY = false;
        ctx.fillStyle = "white";
    //ctx.fillRect(rettangoli[i].x,rettangoli[i].y,rettangoli[i].Rsize,rettangoli[i].Rheight);
    //ctx.fillRect(rettangoli2[i].x,rettangoli2[i].y,rettangoli2[i].Rsize,rettangoli2[i].Rheight);
    //ctx.fillRect(rettangoli3[i].x,rettangoli3[i].y,rettangoli3[i].Rsize,rettangoli3[i].Rheight);
    ctx.fillRect(rettangoli4[i].x,rettangoli4[i].y,rettangoli4[i].Rsize,rettangoli4[i].Rheight);
        
    //parte sinistra
    if(ballY < rettangoli4[i].y + Rheight && ballY > rettangoli4[i].y && ballX + radius > rettangoli4[i].x && ballX < rettangoli4[i].x )
        {hitX = true;console.log("ciao")
    }
    // parte alta
    else if(ballX > rettangoli4[i].x && rettangoli4[i].x + Rsize > ballX && ballY + radius > rettangoli4[i].y &&  ballY + radius < rettangoli4[i].y + Rheight){
       hitY = true;console.log("jj")
    }
    // parte bassa
    else if(ballX > rettangoli4[i].x && rettangoli4[i].x + Rsize > ballX && ballY - radius < rettangoli4[i].y + Rheight && ballY - radius > rettangoli4[i].y){
       hitY = true;console.log('hh')
    } 
    // parte destra 
    else if(ballY < rettangoli4[i].y + Rheight && ballY > rettangoli4[i].y && ballX - radius < rettangoli4[i].x + Rsize && ballX - radius > rettangoli4[i].x ){
        hitX = true;console.log('xx')
    }
    

    if (hitX && hitY) {
  
        balldirectionX = -balldirectionX;
        balldirectionY = -balldirectionY;
        ballX += balldirectionX * 0.3
        ballY += balldirectionY  * 0.3;
    }
    else if (hitX) {
        balldirectionX = -balldirectionX;
        ballX += balldirectionX * 0.3
    }
    else if (hitY) {
        balldirectionY = -balldirectionY;}
        ballY += balldirectionY * 0.3

    }
}


