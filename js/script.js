const scoreElement = document.querySelector('.score-value');
const scoreResultElement = document.querySelector('#score-result');
const levelElement = document.querySelector('.level-value');
const levelResultElement = document.querySelector('#level-result');
const btnRestart = document.querySelector('#btn-Restart');
const btnHowToPlay = ".btn-howtoplay" ;
const gameOverFild = document.querySelector('.gameOver');
const gamePauseFild = document.querySelector('.paused');
const btngameOver = document.querySelector('.btn-gameOver')
const btnPause = document.querySelector('#btn-pause');
const PLAYFIELD_COLUMNS = 10 ;
const PLAYFIELD_ROWS = 20 ;
let isGameOver = false ;
let timedId = null ;
let isPaused = false ;
let playField ;
let tetromino ;
let score = 0 ;
let level = 0;
let tetromino_speed = 1000;
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

let cells;
init();

function init(){
    score = 0;
    scoreElement.innerHTML = 0;
    level = 1;
    levelElement.innerHTML = 1;
    isGameOver = false;
    gameOverFild.style.display = 'none';
    gamePauseFild.style.display = 'none';
    generatePlayField();
    generateTetramino();
    cells = document.querySelectorAll('.grid div');
    moveDown();
    
}

btnRestart.addEventListener('click', function(){
    document.querySelector('.grid').innerHTML = '';
    
    resetTimer(); // Скидання таймера на 00 та його перезапуск
    init();
    document.body.focus();
})
/* 
//чомусь баг: після запуску перестає працювати керування клавішами на клавіатурі
btngameOver.addEventListener('click', function(){
    document.querySelector('.grid').innerHTML = '';
    
    resetTimer(); // Скидання таймера на 00 та його перезапуск
    init();
}) */

btngameOver.addEventListener("click", function() {
    location.reload();
  }); 

function convertPositionToIndex(row, column){
    return row * PLAYFIELD_COLUMNS + column;
}

function countScore(destroyRows){
    switch(destroyRows){
        case 1:
            score += 10;
            countLevel(score)
            break;
        case 2: 
            score += 25;
            countLevel(score)
                break;
        case 3: 
            score += 75;
            countLevel(score)
                break;
        case 4: 
            score += 100;
            countLevel(score)
                break;
    }
    scoreElement.innerHTML = score;
    scoreResultElement.innerHTML = score;
}

function countLevel(score) {
switch (true) {
    case score === 0 || score < 10:
        level = 1;
        tetromino_speed = 1000;
        break;
    case score > 10 && score <= 35:
        level = 2;
        tetromino_speed = 800;
        break;
    case score > 35 && score <= 60:
        level = 3;
        tetromino_speed = 700;
        break;
    case score > 60 && score <= 85:
        level = 4;
        tetromino_speed = 600;
        break;
    case score > 85 && score <= 105:
        level = 5;
        tetromino_speed = 500;
        break;
    case score > 105 && score <= 110:
        level = 6;
        tetromino_speed = 450;
        break;
    case score > 110 && score <= 120:
        level = 7;
        tetromino_speed = 400;
        break;    
}
    levelElement.innerHTML = level;
    levelResultElement.innerHTML = level;
}


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
            if(isOutsideOfTopboard(row)){
                isGameOver = true;
                return;
            }
            if(tetromino.matrix[row][column]){
            playField[tetromino.row + row][tetromino.column + column]=tetromino.name;
            }
        }
    }

    const filledRows = findFilledRows();
    removeFillRows(filledRows);
    generateTetramino();
    countScore(filledRows.length);
    // countLevel(score);

}

function removeFillRows(filledRows){
    for(let i = 0; i < filledRows.length; i++){
        const row = filledRows[i];
        dropRowsAbove(row);
    }
}

function dropRowsAbove(rowDelete){
    for(let row = rowDelete; row > 0; row--){
        playField[row] = playField[row - 1];
    }

    playField[0] = new Array(PLAYFIELD_COLUMNS).fill(0);
}


function findFilledRows(){
    const fillRows = [];
    for(let row = 0; row < PLAYFIELD_ROWS; row++){
        let filledColumns = 0;
        for(let column = 0; column < PLAYFIELD_COLUMNS; column++){
            if(playField[row][column] != 0){
                filledColumns++;
            }
        }
        // for 2
        if(PLAYFIELD_COLUMNS === filledColumns){
            fillRows.push(row);
        }
        // if
    }
    // for 1

    return fillRows;
}

