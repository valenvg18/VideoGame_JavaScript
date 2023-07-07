const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
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

    const map = maps[1];
    //crear un arreglo para cada vez que se encuentre un salto de linea
    const mapRows = map.trim().split('\n');
    const mapColumns = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapColumns});

    //ARRAYS MULTIDIMENSIONALES
    for (let row = 1; row <= 10; row++) {
        for (let col = 1; col <= 10; col++) {
            game.fillText(emojis[mapColumns[row - 1][col - 1]], elementSize * col, elementSize * row);
            // game.fillText(emojis['X'], elementSize * col, elementSize * row);

            // game.fillText(emojis['X'], elementSize, elementSize * i);
        }
        
    }
    


    //Lugar donde inicia en x, en y, y cuanto va a medir
    // game.fillRect(0, 0, 100, 100);
    // game.clearRect(0, 0, 50, 50);

    // game.font = '25px Verdana';
    // game.fillStyle = 'purple';
    // game.textAlign = 'center';
    // game.fillText('Platzi', 25, 25);
}

