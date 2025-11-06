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
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let radius = 10;
let balldirectionX = (Math.round(Math.random())* 2 - 1)*5;
let balldirectionY = 5;

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

//loop

function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    gameOver();
    movement();
    bordiBar();
    Ballmovement();
    collisioneBar();
    collsionwall();
    drawBall();
    drawBar();
    console.log(ballX)
console.log(ballY)
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
       balldirectionY = -balldirectionY;
       
        
    }
}

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

}
function gameOver(){
    if(ballY + radius > canvas.height){
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
    }
}