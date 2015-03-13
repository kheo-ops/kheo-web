# kheo-web
[![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)

## Overview
Web frontend for Kheo project. 

This UI offers a user friendly way to manage servers and visualize their events via a timeline. 

It is developed with Twitter Bootstrap and AngularJS.

## Building and running
Grunt is used to manage javascript build : `npm install -g grunt-cli`.
Bower is used to managed project dependencies : `npm install -g bower`

Development and test dependencies are defined in package.json file like jasmine or grunt plugins, let's install them : `npm install`
Project dependencies are defined in bower.json file like angular or bootstrap, install them too : `bower install`

Now, we can connect the frontend to a backend API. To do this, edit the file `config/development.json` and enter the url of your backend API.

Then, your are ready to launch the webapp running the followings commands:
```
grunt replace:development
grunt serve
```

Tests can be run with `grunt karma:unit` and `grunt test`.
Code conventions can be verified with `grunt jshint` command.

Feel free to contribute :)