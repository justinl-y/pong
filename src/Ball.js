export default class Ball {
    constructor(boardHeight, boardWidth, colour) {
        this.boardHeight = boardHeight;
        this.boardWidth = boardWidth;
        this.x = this.boardWidth / 2; //150;
        this.y = this.boardHeight / 2; //50;
        this.colour = colour;
        this.vx = 1;
        this.vy = 1;
        this.speed = 5;
        this.radius = 4;
    }

    draw(context) {
        context.fillStyle = this.colour;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    }

    render(context) {
        const hitRight = this.x >= this.boardWidth;
        const hitLeft = this.x - this.radius <= 0;
        const hitTop = this.y - this.radius <= 0;
        const hitBottom = this.y >= this.boardHeight;

        if (hitLeft || hitRight) {
            this.vx *= -1;
        }

        if (hitBottom || hitTop) {
            this.vy *= -1;
        }

        this.x += this.vx;
        this.y += this.vy;

        this.draw(context);
    }
}

/*const size = 5;
export default class Ball {
   constructor() {
      this.x = 50; // random x
      this.y = 50; // random y
      this.vy = Math.floor(Math.random() * 12 - 6); // y direction
      this.vx = (7 - Math.abs(this.vy)); // x direction
      this.size = size;
   }
}*/