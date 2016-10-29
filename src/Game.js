/*import Paddle from './Paddle';
import Board from './Board';
import { player1Keys, player2Keys } from './keys';

const gap = 10; // space between left/right edges and paddles

export default class Game {
	constructor() {
		const canvas = document.getElementById('game');
		this.context = canvas.getContext('2d');
		this.context.fillStyle = 'white';
        this.height = canvas.height;
        this.width = canvas.width;

        this.board = new Board(this.width, this.height);
        this.p1 = new Paddle(this.height, gap, 'white', player1Keys);
        this.p2 = new Paddle(this.height, this.width - 4 - gap, 'white', player2Keys);
	}

   render() {
	   this.board.drawBoard();
       this.p1.render(this.context);
       this.p2.render(this.context);
   }
}*/

import Board from './Board';
import Scoreboard from './Scoreboard';
import Paddle from './Paddle';
import { player1Keys, player2Keys } from './keys';
import Ball from './Ball';

export default class Game {
	constructor(id) {
		const canvas = document.getElementById(id);
		this.boardHeight = canvas.height;
		this.boardWidth = canvas.width;
		this.context = canvas.getContext('2d'); //context
 
		// create game board
        this.board = new Board(this.boardHeight, this.boardWidth);

		// create
		this.p1Scoreboard = new Scoreboard( ( this.boardWidth / 2 ) / 2, this.boardHeight / 2 );
		this.p2Scoreboard = new Scoreboard( ( this.boardWidth / 2 ) , this.boardHeight / 2 );

		this.p1 = new Paddle(this.boardHeight, 5, 'white', player1Keys);
		this.p2 = new Paddle(this.boardHeight, this.boardWidth - 10, 'white', player2Keys);
        this.ball = new Ball(this.boardHeight, this.boardWidth, 'red');
	}

	render() {
		this.board.render(this.context);

		this.p1Scoreboard.render(this.context);
		this.p2Scoreboard.render(this.context);

        this.p1.render(this.context);
        this.p2.render(this.context);
		this.ball.render(this.context, this.p1, this.p2);
	}
}