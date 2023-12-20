const canvas=document.getElementById('canvas');
const pen=canvas.getContext('2d');

const cellSize=67;
const w=1200;
const h=735;
let food=null;
let gameOver=false;
let score=0;
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
        pen.fillStyle='#F0A202';
        for(let cell of this.cells){
            pen.fillRect(cellSize*cell.x,cellSize*cell.y,cellSize-1,cellSize-1);
        }
    },

    updateSnake: function(){
        
        const headX=this.cells[this.cells.length-1].x;
        const headY=this.cells[this.cells.length-1].y;
        let nextX;
        let nextY;
        //collison
        if(headX===food.x && headY===food.y){
            food=getFood();
            score++;
        }
        else this.cells.shift();

        if(this.direction=='left'){
            nextX=headX-1;
            nextY=headY;
            if(cellSize*nextX<0){
                pen.fillStyle='#FFFFFF';
                pen.fillText('Game Over',100,100);
                clearInterval(id);
                gameOver=true;
            }
        }    
        else if(this.direction=='up'){
            nextX=headX;
            nextY=headY-1;
            if(cellSize*nextY<0){
                pen.fillStyle='#FFFFFF';
                pen.fillText('Game Over',100,100);
                clearInterval(id);
                gameOver=true;
            }
        }
        else if(this.direction=='down'){
            nextX=headX;
            nextY=headY+1;
            if(cellSize*nextY>=h){
                pen.fillStyle='#FFFFFF';
                pen.fillText('Game Over',100,100);
                clearInterval(id);
                gameOver=true;
            }
        }
        else{
            nextX=headX+1;
            nextY=headY;
            if(cellSize*nextX>=w){
                pen.fillStyle='#FFFFFF';
                pen.fillText('Game Over',100,100);
                clearInterval(id);
                gameOver=true;
            }
        }
        this.cells.push({
            x:nextX,
            y:nextY
        });
        
    }
}


function init(){

    snake.createSnake();
    food=getFood();

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
    if(gameOver===true){
        clearInterval(id);
    }
    snake.updateSnake();
}

function draw(){
    pen.clearRect(0,0,w,h);
    pen.font='45px sans-serif'
    pen.fillText(`Score: ${score}`,100,50);
    pen.fillStyle='#C51605'
    pen.fillRect(cellSize*food.x,cellSize*food.y,cellSize,cellSize);
    snake.drawSnake();
}

function gameLoop(){
    draw();
    update();
}

function getFood(){
    const foodX=Math.round((Math.random()*(w-cellSize))/cellSize); 
    const foodY=Math.round((Math.random()*(h-cellSize))/cellSize);

    food={
        x:foodX,
        y:foodY
    };

    return food;
}

init();
const id = setInterval(gameLoop,150);
