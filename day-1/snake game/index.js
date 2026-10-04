const gameBord = document.querySelector('#gameBoard');

const ctx = gameBord.getContext('2d');
const scoretxt = document.querySelector('#scoretxt');
const resetBtn = document.querySelector('#resetBtn');

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = 'white';
const snakeColor = 'lightgreen';
const snakeBordet = 'black';
const foodColor ="red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let snake = [
    {x:0, y:0}
]


"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"