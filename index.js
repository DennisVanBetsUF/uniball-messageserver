var gpio = require('rpi-gpio');

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883');
console.log('running'); 
client.on('connect', function () {
  console.log('connected');
  client.publish('presence', 'Hello mqtt')
})
 
gpio.on('change', function(channel, value) {
    console.log('Channel ' + channel + ' value is now ' + value);
    if(channel == 11 && value == false) {
        client.publish('score', 'red');
    }
    if(channel == 13 && value == false) {
        client.publish('score', 'green');
    }
});
gpio.setup(11, gpio.DIR_IN, gpio.EDGE_FALLING);
gpio.setup(13, gpio.DIR_IN, gpio.EDGE_FALLING);
