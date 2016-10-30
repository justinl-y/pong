import Board from './Board';
import Scoreboard from './Scoreboard';
import Paddle from './Paddle';
import Ball from './Ball';
import { player1Keys, player2Keys } from './keys';
import { gameSettings } from './settings';

export default class Game {
	constructor(id) {
		const canvas = document.getElementById(id);
		this.numberOfBalls = 2;//gameSettings.ballNumber;

		this.boardHeight = canvas.height;
		this.boardWidth = canvas.width;
		this.context = canvas.getContext('2d');
 
		// create game board
        this.board = new Board(this.boardHeight, this.boardWidth);

		// create player score boards
		this.p1Scoreboard = new Scoreboard(this.boardWidth, -10, 'end', 0, 0);
		this.p2Scoreboard = new Scoreboard(this.boardWidth, 10, 'start', 0, 0);

		// create paddle objects
		this.p1 = new Paddle(this.boardHeight, 5, gameSettings.player1Colour, player1Keys);
		this.p2 = new Paddle(this.boardHeight, this.boardWidth - 10, gameSettings.player2Colour, player2Keys);

		// create ball object
		/*for( let i = 1; i <= this.numberOfBalls; i++ ) {
			let ballName = 'ball' + i;

			this.ballName = new Ball(this.boardHeight, this.boardWidth, 'red');
		}*/

        this.ball = new Ball(this.boardHeight, this.boardWidth, gameSettings.ballColour);
	}

	render() {
		this.board.render(this.context);

		this.p1Scoreboard.render(this.context);
		this.p2Scoreboard.render(this.context);

        this.p1.render(this.context);
        this.p2.render(this.context);

		for( var i = 1; i <= this.numberOfBalls; i++ ) {
			let ballName = 'ball' + i;

			//console.log(ballName);

			//this.ballName.render(this.context, this.p1, this.p2, this.p1Scoreboard, this.p2Scoreboard);
		}

		this.ball.render(this.context, this.p1, this.p2, this.p1Scoreboard, this.p2Scoreboard);
	}
}