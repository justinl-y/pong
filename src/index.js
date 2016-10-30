import './game.css';
import { gameSettings } from './settings';
import { player1Keys, player2Keys } from './keys';
import Game from './Game';
import Paddle from './Paddle';
import Ball from './Ball';

const gameID = gameSettings.gameID;
const animationMS = gameSettings.animationMS;
let canvas = document.getElementById(gameID);
let context = canvas.getContext('2d');
const boardHeight = canvas.height;
const boardWidth = canvas.width;
let numberOfBalls = gameSettings.ballNumber;

// create game
const game = new Game(gameID, canvas);
game.createBoard(context, boardHeight, boardWidth);
game.createScoreboard(context, boardWidth, -10, 'end', 0, 0);
game.createScoreboard(context, boardWidth, 10, 'start', 0, 0);
game.createPaddle(context, boardHeight, 5, gameSettings.player1Colour, gameSettings.paddleWidth, gameSettings.paddleHeight, gameSettings.paddleSpeed, player1Keys);
game.createPaddle(context, boardHeight, boardWidth - (5 + gameSettings.paddleWidth), gameSettings.player2Colour, gameSettings.paddleWidth, gameSettings.paddleHeight, gameSettings.paddleSpeed, player2Keys);
game.createBalls(numberOfBalls);

// call self invoking function to run game
(function gameLoop() {
	game.render();
   	setTimeout(window.requestAnimationFrame(gameLoop), animationMS);
}());