export default class Board {
    constructor(context, boardHeight, boardWidth) {
        this.context = context;
        this.boardHeight = boardHeight;
        this.boardWidth = boardWidth;
    }

    drawLine() {
        this.context.fillStyle = 'white';
		this.context.setLineDash([10, 10]);
		this.context.beginPath();
		this.context.moveTo(this.boardWidth / 2, 0);
		this.context.lineTo(this.boardWidth / 2, this.boardHeight);
		this.context.strokeStyle = "white";
		this.context.stroke();
   }

   drawBoard() {
	   //context.fillStyle = 'red';
	   //context.fillRect(0, 0, this.boardWidth, this.boardHeight)
       this.context.clearRect(0, 0, this.boardWidth, this.boardHeight);
	   this.drawLine(this.context);
   }

    render() {
        this.drawBoard();
   }

   /*constructor(boardHeight, boardWidth) {
        this.boardHeight = boardHeight;
        this.boardWidth = boardWidth;
    }

    drawLine(context) {
        context.fillStyle = 'white';
		context.setLineDash([10, 10]);
		context.beginPath();
		context.moveTo(this.boardWidth / 2, 0);
		context.lineTo(this.boardWidth / 2, this.boardHeight);
		context.strokeStyle = "white";
		context.stroke();
   }

   drawBoard(context) {
	   //context.fillStyle = 'red';
	   //context.fillRect(0, 0, this.boardWidth, this.boardHeight)
       context.clearRect(0, 0, this.boardWidth, this.boardHeight);
	   this.drawLine(context);
   }

    render(context) {
        this.drawBoard(context);
   }*/
}