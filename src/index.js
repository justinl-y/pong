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

//let numberOfBalls = gameSettings.ballNumberInitial;
let paddleColourIndex = gameSettings.paddleColourInitial;
let paddleColour = gameSettings.paddleColours[paddleColourIndex];
let paddleHeight = gameSettings.paddleHeight;

// create game
const game = new Game(gameID, canvas);
game.createBoard(context, boardHeight, boardWidth);
game.createScoreboard(context, boardWidth, -10, 'end', 0, 0);
game.createScoreboard(context, boardWidth, 10, 'start', 0, 0);
game.createPaddle(context, boardHeight, 5, paddleColour, gameSettings.paddleWidth, paddleHeight, gameSettings.paddleSpeed, player1Keys);
game.createPaddle(context, boardHeight, boardWidth - (5 + gameSettings.paddleWidth), paddleColour, gameSettings.paddleWidth, paddleHeight, gameSettings.paddleSpeed, player2Keys);
game.createBalls(context, boardHeight, boardWidth, gameSettings.ballNumberInitial);

// call self invoking function to run game
(function gameLoop() {
	game.render();
   	setTimeout(window.requestAnimationFrame(gameLoop), animationMS);

	let playerScoreAverage = Math.max(game.scoreboards[0].score, game.scoreboards[1].score);

	//console.log('playerScoreAverage: ' + playerScoreAverage);
	//console.log('playerGameAverage: ' + playerGameAverage);

	// change balls and paddle size with score
	switch (playerScoreAverage) {
		case 0:
		case 1:
			//console.log('should be 1');
			while (game.balls.length < 1) {
				game.createBall(context, boardHeight, boardWidth);
			}
			break;
		case 2:
		case 3:
			//console.log('should be 2');
			while (game.balls.length < 2) {
				game.createBall(context, boardHeight, boardWidth);
			}
			break;
		case 4:
		case 5:
			//console.log('should be 3');
			while (game.balls.length < 3) {
				game.createBall(context, boardHeight, boardWidth);
			}
			break;
		case 6:
		case 7:
			//console.log('should be 4');
			while (game.balls.length < 4) {
				game.createBall(context, boardHeight, boardWidth);
			}
			break;
		case 8:
		case 9:
			//console.log('should be 5');
			while (game.balls.length < 5) {
				game.createBall(context, boardHeight, boardWidth);
			}
			break;
		default:
			if (game.scoreboards[0].score > 9 ) {
				game.scoreboards[0].game++;
				game.scoreboards[0].score = 0;
				game.scoreboards[1].score = 0;
			} else if (game.scoreboards[1].score > 9) {
				game.scoreboards[1].game++;
				game.scoreboards[0].score = 0;
				game.scoreboards[1].score = 0;	
			}

			let playerGameAverage = Math.max(game.scoreboards[0].game, game.scoreboards[1].game);

			game.balls = [];
			paddleColourIndex++;

			console.log(playerGameAverage);

			switch (playerGameAverage) {
				case 1:
					console.log('level 2');

					paddleColour = gameSettings.paddleColours[paddleColourIndex];
					paddleHeight = (gameSettings.paddleHeight / 100) * 85;

					game.paddles = [];
					game.createPaddle(context, boardHeight, 5, paddleColour, gameSettings.paddleWidth, paddleHeight, gameSettings.paddleSpeed, player1Keys);
					game.createPaddle(context, boardHeight, boardWidth - (5 + gameSettings.paddleWidth), paddleColour, gameSettings.paddleWidth, paddleHeight, gameSettings.paddleSpeed, player2Keys);
					break;
				case 2:
					console.log('level 3');

					paddleColour = gameSettings.paddleColours[paddleColourIndex];
					paddleHeight = (gameSettings.paddleHeight / 100) * 70;

					game.paddles = [];
					game.createPaddle(context, boardHeight, 5, paddleColour, gameSettings.paddleWidth, paddleHeight, gameSettings.paddleSpeed, player1Keys);
					game.createPaddle(context, boardHeight, boardWidth - (5 + gameSettings.paddleWidth), paddleColour, gameSettings.paddleWidth, paddleHeight, gameSettings.paddleSpeed, player2Keys);
					break;
				case 3:
					console.log('level 3');
					paddleColour = gameSettings.paddleColours[paddleColourIndex];
					paddleHeight = (gameSettings.paddleHeight / 100) * 55;

					game.paddles = [];
					game.createPaddle(context, boardHeight, 5, paddleColour, gameSettings.paddleWidth, paddleHeight, gameSettings.paddleSpeed, player1Keys);
					game.createPaddle(context, boardHeight, boardWidth - (5 + gameSettings.paddleWidth), paddleColour, gameSettings.paddleWidth, paddleHeight, gameSettings.paddleSpeed, player2Keys);
					break;
				case 4:
					console.log('level 4');
					paddleColour = gameSettings.paddleColours[paddleColourIndex];
					paddleHeight = (gameSettings.paddleHeight / 100) * 40;

					game.paddles = [];
					game.createPaddle(context, boardHeight, 5, paddleColour, gameSettings.paddleWidth, paddleHeight, gameSettings.paddleSpeed, player1Keys);
					game.createPaddle(context, boardHeight, boardWidth - (5 + gameSettings.paddleWidth), paddleColour, gameSettings.paddleWidth, paddleHeight, gameSettings.paddleSpeed, player2Keys);
					break;
				default:
					//game won 
			}

			game.createBall(context, boardHeight, boardWidth);
		}
}());