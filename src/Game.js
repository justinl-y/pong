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
import Paddle from './Paddle';
import { player1Keys, player2Keys } from './keys';
import Ball from './Ball';

export default class Game {
	constructor(id) {
		const canvas = document.getElementById(id);
		this.boardHeight = canvas.height;
		this.boardWidth = canvas.width;
		this.context = canvas.getContext('2d'); //context

        this.board = new Board(this.boardHeight, this.boardWidth);
		this.p1 = new Paddle(this.boardHeight, 5, 'white', player1Keys);
		this.p2 = new Paddle(this.boardHeight, this.boardWidth - 10, 'white', player2Keys);
        this.ball = new Ball(this.boardHeight, this.boardWidth, 'white');
	}

	render() {
		this.board.render(this.context);
        this.p1.render(this.context);
        this.p2.render(this.context);
		this.ball.render(this.context, this.p1, this.p2);
	}
}