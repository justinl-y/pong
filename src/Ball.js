export default class Ball {
    constructor(context, boardHeight, boardWidth, colour, initialVY, initialVX, initialSpeed) {
        this.context = context;
        this.boardHeight = boardHeight;
        this.boardWidth = boardWidth;
        this.colour = colour;
        this.initialVY = initialVY;
        this.initialVX = initialVX;
        this.speed = initialSpeed;

        this.vy = Math.floor(Math.random() * 6 - 3); 
        this.vx = this.initialVY; //(7 - Math.abs(this.vy)); 
        this.y = this.boardHeight / 2;
        this.x = this.boardWidth / 2;
        this.radius = 4;
    }

    reset() {
        //this.speed *= 0.5;

        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;
        this.vy = Math.floor(Math.random() * 12 - 6);
        this.vx = this.initialVY; //(7 - Math.abs(this.vy));
        
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
    paddleCollision(p1Scoreboard, p2Scoreboard, paddle1, paddle2) {
        if (this.vx > 0) {
            // going right

            // determine if ball at or past right paddle's' left edge
            const inRightEnd = (this.x + this.radius) >= paddle2.x;

            // if past right paddle reverse x direction if paddle hit. Score if not
            if (inRightEnd) {

                //going up
                if (this.vy > 0) {
                    if ( ((this.y + this.radius) >= paddle2.y && (this.y + this.radius) <= (paddle2.y + paddle2.paddleHeight)) && this.x <= paddle2.x ) {
                        this.respondPaddleHit();
                    } else {
                        if (this.x >= this.boardWidth) {
                            this.respondPaddleMiss(p1Scoreboard);
                        }
                    }
                } else {
                    if ( ((this.y - this.radius) >= paddle2.y && (this.y - this.radius) <= (paddle2.y + paddle2.paddleHeight)) && this.x <= paddle2.x ) {
                        this.respondPaddleHit();
                    } else {
                        if (this.x >= this.boardWidth) {
                            this.respondPaddleMiss(p1Scoreboard);
                        }
                    }
                }
            }
        } else {
            // going left

            // determine if ball is at or past left paddle right edge
            const inLeftEnd = (this.x - this.radius) <= paddle1.x + paddle1.paddleWidth;

            // if past left paddle reverse x direction
            if (inLeftEnd) {
                // going up
                if (this.vy > 0) {
                    if ( ((this.y + this.radius) >= paddle1.y && (this.y + this.radius) <= (paddle1.y + paddle1.paddleHeight)) && this.x >= (paddle1.x + paddle1.paddleWidth) ) {
                        this.respondPaddleHit();
                    } else {
                        if (this.x <= 0) {
                            this.respondPaddleMiss(p2Scoreboard);
                        }
                    }
                } else {
                    if ( ((this.y - this.radius) >= paddle1.y && (this.y - this.radius) <= (paddle1.y + paddle1.paddleHeight)) && this.x >= (paddle1.x + paddle1.paddleWidth)) {
                        this.respondPaddleHit();
                    } else {
                        if (this.x <= 0) {
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

    draw() {
        this.context.fillStyle = this.colour;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.context.fill();
        this.context.closePath();
    }

    render(p1Scoreboard, p2Scoreboard, paddle1, paddle2) {
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

        this.paddleCollision(p1Scoreboard, p2Scoreboard, paddle1, paddle2);
        this.draw();
    }
}