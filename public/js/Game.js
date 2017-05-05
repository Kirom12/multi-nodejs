class Game
{
	constructor(){}

	static init()
	{
		console.log('Game init');

		this.currentPlayerId = Math.round(Math.random()*10000);

		this.playerOne = new Character(42);

		this.playerOne.start();

		Game.gameLoop();
	}

	static gameLoop()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		Game.play();

		requestAnimationFrame(Game.gameLoop);
	}

	static play()
	{
		this.playerOne.update();
	}
}