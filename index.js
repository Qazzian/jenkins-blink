#! /usr/bin/env node

var CONFIG = require('./config');
var JenkinsServer = require('./jenkins/JenkinsServer');
var BlinkController = require('./blink/blink');
var Bridge = require('./lib/bridge');

var bridge = new Bridge(CONFIG, JenkinsServer, BlinkController);
var intervalId;


bridge.init();

function main() {
	bridge.showJobStatus('develop-hybris-ci');
}

function cleanUp() {
	clearInterval(intervalId);
	bridge.cleanUp();
}

process.on('exit', cleanUp);
process.on('SIGTERM', cleanUp);
process.on('SIGINT', cleanUp);

main();
intervalId = setInterval(main, 10000);

