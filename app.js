const canvas=document.getElementById('canvas');
const pen=canvas.getContext('2d');
pen.fillStyle='white';


const cellSize=67;
//top left is (0,0) 
//(x,y,width,height)
// pen.fillRect(100,100,190,90);

const snake={
    init_len:5,
    direction:'right',
    cells:[],

    createSnake: function(){
        for(let i=0;i<this.init_len;i++){
            this.cells.push({
                x:i,
                y:0
            })
        }
    },

    drawSnake: function(){

        for(let cell of this.cells){
            pen.fillRect(cellSize*cell.x,cellSize*cell.y,cellSize-1,cellSize-1);
        }
    }
}


function init(){
    snake.createSnake();
}

function update(){
    // init_x+=50;
}

function draw(){
    snake.drawSnake();
}

function gameLoop(){
    console.log('game loop');
    update();
    draw();
}

init();
const id = setInterval(gameLoop,200);
