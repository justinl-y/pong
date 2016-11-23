import './game.css';
import { gameSettings } from './settings';
import { player1Keys, player2Keys } from './keys';
import Game from './Game';

// set variables
const gameID = gameSettings.gameID;
let animationMS = gameSettings.animationMS;
let canvas = document.getElementById(gameID);
let context = canvas.getContext('2d');
let boardHeight = canvas.height;
let boardWidth = canvas.width;

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

// function to change paddle size on level increase
function changeGameLevel(paddleHeight) {
	paddleColour = gameSettings.paddleColours[paddleColourIndex];
	paddleHeight = (gameSettings.paddleHeight / 100) * paddleHeight;

	game.paddles = [];
	game.createPaddle(context, boardHeight, 5, paddleColour, gameSettings.paddleWidth, paddleHeight, gameSettings.paddleSpeed, player1Keys);
	game.createPaddle(context, boardHeight, boardWidth - (5 + gameSettings.paddleWidth), paddleColour, gameSettings.paddleWidth, paddleHeight, gameSettings.paddleSpeed, player2Keys);
}

// call self invoking function to run game
(function gameLoop() {
	game.render();
   	setTimeout(window.requestAnimationFrame(gameLoop), animationMS);

	let playerScoreAverage = Math.max(game.scoreboards[0].score, game.scoreboards[1].score);

	// change number of balls by one for every 2 games and paddle size with score
	switch (playerScoreAverage) {
		case 0:
		case 1:
			while (game.balls.length < 1) {
				game.createBall(context, boardHeight, boardWidth);
			}
			break;
		case 2:
		case 3:
			while (game.balls.length < 2) {
				game.createBall(context, boardHeight, boardWidth);
			}
			break;
		case 4:
		case 5:
			while (game.balls.length < 3) {
				game.createBall(context, boardHeight, boardWidth);
			}
			break;
		case 6:
		case 7:
			while (game.balls.length < 4) {
				game.createBall(context, boardHeight, boardWidth);
			}
			break;
		case 8:
		case 9:
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

			let playerGameAverage = game.scoreboards[0].game + game.scoreboards[1].game;

			game.balls = [];
			paddleColourIndex++;

			// game levels
			switch (playerGameAverage) {
				case 1:
					changeGameLevel(85);
					break;
				case 2:
					changeGameLevel(70);
					break;
				case 3:
					changeGameLevel(55);
					break;
				case 4:
					changeGameLevel(40);
					break;
				default:
					// declare winner
					function calculateWinner() {
						if (game.scoreboards[0].game > game.scoreboards[1].game) {
							return 'Player one is the winner.';
						} else if (game.scoreboards[0].game < game.scoreboards[1].game) {
							return 'Player two is the winner.';
						} else if (game.scoreboards[0].score > game.scoreboards[1].score) {
							return 'Player one is the winner.';
						} else if (game.scoreboards[0].score < game.scoreboards[1].score) {
							return 'Player two is the winner.';
						} else {
							return 'We have a draw.';
						}
					}

					context.font = "20px Helvetica";
					context.textAlign = 'center';
					context.textBaseline = 'top';
					context.fillText(calculateWinner(), boardWidth / 2, boardHeight/ 2);

					game.board = null;

					/*'Greetings Professor Falken.'
					'A strange game.  The ony winning move is not to play.'
					'How about a nice game of chess?'*/
				}
			}
}());