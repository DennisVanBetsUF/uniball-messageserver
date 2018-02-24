var gpio = require('rpi-gpio');

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883');

var pinRead = false;

console.log('running'); 
client.on('connect', function () {
  console.log('connected');
  client.publish('presence', 'Hello mqtt')
})
 
gpio.on('change', function(channel, value) {
    if (!pinRead) {
        console.log('Channel ' + channel + ' value is now ' + value);
        if(channel == 11 && value == false) {
            client.publish('score', 'red');
            console.log('pub score red');
        }
        if(channel == 13 && value == false) {
             client.publish('score', 'green');
             console.log('pub score green');
        }
     pinRead = true;
     console.log('Pin read, waiting for timeout');
     setTimeout(function() {pinRead = false; console.log('ready to read');}, 5000);
    }
});
gpio.setup(37, gpio.DIR_IN, gpio.EDGE_FALLING);
gpio.setup(13, gpio.DIR_IN, gpio.EDGE_FALLING);
