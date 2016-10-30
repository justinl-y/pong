import './game.css';
import { gameSettings } from './settings';
import { player1Keys, player2Keys } from './keys';
import Game from './Game';
//import Paddle from './Paddle';
//import Ball from './Ball';

const gameID = gameSettings.gameID;
const animationMS = gameSettings.animationMS;
let canvas = document.getElementById(gameID);
let context = canvas.getContext('2d');
const boardHeight = canvas.height;
const boardWidth = canvas.width;

let numberOfBalls = gameSettings.ballNumberInitial;
let paddleColourIndex = gameSettings.paddleColourInitial;
let paddleColour = gameSettings.paddleColours[paddleColourIndex];

// create game
const game = new Game(gameID, canvas);
game.createBoard(context, boardHeight, boardWidth);
game.createScoreboard(context, boardWidth, -10, 'end', 0, 0);
game.createScoreboard(context, boardWidth, 10, 'start', 0, 0);
game.createPaddle(context, boardHeight, 5, paddleColour, gameSettings.paddleWidth, gameSettings.paddleHeight, gameSettings.paddleSpeed, player1Keys);
game.createPaddle(context, boardHeight, boardWidth - (5 + gameSettings.paddleWidth), paddleColour, gameSettings.paddleWidth, gameSettings.paddleHeight, gameSettings.paddleSpeed, player2Keys);
game.createBalls(context, boardHeight, boardWidth, numberOfBalls);

let player1Score = 0;
let player2Score = 0;

// call self invoking function to run game
(function gameLoop() {
	game.render();
   	setTimeout(window.requestAnimationFrame(gameLoop), animationMS);

	player1Score = game.scoreboards[0].score;
	player2Score = game.scoreboards[1].score;

	//console.log(Math.max(player1Score, player2Score));

	if ( Math.max(player1Score, player2Score) > numberOfBalls ) {
		//numberOfBalls = Math.max(player1Score, player2Score);

		game.createBall(context, boardHeight, boardWidth);
		numberOfBalls += 2;

		console.log(Math.max(player1Score, player2Score));

		if (Math.max(player1Score, player2Score) > 9) {
			paddleColourIndex++;
			paddleColour = gameSettings.paddleColours[paddleColourIndex];

			game.paddles = [];
			game.createPaddle(context, boardHeight, 5, paddleColour, gameSettings.paddleWidth, gameSettings.paddleHeight, gameSettings.paddleSpeed, player1Keys);
			game.createPaddle(context, boardHeight, boardWidth - (5 + gameSettings.paddleWidth), paddleColour, gameSettings.paddleWidth, gameSettings.paddleHeight, gameSettings.paddleSpeed, player2Keys);
		}

		//if (numberOfBalls > 10) {

		//}
		//console.log(numberOfBalls);
	}

	//console.log('player1Score: ' + player1Score + 'player2Score: ' + player2Score);
}());