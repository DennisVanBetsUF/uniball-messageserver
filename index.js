var gpio = require('rpi-gpio');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var pinRead = false;

console.log('starting...');
 
gpio.on('change', function(channel, value) {
    if (!pinRead) {
        console.log('Channel ' + channel + ' value is now ' + value);
        if(channel == 11 && value == false) {
            io.emit('score', {team: 'red'});
            console.log('pub score red');
        }
        if(channel == 13 && value == false) {
             io.emit('score', {team: 'green'});
             console.log('pub score green');
        }
     pinRead = true;
     console.log('Pin read, waiting for timeout');
     setTimeout(function() {pinRead = false; console.log('ready to read');}, 5000);
    }
});
gpio.setup(37, gpio.DIR_IN, gpio.EDGE_FALLING);
gpio.setup(13, gpio.DIR_IN, gpio.EDGE_FALLING);

app.get('/', function(req, res){
    res.send('<h1>Message server</h1>');
});

io.on('connection', function(socket){
    console.log('a socket connected');
});

http.listen(9001, function(){
    console.log('listening on *:9001');
});
