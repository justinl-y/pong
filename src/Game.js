import { gameSettings } from './settings';
import { player1Keys, player2Keys } from './keys';
import Board from './Board';
import Scoreboard from './Scoreboard';
import Paddle from './Paddle';
import Ball from './Ball';

export default class Game {
	constructor(gameID, canvas) {
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
		this.boardHeight = this.canvas.height;
		this.boardWidth = this.canvas.width;
		this.board;
		this.scoreboards = [];
		this.paddles = [];
		this.balls = [];;
	}

	createBoard(context, boardHeight, boardWidth) {
		this.board = new Board(context, boardHeight, boardWidth);
	}

	createScoreboard(context, boardWidth, offSet, alignment, game, score) {
		let scoreboardName = 'scoreboard' + this.scoreboards.length;

		this.scoreboardName = new Scoreboard(context, boardWidth, offSet, alignment, game, score);
		this.scoreboards.push(this.scoreboardName);
	}

	createPaddle(context, boardHeight, x, colour, paddleWidth, paddleHeight, speed, keys) {
		let paddledName = 'Paddle' + this.paddles.length;

		this.paddleName = new Paddle(context, boardHeight, x, colour, paddleWidth, paddleHeight, speed, keys);
		this.paddles.push(this.paddleName);
	}

	createBalls(numberOfBalls) {
		for ( let i = 0 ; i < numberOfBalls ; i++ ) {
			let ballName = 'ball' + i;

			this.ballName = new Ball(this.boardHeight, 
										this.boardWidth, 
										gameSettings.ballColour, 
										gameSettings.initialBallVY, 
										gameSettings.initialBallVX, 
										gameSettings.ballSpeed);

			this.balls.push(this.ballName);			
		}
	}

	render() {
		// board
		this.board.render(this.context);

		//scoreboards
		for ( let i = 0; i < this.scoreboards.length; i++ ) {
			this.scoreboards[i].render();
		}

		// paddles
		for ( let i = 0; i < this.paddles.length; i++ ) {
			this.paddles[i].render();
		}

		// balls
		for ( let i = 0; i < this.balls.length; i++ ) {
			this.balls[i].render(this.context,
									this.scoreboards[0],
									this.scoreboards[1],
									this.paddles[0],
									this.paddles[1]);
		}
	}
}