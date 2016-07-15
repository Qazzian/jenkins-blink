var Blink1 = require('node-blink1');

var BlinkHidApi = function(serialNumber) {
}

BlinkHidApi.devices = function() {
	return Blink1.devices();
};

BlinkHidApi.prototype = {
	fadeToRGB: function(ms, color, index) {
		var self = this;

		return new Promise(function(resolve, reject) {
			self.blinker.fadeToRGB(time, color.red(), color.green(), color.blue(), 0, function() {
				resolve();
			});
		}); 
	}
}

module.exports = BlinkHidApi;