export default class Ball {
    constructor(boardHeight, boardWidth, colour) {
        this.boardHeight = boardHeight;
        this.boardWidth = boardWidth;
        this.y = 0; //this.boardHeight / 2;
        this.x = 0; //this.boardWidth / 2;
        this.vy = 0;
        this.vx = 0; //Math.floor(Math.random() * 12 - 6); //1
        //this.speed = 10;
        this.radius = 4;
        this.colour = colour;
        this.reset();
    }

    draw(context) {
        context.fillStyle = this.colour;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    }

    //reset ball
    reset() {
        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;
        this.vy = 1;
        this.vx = 1;

        if (Math.random() > 0.5) {
            this.vx *= -1;
        }
        if (Math.random() > 0.5) {
            this.vy *= -1;
        }
    }

    /*score(p1Score, p2Score) {
        if (this.x <= 0 + this.radius) {
            this.reset();
            p1Score.score++;
        } else if (this.x >= game.width) {
            this.reset();
            p2Score.score++;
        }
    }*/

    //paddle collision with ball
    paddleCollision(paddle1, paddle2, p1Scoreboard, p2Scoreboard) {
        if (this.vx > 0) {
            // going right

            // determine if ball at or past right paddle's' left edge
            const inRightEnd = (this.x + this.radius) >= paddle2.x;

            // if past right paddle reverse x direction
            if (inRightEnd) {
                if (this.y >= paddle2.y && this.y <= (paddle2.y + paddle2.height)) {
                    this.vx *= -1;
                } else {
                    if (this.x === this.boardWidth) {
                        p1Scoreboard.score += 1;

                        this.reset();
                    }
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
            const inLeftEnd = (this.x - this.radius) <= paddle1.x + paddle1.width;

            // if past lest paddle reverse x direction
            if (inLeftEnd) {
                if (this.y >= paddle1.y && this.y <= (paddle1.y + paddle1.height)) {
                    //console.log('paddle hit');
                    this.vx *= -1;
                } else {
                    //console.log(this.x - this.radius);

                    if (this.x - this.radius === -4) {
                        p2Scoreboard.score += 1;

                        this.reset();
                    }
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

    render(context, paddle1, paddle2, p1Scoreboard, p2Scoreboard) {
        //const hitRight = this.x + this.radius >= this.boardWidth;
        //const hitLeft = this.x - this.radius <= 0;
        const hitTop = this.y - this.radius <= 0;
        const hitBottom = (this.y + this.radius) >= this.boardHeight;

        //if (hitLeft || hitRight) {
            //this.vx *= -1;
        //}
        if (hitBottom || hitTop) {
            this.vy *= -1;
        }

        this.x += this.vx;
        this.y += this.vy;

        //this.score(p1Score, p2Score);
        this.paddleCollision(paddle1, paddle2, p1Scoreboard, p2Scoreboard);
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