testit
===================

Simple js testing framework

#### Goals:
  + to use dev console instead of page DOM
  + to avoid crashes
  + to avoid differences in results of tests of one and the same code
  + to provide the ease of use
  + to provide async testing
  + to provide particular output
  + multilevel nesting
  + chaining


#### Techniques:
  + OOP
  + dev console API

#### Test types
  + equality between 2 or more values
  + non-false result of expression or value
  + type of value

===

### How to install
You just need to add 
```html
<script src='path/to/testit.js'></script>
```
to the end of  `<body>` tag. That's it!

btw you can use this construction:
```html
<!-- framework -->
<script src='../testit.js'></script>
<!-- your script -->
<script src='./script.js'></script>
<!-- your tests -->
<script src='./tests.js'></script>
<!-- a trick to not worry about the call of test.done() -->
<script>test.done();</script>
```

===

### How to use
You can find the API manual on [wiki](https://github.com/titulus/testit/wiki/API)

### Example
Look at it right [here](http://titulus.github.io/testit/) 
