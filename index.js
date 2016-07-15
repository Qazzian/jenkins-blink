#! /usr/bin/env node

var CONFIG = require('./config');
var JenkinsServer = require('./jenkins/JenkinsServer');
var BlinkController = require('./blink/blink');
var Bridge = require('./lib/bridge');

var bridge = new Bridge(CONFIG, JenkinsServer, BlinkController);
bridge.init();
	