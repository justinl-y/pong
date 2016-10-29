export default class Paddle {
    constructor(boardHeight, x, colour, keys) {
        this.boardHeight = boardHeight;
        this.width = 5;
        this.height = 50;
        this.speed = 5;
        this.colour = colour;
        this.x = x;
        this.y = (boardHeight / 2) - (this.height / 2);
        this.keys = keys;
        document.addEventListener('keydown', event => this.keyListener(event));
    }

    //wallBounce() {

    //}

    keyListener(event) {
        switch(event.keyCode) {
            case this.keys.up:
                this.moveUp();
                break;
            case this.keys.down:
                this.moveDown();
                break;
            default: return;
        }
    }

    moveUp() {
        if (this.y > 0) {
            this.y -= this.speed;
        }
    }

    moveDown() {
        if (this.y + this.height < this.boardHeight) {
            this.y += this.speed;
        }
    }

    render(context) {
        context.fillStyle = this.colour;
        context.fillRect(
            this.x, this.y,
            this.width, this.height
        );
    }
}
