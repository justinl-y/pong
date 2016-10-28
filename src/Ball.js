export default class Ball {
    constructor(boardHeight, boardWidth, colour) {
        this.boardHeight = boardHeight;
        this.boardWidth = boardWidth;
        this.y = this.boardHeight / 2;
        this.x = this.boardWidth / 2;
        this.colour = colour;
        this.vy = 1;
        this.vx = 1; //Math.floor(Math.random() * 12 - 6); //1
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

    //paddle collision with ball
    paddleCollision(paddle1, paddle2) {
        if (this.vx > 0) {
            // going right

            // determine if ball at or past right paddle's' left edge
            const inRightEnd = this.x >= paddle2.x;

            // if past right paddle reverse x direction
            if (inRightEnd) {
                if (this.y >= paddle2.y && this.y <= (paddle2.y + paddle2.height)) {
                    this.vx *= -1;
                } else {
                    //calc score
                }

                /*const collisionDiff = this.x + this.boardWidth - paddle2.x;
                const k = collisionDiff / this.vx;
                const y = this.vy * k + (this.y - this.vy);
                const hitRightPaddle = y >= paddle2.y && y + this.boardHeight <= paddle2.y + paddle2.height;

                if (hitRightPaddle) {
                    this.x = paddle2.x - this.boardWidth;
                    this.y = Math.floor(this.y - this.vy + this.vy * k);
                    this.vx = -this.vx;
                }*/
            }
        } else {
            // going left

            // determine if ball is at or past left paddle right edge
            const inLeftEnd = this.x <= paddle1.x + paddle1.width;

            // if past lest paddle reverse x direction
            if (inLeftEnd) {
                if (this.y >= paddle1.y && this.y <= (paddle1.y + paddle1.height)) {
                    //console.log('paddle hit');
                    this.vx *= -1;
                } else {
                    //calc store
                }

                /*const collisionDiff = paddle1.x + paddle1.width - this.x;
                const k = collisionDiff / - this.vx;
                const y = this.vy * k + (this.y - this.vy);
                const hitLeftPaddle = y >= paddle1.y && (y + this.boardHeight) <= (paddle1.y + paddle1.height);

                if (hitLeftPaddle) {
                    this.x = paddle1.x + paddle1.width;
                    this.y = Math.floor(this.y - this.vy + this.vy * k);
                    this.vx = -this.vx;
                }*/
            }
        }
    }

    render(context, paddle1, paddle2) {
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

        this.paddleCollision(paddle1, paddle2);
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

    /*paddleCollision(paddle1, paddle2) {
        if (this.vx > 0) {
            const inRightEnd = paddle2.x <= this.x + this.width && paddle2.x > this.x - this.vx + this.width;

            if (inRightEnd) {
                const collisionDiff = this.x + this.width - paddle2.x;
                const k = collisionDiff / this.vx;
                const y = this.vy * k + (this.y - this.vy);
                const hitRightPaddle = y >= paddle2.y && y + this.height <= paddle2.y + paddle2.height;
                if (hitRightPaddle) {
                    this.x = paddle2.x - this.width;
                    this.y = Math.floor(this.y - this.vy + this.vy * k);
                    this.vx = -this.vx;
                }
            }
        } else {
            const inLeftEnd = paddle1.x + paddle1.width >= this.x;
            if (inLeftEnd) {
                const collisionDiff = paddle1.x + paddle1.width - this.x;
                const k = collisionDiff / -this.vx;
                const y = this.vy * k + (this.y - this.vy);
                const hitLeftPaddle = y >= paddle1.y && y + this.height <= paddle1.y + paddle1.height;

                if (hitLeftPaddle) {
                    this.x = paddle1.x + paddle1.width;
                    this.y = Math.floor(this.y - this.vy + this.vy * k);
                    this.vx = -this.vx;
                }
            }
        }
    }*/