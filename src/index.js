import './game.css';
import { gameSettings } from './settings';
import Game from './Game';
import Paddle from './Paddle';
import Ball from './Ball';

const gameID = gameSettings.gameID;
const animationMS = gameSettings.animationMS;

let game = new Game(gameID);

// self invoking function
(function gameLoop() {
	game.render();
   	setTimeout(window.requestAnimationFrame(gameLoop), animationMS);
}());