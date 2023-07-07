const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
let canvasSize;
let elementSize;

window.addEventListener('load', setCanvasSize);
//CANVAS RESPONSIVE
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    //TAMANO DEL CANVAS
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    //ELEMENTOS DENTRO DEL CANVAS
    elementSize = canvasSize / 10;

    startGame();
}

function startGame() {
    console.log({canvasSize, elementSize});

    //CALCULO DEL TAMANO DE LOS EMOJIS
    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';

    //Niveles
    const map = maps[0];
    //crear un arreglo para cada vez que se encuentre un salto de linea
    //Arreglo de filas a partir de un string
    const mapRows = map.trim().split('\n');
    //Array bidimensional, cada fila sea un arreglo de cada columna
    const mapColumns = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapColumns});

    //RECORRER ARRAY BIDIMENSIONAL
    mapColumns.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col]
            const posX = elementSize * (colI + 1);
            const posY = elementSize * (rowI + 1);
            game.fillText(emoji, posX, posY)
            // console.log({ row, rowI, col, colI});
        })
    });

    //ARRAYS MULTIDIMENSIONALES
    /* for (let row = 1; row <= 10; row++) {
        for (let col = 1; col <= 10; col++) {
            game.fillText(emojis[mapColumns[row - 1][col - 1]], elementSize * col, elementSize * row);
            // game.fillText(emojis['X'], elementSize * col, elementSize * row);

            // game.fillText(emojis['X'], elementSize, elementSize * i);
        }
        
    } */
}

window.addEventListener('keydown', moveByKeys);

btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    if(event.key == 'ArrowUp') {
        moveUp();
    } else if(event.key == 'ArrowDown') {
        moveDown();
    } else if(event.key == 'ArrowLeft') {
        moveLeft();
    } else if(event.key == 'ArrowRight') {
        moveRight();
    } else {
        console.log('Oprima una tecla correcta');
    }
}

function moveUp() {
    console.log('Me quiero mover hacia arriba');
}

function moveLeft() {
    console.log('Me quiero mover hacia la izquierda');
}

function moveRight() {
    console.log('Me quiero mover hacia la derecha');
}

function moveDown() {
    console.log('Me quiero mover hacia abajo');
}


