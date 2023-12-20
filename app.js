const canvas=document.getElementById('canvas');
const pen=canvas.getContext('2d');
pen.fillStyle='yellow';

let init_x=50,init_y=50;

//top left is (0,0) 
//(x,y,width,height)
// pen.fillRect(100,100,190,90);

function init(){
    pen.fillRect(init_x,init_y,50,50);
}

function update(){
    init_x+=50;
}

function draw(){
    pen.clearRect(0,0,1200,735);
    pen.fillRect(init_x,init_y,50,50);
}

function gameLoop(){
    console.log('game loop');
    update();
    draw();
}

init();
const id = setInterval(gameLoop,200);
