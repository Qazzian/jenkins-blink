

var JenkinsJob = function(jobData, jenkinsConnection) {
	this.connection = jenkinsConnection;
	this._data = jobData;
	this.name = jobData.name;
}

JenkinsJob.prototype = {

	getBuildStatus: function() {
		var stauts = '';
		var color = this._data.color;

		if (color.match(/^blue/)) {
			status = 'success';
		}
		else if (color.match(/^red/)) {
			status = 'broken';
		}
		else if (color.match(/^yellow/)) {
			status = 'warning';
		}

		return status;
	},

	getLastBuildData: function() {
		var promise = new Promise(function(resolve, reject){
			var buildNumber = this._data.lastBuild && this._data.lastBuild.number;

			if (buildNumber) {
				this.connection.build.get(this.name, buildNumber, function(error, buildData) {
					if (error) {
						reject(error);
					}
					else {
						resolve(buildData);
					}
				});
			}
		});
	}
}

module.exports = JenkinsJob;