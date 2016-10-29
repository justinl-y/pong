export default class Scoreboard {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      this.score = 0;
   }

    draw(context) {
        context.font = "30px Helvetica";
        context.fillText(this.x, this.y, this.score);
    }

   render(context) {
        this.draw(context);
   }
}