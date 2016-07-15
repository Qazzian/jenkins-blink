var process = require('process');


function Bridge(config, jenkinsConnector, blinkConnector) {
	var blinker;
	var jServer;

	function connectToBlink() {
		try {
			blinker = new blinkConnector();
			blinker.setColour(config.colors.connected, 0);
			console.log('connected to blinker');
		}
		catch (blinkerError) {
			console.error('ERROR conneting to blinker: ', blinkerError.message);
			console.error(blinkerError.stack);
			process.exit();
		}

		return blinker;
	}

	function connectToJenkins() {
		try {
			jServer = new jenkinsConnector(config.jenkins);
		}
		catch (jenkinsError) {
			console.error('ERROR conneting to Jenkins server: ', jenkinsError.message);
			process.exit();
		}
		return jServer;
	}

	function showJobStatus(jobName) {
		jServer.getJob(jobName).then(function(job) {
			var status = job.getBuildStatus();
			console.log('Job status: ', status);

			if (config.colors[status]) {
				blinker.setColour(config.colors[status], 500);
			}
			else {
				// process.stdout.write('#888888');
				blinker.setColour(config.colors.stopped, 100);
			}
			// process.stdout.write('\n');

		}).catch(function(error) {
			console.error('ERROR connecting to Jenkins server: ', error.message);
			console.error(error.stack);
			blinker.setColour(100, 0, 0, 0);
		});
	}

	this.init = function() {
		var blinker = connectToBlink();
		var jServer = connectToJenkins();
		showJobStatus('develop-hybris-ci');
	}

}

module.exports = Bridge;