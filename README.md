test.it
===================

TDD testing framework.

*Availible in nodejs*

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

### How to install
There are some differences between usage **test.it** in different environment like browser or nodejs.

## Browser
+ First: add core of framework
  ```html
  <script src='path/to/test.it.js'></script>
  ```

+ Next: add output strategy and set `firebugConsole` as default printer 
  ```html
  <script src='path/to/test.it-firebug.js'></script>
  <script>test.printer(firebugConsole);</script>
  ```
  Of course you can include `test.printer(firebugConsole);` in your tests script.

**Hint:** *add `<script>` tags to the end of your `<body>` tag.*

btw you can use this construction:
```html
<!-- framework -->
<script src='./test.it.js'></script>
<!-- print to firebug console -->
<script src='./test.it-firebug.js'></script>
<!-- set firebugConsole as default printer  -->
<script>test.printer(firebugConsole);</script>
<!-- your script -->
<script src='./script.js'></script>
<!-- your tests -->
<script src='./tests.js'></script>
<!-- a trick to not worry about the call of test.print() -->
<script>test.print();</script>
```

### Nodejs
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
