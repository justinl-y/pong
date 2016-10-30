export default class Ball {
    constructor(boardHeight, boardWidth, colour, initialVY, initialVX, initialSpeed) {
        this.boardHeight = boardHeight;
        this.boardWidth = boardWidth;
        this.colour = colour;
        this.initialVY = initialVY;
        this.initialVX = initialVX;
        this.speed = initialSpeed;

        this.vy = this.initialVY; //Math.floor(Math.random() * 12 - 6);
        this.vx = this.initialVX; //(7 - Math.abs(this.vy));
        this.y = this.boardHeight / 2;
        this.x = this.boardWidth / 2;
        this.radius = 4;
    }

    reset() {
        //this.speed *= 0.5;

        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;
        this.vy = this.initialVY; //Math.floor(Math.random() * 12 - 6);
        this.vx = this.initialVX; //(7 - Math.abs(this.vy));
        
        if (Math.random() > 0.5) {
            this.vx *= -1; 
        }
        if (Math.random() > 0.5) {
            this.vy *= -1;
        }
    }

    ballCollisionSound(soundSelect) {
        let sound;

        switch (soundSelect) {
            case 'paddle':
                sound = new Audio('../sounds/pong-01.wav');
                sound.play();
                break;
            case 'wall':
                sound = new Audio('../sounds/pong-03.wav');
                sound.play();
                break;
            case 'score':
                sound = new Audio('../sounds/pong-02.wav');
                sound.play();
                break;
        }
    }
    
    //paddle collision with ball
    paddleCollision(paddle1, paddle2, p1Scoreboard, p2Scoreboard) {
        if (this.vx > 0) {
            // going right

            // determine if ball at or past right paddle's' left edge
            const inRightEnd = (this.x + this.radius) >= paddle2.x;

            // if past right paddle reverse x direction if paddle hit. Score if not
            if (inRightEnd) {

                //going up
                if (this.vy > 0) {
                    if ( ((this.y + this.radius) >= paddle2.y && (this.y + this.radius) <= (paddle2.y + paddle2.height)) && this.x <= paddle2.x ) {
                        this.respondPaddleHit();
                    } else {
                        if (this.x === this.boardWidth) {
                            this.respondPaddleMiss(p1Scoreboard);
                        }
                    }
                } else {
                    if ( ((this.y - this.radius) >= paddle2.y && (this.y - this.radius) <= (paddle2.y + paddle2.height)) && this.x <= paddle2.x ) {
                        this.respondPaddleHit();
                    } else {
                        if (this.x === this.boardWidth) {
                            this.respondPaddleMiss(p1Scoreboard);
                        }
                    }
                }
            }
        } else {
            // going left

            // determine if ball is at or past left paddle right edge
            const inLeftEnd = (this.x - this.radius) <= paddle1.x + paddle1.width;

            // if past left paddle reverse x direction
            if (inLeftEnd) {
                // going up
                if (this.vy > 0) {
                    if ( ((this.y + this.radius) >= paddle1.y && (this.y + this.radius) <= (paddle1.y + paddle1.height)) && this.x >= (paddle1.x + paddle1.width) ) {
                        this.respondPaddleHit();
                    } else {
                        if (this.x === 0) {
                            this.respondPaddleMiss(p2Scoreboard);
                        }
                    }
                } else {
                    if ( ((this.y - this.radius) >= paddle1.y && (this.y - this.radius) <= (paddle1.y + paddle1.height)) && this.x >= (paddle1.x + paddle1.width)) {
                        this.respondPaddleHit();
                    } else {
                        if (this.x === 0) {
                            this.respondPaddleMiss(p2Scoreboard);
                        }
                    }
                }
            }
        }
    }

    respondPaddleHit() {
        this.ballCollisionSound('paddle');
        this.vx *= -1;
    }

    respondPaddleMiss(scoreBoard) {
        this.ballCollisionSound('score');
        scoreBoard.score++;
        this.reset();
    }

    draw(context) {
        context.fillStyle = this.colour;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.closePath();
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
            this.ballCollisionSound('wall');
            this.vy *= -1;
        }

        this.x += this.vx;
        this.y += this.vy;

        this.paddleCollision(paddle1, paddle2, p1Scoreboard, p2Scoreboard);
        this.draw(context);
    }
}