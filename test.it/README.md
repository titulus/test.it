testit
===================

TDD testing framework.

#### Goals:
  + to use dev console instead of page DOM (in browser)
  + to avoid crashes
  + to avoid differences in results of tests of one and the same code
  + to provide the ease of use
  + to provide async testing
  + to provide particular output
  + multilevel nesting
  + chaining

#### Techniques:
  + OOP
  + Strategy pattern

#### Test types
  + validity of expression or value
  + equality between 2 or more values
  + constructor *(type)* of value

===

### Preparation
+ First: install framework and output module
    ```bash
npm install 'testit'
npm install 'testit-nodejs'
    ```

    **Hint:** *you can use [`-g`](https://npmjs.org/doc/install.html) flag to install them globally*
+ Second: add core of framework and output module, set it as default printer
    ```javascript
test = require('testit');
nodeConsole = require('testit-nodejs');
test.printer(nodeConsole);
    ```
    btw you can use this construction:
    ```javascript
(test = require('testit')).printer(require('testit-nodejs'));
    ```
    
    **Info:** *Output module is not required! You can use testit without any output at all.*

    It's repo takes place [here](https://github.com/titulus/testit-nodejs)

===

### How to use
You can find the API manual on [wiki](https://github.com/titulus/testit/wiki/API)

### Online demo
Look at it right [here](http://titulus.github.io/testit/)
Русская версия [сдесь](http://titulus.github.io/testit/RU/)