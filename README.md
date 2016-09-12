# jenkins-blink
Connect [jenkins](https://jenkins.io/) to thingM's [blink1](https://blink1.thingm.com/)

## Dependancies
You will need 
* a recent version of [Nodejs](https://nodejs.org)
* a blink1 device https://blink1.thingm.com/buy/

## Install

Clone this repository
    $ git clone  git://github.com/Qazzian/jenkins-blink/

Install dependencies
    $ cd jenkins-blink
    $ npm install

## Global Install

This is not yet packaged with npm.
for now, follow the install instructions above and then, from the jenkins-blink dir, run
	$ npm link

You will then be able to run `jenkins-blink` from anywhere in the terminal
    
## Setup your config

Open up config.js in a text editor
you will need to edit the jenkins section

	jenkins: {
		hostname: '[The hostname of your jenkins server]', 
		username: '[Your jenkins user name]', 
		apiToken: '[Your api token]'
	}

`hostname` is the domain name you use to login to your jenkins server. Do not include the protocol or any slashes. e.g. "jenkins.example.com"
`username` Your jenkins user Id. to find it log in to Jenkins and click your name in the header. The jenkins user id will be listed)
`apiToken` From the page where you got your user id click 'configure' in the left hand menu and then 'Show API Token' copy and paste this into this field.

The jenkins job name is curently hard coded in index.js so you will need to change that as well.

## Running the app

from the jenkins-blink directory just run 
    $ ./index.js

If you followed the Global Install instructions then just run jenkins-blink in a terminal window
    
The app runs on a setInterval so it will just carry on polling Jenkins until you kill it. 
The default is to poll every minute.

The blink will change colour to match the build status of the jenkins job.

## Rough todo list

* Move the job name into config.
* Support more than one job.
* Create a proper config file and management system.
* Support multiple effects on the blink such as flashing or fading off after a time.
* Show a different colour if you are responsible for build failure.

## Support and known issues

I have only tested this on OSX and nodejs v5.7.1

The connection to the blink1 is different depending on whether the blink1Control app is open or not.
If you start the this script and then open/quit the control app then the script will lose the connection and you will need to restart the script.
    
