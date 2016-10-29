export default class Scoreboard {
   constructor(x, y, alignment) {
      this.x = x;
      this.y = y;
      this.alignment = alignment;
      this.score = '00';
   }

    draw(context) {
        context.font = "30px Helvetica";
        context.textAlign = this.alignment;
        context.textBaseline = 'top';
        context.fillText(this.score, this.x, this.y);
    }

   render(context) {
        this.draw(context);
   }
}