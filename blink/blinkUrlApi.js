var http = require('http');

var BlinkUrlApi = function() {
	var hostname = 'localhost';
	var port = '8934';

	this.fadeToRGB = function(ms, color, ledSide) {
		var hexCode = encodeURIComponent(color.hexString());
		var requestSettings = {
			host: hostname,
			port: port,
			path: '/blink1/fadeToRGB?rgb=' + hexCode// + '&time=' + ms.toString() // + '&ledn=' + ledSide
		}

		return new Promise(function(resolve, reject) {
			var request = http.request(requestSettings, function(response){
				var str = '';
				response.on('data', function (chunk) {
					str += chunk;
				});
				response.on('end', function(){
					resolve(str);
				});
			});

			request.on('error', function(err){
				console.error('ERROR setting blink color: ', err);
				reject();
			});
			request.end();
		});
	};
}

module.exports = BlinkUrlApi;