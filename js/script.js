// ДЗ №2
// 1. Поставити const rowTetro = -2; прописати код щоб працювало коректно //НЕВИХОДИТЬ
// 2. Зверстати поле для розрахунку балів гри
// 3. Реалізувати самостійний рух фігур до низу //ГОТОВО
// 4. Прописати логіку і код розрахунку балів гри (1 ряд = 10; 2 ряди = 30; 3 ряди = 50; 4 = 100)
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
//console.log(Math.random())

function generateTetramino(){
     // there is we retern figure from index
     
     const randomIndex = Math.floor(Math.random() * TETROMINO_NAMBERS.length);
    const name = TETROMINO_NAMES[randomIndex];
    const matrix = TETROMINOES[name];
    const col = Math.floor((playField[0].length-matrix[0].length)/2);
    //console.log(matrix)
     // console.log(matrix);
     const row = -2;
    tetromino = {
        name,
        matrix,
        row,
        column: col
    }
}

function placeTetramino(){
    const matrixSize = tetromino.matrix.length;
    for(let row =0; row<matrixSize; row++){
        for(let column =0; column< matrixSize; column++){
            if(tetromino.matrix[row][column]){
            playField[tetromino.row + row][tetromino.column + column]=tetromino.name;
            }
        }
    }

    generateTetramino()

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
                /* щоб з'являлося зверху */
                if (cellIndex>=0) cells[cellIndex].classList.add(name);
                
                /* cells[cellIndex].classList.add(name); */
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

/* let showRotated = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]
 */
function rotateTetramino(){
    const oldMartix = tetromino.matrix;
    const rotatedMatrix = rotateMatrix(tetromino.matrix);
   /*  showRotated = rotateMatrix(showRotated ); */
    tetromino.matrix = rotatedMatrix;
    if (!isValid()){
        tetromino.matrix = oldMartix;
    }
}

draw();

function rotate (){

}

document.addEventListener('keydown', onKeyDown)
function onKeyDown(event){
    switch(event.key){
        case 'ArrowUp':
            rotateTetramino()
            break
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
  
    btnUP.addEventListener('click', function() {
        rotateTetramino()
        draw();
    });
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
  


function rotateMatrix(matrixTetramino){
    const N = matrixTetramino.length;
    const rotateMatrix = [];
    for(let i=0; i<N; i++){
        rotateMatrix[i]=[]
        for(let j=0; j<N; j++){
            rotateMatrix[i][j]=matrixTetramino[N - j -1][i]
        }
    }


    return rotateMatrix

}

function moveTetraminoDown() {
    tetromino.row += 1;
    if (!isValid()) {
        tetromino.row -= 1;
        placeTetramino();
    }
    draw(); 
}


function moveTetraminoLeft(){
    tetromino.column -=1;
    /* Колізія  */
    if(!isValid()){
        tetromino.column +=1;
    } 
} 

function moveTetraminoRight(){
    tetromino.column +=1;
    /* Колізія  */
    if(!isValid()){
        tetromino.column -=1;
    }
   
}
let tetraminoSpeed = 700;
document.addEventListener("DOMContentLoaded", function () {
    function moveDown() {
        moveTetraminoDown();
        setTimeout(moveDown, tetraminoSpeed);
    }

    moveDown();

    
});
/* RELOAD BUTTON */
let reloadButton = document.getElementById("btn-RELOAD");
    reloadButton.addEventListener("click", function() {
      location.reload();
    });
/* Колізія  */
function isValid(){
    const matrixSize = tetromino.matrix.length;
    for(let row =0; row<matrixSize; row++){
        for(let column =0; column< matrixSize; column++){
            
            if(isOutsiteOfGameboard(row,column)){ return false;}
            if (hasCollisions(row,column)){ return false;}
        }
    }
    return true;
}

function isOutsiteOfGameboard(row, column){
    return tetromino.matrix[row][column] && 
        (
        tetromino.column + column < 0 
        || tetromino.column + column >= PLAYFIELD_COLUMNS
        || tetromino.row + row >= PLAYFIELD_ROWS
        );
};

function hasCollisions(row, column){
    if (tetromino.row >=0){
    return tetromino.matrix[row][column] 
        && playField[tetromino.row + row][tetromino.column + column];
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var stopwatchElement = document.getElementById('stopwatch');
    var seconds = 0;
    var minutes = 0;

    setInterval(function () {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }

        var formattedTime = pad(minutes) + ':' + pad(seconds);
        stopwatchElement.innerHTML = formattedTime;
    }, 1000);

    function pad(value) {
        return value < 10 ? '0' + value : value;
    }
});

/* function clearField(){
    for(let row = PLAYFIELD_ROWS - 1; row > 0; row--){
        let r = 0;
        for(let column = 0; column < PLAYFIELD_COLUMNS; column++){
            if (playfield[row][column]) {r++};
        }
        if (r == PLAYFIELD_COLUMNS){
            console.log('CLEAR');
            playfield[row].fill(0);
            for(let row1 = row - 1; row1 > 0; row1--){
                playfield[row1 + 1] = playfield[row1];
            }
            row++;
        }
    }
}; */