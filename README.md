test.it
===================

Simple js testing framework.

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
  + dev console API

#### Test types
  + validity of expression or value
  + equality between 2 or more values
  + constructor *(type)* of value

===

### How to install
You just need to add 
```html
<script src='path/to/testit.js'></script>
<script src='path/to/testit-firebug.js'></script>
```
to the end of  `<body>` tag. That's it!

btw you can use this construction:
```html
<!-- framework -->
<script src='./testit.js'></script>
<!-- print to firebug console -->
<script src='./testit-firebug.js'></script>
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
Русская версия [сдесь](http://titulus.github.io/testit/RU/)