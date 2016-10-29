export default class Scoreboard {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      this.score = 0;
   }

    draw(context) {
        context.font = "30px Helvetica";
        context.fillText(this.score, this.x, this.y);
    }

   render(context) {
        this.draw(context);
   }
}