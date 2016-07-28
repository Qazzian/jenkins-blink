var Blink1 = require('node-blink1');

var BlinkHidApi = function(serialNumber) {
	this.blinker = new Blink1(serialNumber);
}

BlinkHidApi.devices = function() {
	return Blink1.devices();
};

BlinkHidApi.prototype = {
	fadeToRGB: function(ms, color, ledSide) {
		var self = this;

		return new Promise(function(resolve, reject) {

			self.blinker.fadeToRGB(ms || 0, color.red(), color.green(), color.blue(), ledSide, function() {
				resolve();
			});
		});
	}
}

module.exports = BlinkHidApi;