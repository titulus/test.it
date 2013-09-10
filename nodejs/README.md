test.it - Usage in node.js
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

## Example
```javascript
(test = require('test.it')).printer(require('test.it-nodejs'));

test.it(true)
    .comment('passed test');
test.it(false)
    .comment('failed test');
test.it()
    .comment('error test');
test.group('first group',function(){
    test.it(true)
        .comment('single test');

    test.group('nested group',function(){
        test.group('deep nested group',function(){
            test.group('very deep nested group',function(){
                test.it(true)
                    .comment('another simple test');
            });
        });
    });
}).comment('consist one test and one group');

test.done();
```
![console](https://f.cloud.github.com/assets/3748976/1114018/937bf36e-1a0d-11e3-8a37-5450efca4362.png)