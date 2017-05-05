var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
	console.log('a user connected');
	console.log(socket.id);

	socket.send(socket.id);

	//Get the message
	socket.on('chat message', function(msg){
		console.log(msg.pseudo + ' : ' + msg.message);

		io.emit('chat message', msg);
	});

	//Get player position
	socket.on('player-42', function(player){
		//console.log(player.id + " | x:" + player.x + " y:" + player.y);

		io.emit('player-' + player.id, {
			id : player.id,
			x : player.x,
			y : player.y
		});
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});