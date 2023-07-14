const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementSize;
let level = 0;

const playerPosition = {
    x: undefined,
    y: undefined,
};

const giftPosition = {
    x: undefined,
    y: undefined,
};

let enemyPositions = [];

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
    const map = maps[level];

    if (!map) {
        gameWin();
        // Para no volver a renderizar el mapa, porque ya termino el juego.
        return;
    }

    //crear un arreglo para cada vez que se encuentre un salto de linea
    //Arreglo de filas a partir de un string
    const mapRows = map.trim().split('\n');
    //Array bidimensional, cada fila sea un arreglo de cada columna
    const mapColumns = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapColumns});

    enemyPositions = [];

    //Debemos borrar todo antes de renderizar todo el juego y los movimientos del jugador, ya que con canvas no hay otra forma
    game.clearRect(0, 0, canvasSize, canvasSize);

    //RECORRER ARRAY BIDIMENSIONAL
    mapColumns.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col]
            const posX = elementSize * (colI + 1);
            const posY = elementSize * (rowI + 1);

            if (col == 'O') {
                //Si ninguna de estas posiciones tiene un elemento, es decir si son undefined, entonces se le debe asignar una posicion. Pero si no, pues no se le asigna nada porque ya tendra una posicion.
                if (!playerPosition.x && !playerPosition.y) {
                // console.log('Aqui debe ir el jugador');
                // Pero cual es la posicion?
                // console.log({posX, posY});
                // Ahora se la asignamos a playerPosition
                playerPosition.x = posX;
                playerPosition.y = posY;
                console.log({playerPosition});
                }
            } else if (col == 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col == 'X') {
                enemyPositions.push({
                    x: posX,
                    y: posY,
                });
            }

            game.fillText(emoji, posX, posY)
            // console.log({ row, rowI, col, colI});
        });
    });

    //Para renderizar nuestro emoji de jugador
    // game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
    // Pero necesitamos que nos renderice cada vez que se mueva, asi que creamos una funcion fuera de esta.

    // Ahora, apenas rendericemos nuestro mapa queremos mover al jugador, asiq ue llamamos la funcion que creamos despues
    movePlayer();
}

function movePlayer() {
    const giftColisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftColisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    //Si hubo colision significa que ambas variables, o sea giftColision en X y Y, son true.
    const giftColision = giftColisionX  && giftColisionY;
    

    if (giftColision) {
        // console.log('Subiste de nivel!');
        levelWin();
    };

    const enemyColision = enemyPositions.find(enemy => {
        const enemyColisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyColisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
        return enemyColisionX && enemyColisionY;
    });

    if (enemyColision) {
        console.log('Chocaste con un elemento :(');
    };

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin() {
    console.log('Subiste de nivel!');
    level++;
    startGame();
};

function gameWin() {
    console.log('Terminaste el juego!');
}

window.addEventListener('keydown', moveByKeys);

btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    //console.log(event); Imprime los codigos de la letra que orpima para poder hacer nuestro condicional
    if(event.key == 'ArrowUp') {
        moveUp();
    } else if(event.key == 'ArrowDown') {
        moveDown();
    } else if(event.key == 'ArrowLeft') {
        moveLeft();
    } else if(event.key == 'ArrowRight') {
        moveRight();
    } else {
        console.log('Oprima una flecha para poder moverse');
    }
}

function moveUp() {
    console.log('Me quiero mover hacia arriba');

    if ((playerPosition.y - elementSize) < elementSize) {
        console.log('OUT');
    } else {
        //Si miramos en la consola vemos que si "se mueve", ya que si llamamos a playerPosition, cambia su posicion en y
        playerPosition.y -= elementSize;
        // Hay que volver a renderizar todo el juego
        startGame();
    }
}

function moveLeft() {
    console.log('Me quiero mover hacia la izquierda');
    //Ahora para que el jugador no se salga del canvas, debemos hacer un condicional
    if ((playerPosition.x - elementSize) < elementSize) {
        console.log('OUT');
    } else {
        playerPosition.x -= elementSize;
        startGame();
    } 
}

function moveRight() {
    console.log('Me quiero mover hacia la derecha');
    if ((playerPosition.x + elementSize) > canvasSize) {
        console.log('OUT');
    } else {
        playerPosition.x += elementSize;
        startGame();
    } 
}

function moveDown() {
    console.log('Me quiero mover hacia abajo');
    if ((playerPosition.y + elementSize) > canvasSize) {
        console.log('OUT');
    } else {
        playerPosition.y += elementSize;
        startGame();
    } 
}


