var process = require('process');


function Bridge(config, jenkinsConnector, blinkConnector) {
	var blinker;
	var jServer;
	var previousStatus = '';

	function connectToBlink() {
		try {
			blinker = new blinkConnector();
			console.info('connected to blinker');
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

	this.showJobStatus = function(jobName) {
		jServer.getJob(jobName).then(function(job) {
			var status = job.getBuildStatus();
			var isBuilding = job.isBuilding();
			console.log('Job status: ', status);

			if (status === previousStatus) {
				// do nothing
			}
			else if (config.colors[status]) {
				previousStatus = status;
				blinker.setColour(config.colors[status], 500);
			}
			else {
				blinker.setColour(config.colors.stopped, 100);
				previousStatus = '';
			}

		}).catch(function(error) {
			previousStatus = 'error';
			console.error('ERROR connecting to Jenkins server: ', error.message);
			console.error(error.stack);
			blinker.setColour(config.colors.connectionError, 100);
		});
	};

	this.init = function() {
		var blinker = connectToBlink();
		var jServer = connectToJenkins();
	}

	this.cleanUp = function(){
		return blinker.setColour(config.colors.off, 0);
	}

}

module.exports = Bridge;