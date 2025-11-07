const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const sfondoV = new Image();
sfondoV.src = "fuochi.png";
// caricamento font e poi loop
sfondoV.onload = () => {
    document.fonts.ready.then(()=>{
    ctx.font = "60px 'Sixtyfour Convergence'";
    ctx.font = "60px 'Sixtyfour'";
    loop()
})   
}




// variabili barra giocatore
let barSize = 250;
let barH = 25;
let barX = canvas.width / 2 - 125;
let barY = canvas.height - barH - 40;


// variabili pallina
let ballX =canvas.width/2;
let ballY =canvas.height/2 - 200;
let radius = 10;
let balldirectionX = (Math.round(Math.random())* 2 - 1)*8;
let balldirectionY = 8;
let hitX = false;
let hitY = false;

// array rettangoli da spaccare
let Rsize = 110;
let Rheight = 20
let margin = 2;
let rettangoli = [{x:50,y:120,Rsize:Rsize,Rheight:Rheight, vita:2,color:'white'}];
let rettangoli2 = [{x:50,y:155,Rsize:Rsize,Rheight:Rheight, vita:2,color:'white'}];
let rettangoli3 = [{x:50,y:190,Rsize:Rsize,Rheight:Rheight, vita:2,color:'white'}];
let rettangoli4 = [{x:50,y:225,Rsize:Rsize,Rheight:Rheight, vita:2,color:'white'}];
let vite = 2;



// variabili movimento
let velocita = 10;
let keys = {
    a:false,
    d:false,
}
// variabile lifes e gameover o victory
let victory = false;
let GameOver = false;
let lifes = 3;

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
    if(GameOver){
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "red";
        ctx.font = "60px 'Sixtyfour Convergence'";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER!",canvas.width / 2,canvas.height/2,);
        return;
    }
    if(victory){
        ctx.drawImage(sfondoV,0,0,canvas.width,canvas.height);
        ctx.fillStyle = "rgb(255, 0, 179)";
        ctx.font =  "60px 'Sixtyfour'";
        ctx.textAlign = "center";
        ctx.fillText("VICTORY!",canvas.width / 2,canvas.height/2,);
        return;
    }
    
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
    requestAnimationFrame(loop);
}


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
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = "3"
    ctx.shadowColor = "orange";
    ctx.shadowBlur = 12
    ctx.strokeRect(barX,barY,barSize,barH)
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
function controlloLose(){
    if(ballY + radius > canvas.height){
        lifes -= 1;
        ballX =canvas.width/2;
        ballY =canvas.height/2 - 200;

    }}
function crearerectrow1(){
    for(let i = 1; i < 8; i++){
    let x = rettangoli[i-1].x + Rsize + margin;
    let y = 120;
    rettangoli.push({x,y,Rsize,Rheight,vita:2, color:"white"})
    }
}
function crearerectrow2(){
    for(let i = 1; i < 8; i++){
    let x = rettangoli2[i-1].x + Rsize + margin;
    let y = 155;
    rettangoli2.push({x,y,Rsize,Rheight,vita:2, color:"white"})
    }
}
function crearerectrow3(){
    for(let i = 1; i < 8; i++){
    let x = rettangoli3[i-1].x + Rsize + margin;
    let y = 190;
    rettangoli3.push({x,y,Rsize,Rheight,vita:2, color:"white"})
    }
}
function crearerectrow4(){
    for(let i = 1; i < 8; i++){
    let x = rettangoli4[i-1].x + Rsize + margin;
    let y = 225;
    rettangoli4.push({x,y,Rsize,Rheight,vita:2, color:"white"})
    }
}
function disegnarect(){
    //riga 4
    for(let i = rettangoli4.length - 1; i >= 0; i--){
        
    hitX = false;
    hitY = false;
    if(rettangoli4[i].vita == 0){
        rettangoli4.splice(i,1);
        continue;
    }
    if(rettangoli4[i].vita == 1){
        rettangoli4[i].color = 'red'
    }
    ctx.fillStyle = rettangoli4[i].color
    ctx.fillRect(rettangoli4[i].x,rettangoli4[i].y,rettangoli4[i].Rsize,rettangoli4[i].Rheight);
    
    //ctx.fillRect(rettangoli[i].x,rettangoli[i].y,rettangoli[i].Rsize,rettangoli[i].Rheight);
    //ctx.fillRect(rettangoli2[i].x,rettangoli2[i].y,rettangoli2[i].Rsize,rettangoli2[i].Rheight);
    //ctx.fillRect(rettangoli3[i].x,rettangoli3[i].y,rettangoli3[i].Rsize,rettangoli3[i].Rheight);

        
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
// riga 3
for(let i = rettangoli3.length - 1; i >= 0; i--){
    hitX = false;
    hitY = false;
    if(rettangoli3[i].vita == 0){
        rettangoli3.splice(i,1);
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
// riga 2
for(let i = rettangoli2.length - 1; i >= 0; i--){
    hitX = false;
    hitY = false;
    if(rettangoli2[i].vita == 0){
        rettangoli2.splice(i,1);
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
};
function hearts(){
    const heart = new Image();
    heart.src = "heart3.png.png";
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
    if(lifes == 0){
        GameOver = true;
    }
}
function vittoria(){
    if( rettangoli4.length === 0 &&  rettangoli3.length === 0 &&  rettangoli2.length === 0 &&  rettangoli.length === 0) 
        victory = true;
}




