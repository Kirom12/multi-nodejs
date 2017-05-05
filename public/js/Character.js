class Character
{
	constructor(id)
	{
		this.id = id;

		this.width = 50;
		this.height = 50;

		this.Position =
		{
			x : canvas.width/2,
			y : canvas.height/2
		}

		this.Velocity =
		{
			x : 0,
			y : 0
		}

		this.movementSpeed = 10;
	}

	start()
	{
		let _this = this;

		this.key =
		{
			up : new Keyboard(38),
 			down : new Keyboard(40),
 			left : new Keyboard(37),
 			right : new Keyboard(39),
 			space : new Keyboard(32)
		}

		//Movements
 		this.key.up.press = function() {
 			_this.Velocity.y = -_this.movementSpeed;
 		}
 		this.key.up.release = function() {
 			_this.Velocity.y = 0;
 		}

 		this.key.down.press = function() {
 			_this.Velocity.y = _this.movementSpeed;
 		}
 		this.key.down.release = function() {
 			_this.Velocity.y = 0;
 		}

 		this.key.left.press = function() {
 			_this.Velocity.x = -_this.movementSpeed;
 		}
 		this.key.left.release = function() {
 			_this.Velocity.x = 0;
 		}

 		this.key.right.press = function() {
 			_this.Velocity.x = _this.movementSpeed;
 		}
 		this.key.right.release = function() {
 			_this.Velocity.x = 0;
 		}
	}

	update()
	{
		let _this = this;

		socket.on('player-42', function(data){
			
			_this.Position.x = data.x;
			_this.Position.y = data.y;
		});

		this.move();
		this.render();
	}

	render()
	{
		ctx.fillStyle = 'red';
		ctx.fillRect(this.Position.x, this.Position.y, this.width, this.height);
	}

	move()
	{
		this.Position.x += this.Velocity.x;
		this.Position.y += this.Velocity.y;

		socket.emit('player-'+this.id, {
			id : this.id,
			x : this.Position.x,
			y : this.Position.y
		});
	}
}