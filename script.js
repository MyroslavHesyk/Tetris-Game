// 1. Додати нові фігури
// 2. Стилізувати нові фігури
// 3. Додати функцію рандому котра буде поветати випадкову фігуру
// 4. Центрувати фігуру незалежно від ширини

const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;
const TETROMINO_NAMES = ['O', 'J','L','T','I','S','Z'];
const TETROMINO_NAMBERS = [1,2,3,4,5,6,7];
const TETROMINOES = {
    'O': [
        [1,1],
        [1,1],
        
    ],
    'J': [
        [1,0,0],
        [1,1,1],
        [0,0,0]
    ],
    'L': [
        [0,0,0],
        [1,1,1],
        [1,0,0]
    ],
    'T': [
        [0,1,0],
        [1,1,1],
        [0,0,0]
    ],
    'I': [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ],
    'S': [
        [0,1,1],
        [1,1,0],
        [0,0,0]
    ],
    'Z': [
        [1,1,0],
        [0,1,1],
        [0,0,0]
    ],
}

function convertPositionToIndex(row, column){
    return row * PLAYFIELD_COLUMNS + column;
}

let playField;
let tetromino;

function generatePlayField(){
    for(let i=0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++){
        const div = document.createElement('div');
        document.querySelector('.grid').append(div);
    }

    playField =  new Array(PLAYFIELD_ROWS).fill()
                        .map(()=> new Array(PLAYFIELD_COLUMNS).fill(0))
    // console.table(playfield);
    
}
console.log(Math.random())

function generateTetramino(){
     // there is we retern figure from index
     
     const randomIndex = Math.floor(Math.random() * TETROMINO_NAMBERS.length);
    const name = TETROMINO_NAMES[randomIndex];
    const matrix = TETROMINOES[name];
    const col = Math.floor((playField[0].length-matrix[0].length)/2);
    //console.log(matrix)
     // console.log(matrix);
    tetromino = {
        name,
        matrix,
        row: 0,
        column: col
    }
}
generatePlayField()

generateTetramino()



const cells = document.querySelectorAll('.grid div');

function drawPlayField(){
    //cells[15].classList.add('O');
    for(let row=0; row < PLAYFIELD_ROWS ; row++){
        for (let column =0; column < PLAYFIELD_COLUMNS; column++) {
            if(playField[row][column]==0) continue;
            const name = playField[row][column];
            const cellIndex = convertPositionToIndex(
                row, column 
             )
             cells[cellIndex].classList.add(name)
    }
}
}

function drawTetramino(){
    const name = tetromino.name;
    const tetrominoMatrixSize = tetromino.matrix.length;

    for (let row =0; row < tetrominoMatrixSize; row++) {
        for (let column =0; column < tetrominoMatrixSize; column++) {
                if(!tetromino.matrix[row][column]) continue;
                const cellIndex = convertPositionToIndex(
                    tetromino.row + row, 
                    tetromino.column + column
                )
                cells[cellIndex].classList.add(name);
        } //   column
    }  // row
}

//drawPlayField()
//drawTetramino()


function draw(){
    cells.forEach(cell => cell.removeAttribute('class'));
    drawPlayField()
    drawTetramino()
}
draw();
document.addEventListener('keydown', onKeyDown)
function onKeyDown(event){
    switch(event.key){
        case 'ArrowDown':
            moveTetraminoDown()
            break
        case 'ArrowLeft':
            moveTetraminoLeft()
            break
        case 'ArrowRight':
            moveTetraminoRight()
            break
    }
    draw()
}
document.addEventListener('DOMContentLoaded', function() {
    const btnUP = document.getElementById('btn-UP');
    const btnLEFT = document.getElementById('btn-LEFT');
    const btnDOWN= document.getElementById('btn-DOWN');
    const btnRIGHT = document.getElementById('btn-RIGHT');
  
   /*  btnUP.addEventListener('click', function() {
        moveTetraminoUP();
        draw();
    }); */
    btnLEFT.addEventListener('click', function() {
        moveTetraminoLeft();
        draw();
    });
    btnDOWN.addEventListener('click', function() {
        moveTetraminoDown();
        draw();
    });
    btnRIGHT.addEventListener('click', function() {
        moveTetraminoRight();
        draw();
    });
   
  
   
  });
  

function moveTetraminoDown(){
    tetromino.row +=1;
}

function moveTetraminoLeft(){
    tetromino.column -=1;
}

function moveTetraminoRight(){
    tetromino.column +=1;
}

