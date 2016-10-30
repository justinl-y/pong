export default class Scoreboard {
   constructor(boardWidth, offSet, alignment, game, score) {
      this.boardWidth = boardWidth;
      this.offSet = offSet;
      this.alignment = alignment;
      this.game = game;
      this.score = score;
   }

    draw(context) {
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
   }
}