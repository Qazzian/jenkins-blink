var jenkins = require('jenkins');

var JenkinsJob = require('./jenkinsJob');


var JenkinsServer = function(options) {
	var hostname = options.hostname;
	var username = options.username;
	var apiToken = options.apiToken;
	var jenkinsConnection;

	function initConnection() {
		var basicAuthString = '';
		var jenkinsUrl = '';

		if (username && apiToken) {
			basicAuthString = username + ':' + apiToken + '@';
		}

		jenkinsUrl = 'http://' + basicAuthString + hostname;
		
		jenkinsConnection = jenkins(jenkinsUrl);
	}

	this.getJobData = function(jobName) {
		var promise = new Promise(function(resolve, reject) {
			jenkinsConnection.job.get(jobName, function(error, response){
				if (error) {
					return reject(error)
				}

				if (response) {
					resolve(response);
				}
			});
		});		
		return promise;
	};

	this.getJob = function(jobName) {
		var self = this;

		var promise = new Promise(function(resolve, reject) {
			self.getJobData(jobName).then(function(jobData) {
				resolve(new JenkinsJob(jobData, jenkinsConnection));
			}).catch(reject);
		});

		return promise;
	}

	initConnection();
};

module.exports = JenkinsServer;