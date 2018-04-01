var gpio = require('rpi-gpio');
var io = require('socnpmket.io');

var socket = io('http://localhost:9001');

var pinRead = false;

console.log('running');
 
gpio.on('change', function(channel, value) {
    if (!pinRead) {
        console.log('Channel ' + channel + ' value is now ' + value);
        if(channel == 11 && value == false) {
            socket.emit('score', {team: 'red'});
            console.log('pub score red');
        }
        if(channel == 13 && value == false) {
             socket.emit('score', {team: 'green'});
             console.log('pub score green');
        }
     pinRead = true;
     console.log('Pin read, waiting for timeout');
     setTimeout(function() {pinRead = false; console.log('ready to read');}, 5000);
    }
});
gpio.setup(37, gpio.DIR_IN, gpio.EDGE_FALLING);
gpio.setup(13, gpio.DIR_IN, gpio.EDGE_FALLING);
