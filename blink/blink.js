var BlinkHidApi = require('./blinkHidApi');
var BlinkUrlApi = require('./blinkUrlApi');

var Blinker = function(serialNumber) {
	try {
		var devices = Blinker.devices();
		serialNumber = serialNumber || devices[0];
		
		this.blinker = new BlinkHidApi(serialNumber);
	}
	catch (error) {
		this.blinker = new BlinkUrlApi();
	}
};

Blinker.devices = function(){
	return BlinkHidApi.devices();
}

Blinker.prototype = {
	setColour: function(color, time, ledSide) {
		var self = this;
		time = time || 0;
		ledSide = ledSide || 0;
		return self.blinker.fadeToRGB(time, color, ledSide);
	}
};

module.exports = Blinker;