// generatePlayField()
// generateTetramino()


// const cells = document.querySelectorAll('.grid div');

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
                
                if(isOutsideOfTopboard(row)) continue;
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
function rotate(){
    rotateTetramino();
    draw();
}

document.addEventListener('keydown', onKeyDown)
function onKeyDown(event){
    if (event.key == "Escape"){
        tooglePauseGame();
        event.target.blur()
        if (gamePauseFild) {
            gamePauseFild.style.display = (gamePauseFild.style.display === 'flex') ? 'none' : 'flex';
        }
    } 

    // if Escape
    if(!isPaused){
        switch(event.key){
                case ' ':
                    dropTetrominoDown()
                    break
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
                case 'w':
                case 'W':
                    rotateTetramino()
                    break
                case 's':
                case 'S':
                    moveTetraminoDown()
                    break
                case 'a':
                case 'A':
                    moveTetraminoLeft()
                    break
                case 'd':
                case 'D':
                    moveTetraminoRight()
                    break
                
            }

            
        
    }
    // if isPaused
    draw()
}


document.addEventListener('DOMContentLoaded', function() {
    const btnUP = document.getElementById('btn-UP');
    const btnLEFT = document.getElementById('btn-LEFT');
    const btnDOWN= document.getElementById('btn-DOWN');
    const btnRIGHT = document.getElementById('btn-RIGHT');
    const btnSPACE = document.getElementById('btn-space');
    const btnRESUME = document.querySelector('#btn-resume');
  
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
    btnSPACE.addEventListener('click', function() {
        dropTetrominoDown();
        draw();
    });
    btnRESUME.addEventListener('click', function(){
        gamePauseFild.style.display = 'none';
        tooglePauseGame();
    })
    btnPause.addEventListener('click', function(){
        tooglePauseGame();
        gamePauseFild.style.display = 'flex';
    })
   
  });
  //dffd
  function dropTetrominoDown(){
        while(isValid()){
            tetromino.row++;
        }
        tetromino.row--;
    }

function  tooglePauseGame(){
    if(isPaused === false){
        pauseTimer();
        stopLoop()
    } else {
        resumeTimer();
        startLoop()
    }
     isPaused = !isPaused
}

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
    startLoop()
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

function moveDown(){
    moveTetraminoDown();
    draw();
    stopLoop();
    startLoop();
    if(isGameOver){
        gameOver();
    }
}

function gameOver(){
   
    togglePauseGame();
    updateGameResultTime();
    updateGame(score);
    gamePauseFild.style.display = 'none';
    gameOverFild.style.display = 'flex';
    
}
function startLoop(){
    if(!timedId){
        timedId = setTimeout(()=>{ requestAnimationFrame(moveDown) }, tetromino_speed)
    }
}

function stopLoop() {
    cancelAnimationFrame(timedId);
    clearTimeout(timedId);
    timedId = null;
}
function togglePauseGame() {
    if (isPaused === false) {
        stopLoop();
        pauseTimer();
    } else {
        startLoop();
        resumeTimer();
    }
    isPaused = !isPaused;
}

$('#btn-howtoplay').click(function(){
    $('.howplayfield').slideToggle();
});
/* RELOAD BUTTON */
/* let reloadButton = document.getElementById("btn-RELOAD");
    reloadButton.addEventListener("click", function() {
      location.reload();
    });
*/


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
function isOutsideOfTopboard(row){
    return tetromino.row + row < 0;
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


/* TIMER */

function pauseTimer() {
    clearInterval(timerInterval);
}

function resumeTimer() {
    startTimer();
}

var stopwatchElement = document.getElementById('stopwatch');
var seconds = 0;
var minutes = 0;
var timerInterval;

function startTimer() {
    timerInterval = setInterval(function () {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }

        var formattedTime = pad(minutes) + ':' + pad(seconds);
        stopwatchElement.innerHTML = formattedTime;
    }, 1000);
}

// Початковий запуск таймера
startTimer();

function resetTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    stopwatchElement.innerHTML = '00:00';
   
    startTimer(); // Перезапуск таймера
}

function updateGameResultTime() {
    var timeResultElement = document.getElementById('time-result');
    timeResultElement.textContent = stopwatchElement.textContent;
}

function pad(value) {
    return value < 10 ? '0' + value : value;
}

// Додавання обробника подій для кнопки restart







