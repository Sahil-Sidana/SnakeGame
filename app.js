const canvas=document.getElementById('canvas');
const pen=canvas.getContext('2d');
pen.fillStyle='#F0A202';


const cellSize=67;
const w=1200;
const h=735;
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
    },

    updateSnake: function(){

        const headX=this.cells[this.cells.length-1].x;
        const headY=this.cells[this.cells.length-1].y;
        const nextX=headX+1;
        const nextY=headY;

        this.cells.shift();
        this.cells.push({
            x:nextX,
            y:nextY
        });
        
    }
}


function init(){
    snake.createSnake();
}

function update(){
    snake.updateSnake();
}

function draw(){
    pen.clearRect(0,0,w,h);
    snake.drawSnake();
}

function gameLoop(){
    console.log('game loop');
    update();
    draw();
}

init();
const id = setInterval(gameLoop,200);
