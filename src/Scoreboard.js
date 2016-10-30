export default class Scoreboard {
    constructor(context, boardWidth, offSet, alignment, game, score) {
        this.context = context;
        this.boardWidth = boardWidth;
        this.offSet = offSet;
        this.alignment = alignment;
        this.game = game;
        this.score = score;
    }

    draw() {
        const x = (this.boardWidth / 2) + this.offSet;
        const y = 10;

        if (this.score > 10) {
            this.score = 0;
            this.game++;
        }

        this.context.font = "30px Helvetica";
        this.context.textAlign = this.alignment;
        this.context.textBaseline = 'top';
        this.context.fillText(this.game + '-' + this.score, x, y);
    }

   render() {
        this.draw();
   }

   /*draw(context) {
        const x = (this.boardWidth / 2) + this.offSet;
        const y = 10;

        if (this.score > 10) {
            this.score = 0;
            this.game++;
        }

        context.font = "30px Helvetica";
        context.textAlign = this.alignment;
        context.textBaseline = 'top';
        context.fillText(this.game + '-' + this.score, x, y);
    }

   render(context) {
        this.draw(context);
   }*/
}