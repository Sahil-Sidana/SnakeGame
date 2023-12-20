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
        let nextX=headX+1;
        let nextY=headY;

        if(this.direction=='left') nextX=headX-1;
        else if(this.direction=='up'){
            nextX=headX;
            nextY=headY-1;
        }
        else if(this.direction=='down'){
            nextX=headX;
            nextY=headY+1;
        }
        this.cells.push({
            x:nextX,
            y:nextY
        });
        this.cells.shift();
        
    }
}


function init(){
    
    snake.createSnake();

    function keypressed(e){
        const arrow=e.key;

        if(arrow==='ArrowDown') snake.direction='down';
        else if(arrow==='ArrowUp') snake.direction='up';
        else if(arrow==='ArrowLeft') snake.direction='left';
        else if(arrow==='ArrowRight') snake.direction='right';
    }

    document.addEventListener('keydown',keypressed);
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
