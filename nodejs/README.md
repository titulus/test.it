testit - Usage in node.js
===================

## Install
```
# install core
npm install test.it

# install nodejs output module
npm install test.it-nodejs
```

## Preparation
include testit core and output module
```javascript
test = require('test.it');
test.printer(require('test.it-nodejs'));
```
or shorter
```javascript
(test = require('test.it')).printer(require('test.it-nodejs'));
```

include your module for testing
```javascript
myModule = require('path/to/myModule.js');
```
Test!

## How to use
You can find the API manual on [wiki](https://github.com/titulus/testit/wiki/API)