var Blink1 = require('node-blink1');

var devices = Blink1.devices(); // returns array of serial numbers

var blink1 = null;

if( devices.length ) {
	console.log(devices);
    blink1 = new Blink1();
}

var lastColor = '#000000';
var lastTime = 0;
var lastLedn = 0;
var lastRepeats = 0;
