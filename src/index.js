import './game.css';
import Game from './Game';
//import Paddle from './Paddle';

const id = 'game';
let game = new Game(id);
const ms = 30;

// self invoking function
(function gameLoop() {
	game.render();
   	setTimeout(window.requestAnimationFrame(gameLoop), ms);
}());