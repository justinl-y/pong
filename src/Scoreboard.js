export default class Scoreboard {
   constructor(boardWidth, offSet, alignment, score) {
      this.boardWidth = boardWidth;
      this.offSet = offSet;
      this.alignment = alignment;
      this.score = score;
   }

    draw(context) {
        const x = (this.boardWidth / 2) + this.offSet;
        const y = 10;

        context.font = "30px Helvetica";
        context.textAlign = this.alignment;
        context.textBaseline = 'top';
        context.fillText(this.score, x, y);
    }

   render(context) {
        this.draw(context);
   }
}