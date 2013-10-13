test.it
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
npm install 'test.it'
npm install 'test.it-nodejs'
    ```

    **Hint:** *you can use [`-g`](https://npmjs.org/doc/install.html) flag to install them globally*
+ Second: add core of framework and output module, set it as default printer
    ```javascript
test = require('test.it');
nodeConsole = require('test.it-nodejs');
test.printer(nodeConsole);
    ```
    btw you can use this construction:
    ```javascript
(test = require('test.it')).printer(require('test.it-nodejs'));
    ```
    
    **Info:** *Output module is not required! You can use test.it without any output at all.*

    It's repo takes place [here](https://github.com/titulus/test.it-nodejs)

===

### How to use
You can find the API manual on [wiki](https://github.com/titulus/test.it/wiki/API)

### Online demo
Look at it right [here](http://titulus.github.io/test.it/)
Русская версия [сдесь](http://titulus.github.io/test.it/RU/)