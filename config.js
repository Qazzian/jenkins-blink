
var Color = require('color');

module.exports = {
	colors: {
		off: new Color('#000000'),
		broken: new Color('#ff0000'),
		success: new Color('#0000ff'),
		warning: new Color('#ffff00'),
		connected: new Color('#BA7DE9'),
		stopped: new Color('#888888'),
		connectionError: new Color('#ffffff')
	},
	jenkins: {
		hostname: '', 
		username: '', 
		apiToken: ''
	}
}