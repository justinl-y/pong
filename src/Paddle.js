export default class Paddle {
    constructor(context, boardHeight, x, colour, paddleWidth, paddleHeight, speed, keys) {
        this.context = context;
        this.boardHeight = boardHeight;
        this.paddleWidth = paddleWidth;
        this.paddleHeight = paddleHeight;
        this.speed = speed;
        this.colour = colour;
        this.x = x;
        this.y = (this.boardHeight / 2) - (this.paddleHeight / 2);
        this.keys = keys;
        document.addEventListener('keydown', event => this.keyListener(event));
    }

    keyListener(event) {
        switch(event.keyCode) {
            case this.keys.up:
                this.moveUp();
                break;
            case this.keys.down:
                this.moveDown();
                break;
            default:
                return;
        }
    }

    moveUp() {
        if (this.y > 0) {
            this.y -= this.speed;
        }
    }

    moveDown() {
        if (this.y + this.paddleHeight < this.boardHeight) {
            this.y += this.speed;
        }
    }

    render() {
        this.context.fillStyle = this.colour;
        this.context.fillRect(
            this.x, this.y,
            this.paddleWidth, this.paddleHeight
        );
    }
}
