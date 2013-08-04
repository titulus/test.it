testit
===================

Simple js testing framework

#### Goals:
  + to use dev console instead of page DOM
  + to avoid crashes
  + to avoid differences in results of tests of one and the same code
  + to provide the ease of use
  + multilevel nesting
  + chaining

#### Techniques:
  + OOP
  + dev console API

#### Test types
  + equality between 2 or more entities
  + non-false result of expression or entity value
  + entity existence *Not realised yet*
  + entity type *Not realised yet*

===

### How to install
You just need to add 
    
    <script src='path/to/testit.js'></script>

to the end of  `<body>` tag. That's it!

### How to use
All API are available through `test` object:

Next methods starts chain:
+ `test.it( entity||expression )` checks the expression or entity for non-false value.
+ `test.it( entity1, entity2 )` checks the equality between 2 entities.
  if entity is a function, `test.it` takes for comparison its returned value.
+ `test.them( [entity1, entity2] )` checks the equality among all entities in an array
+ `test.type( entity, 'type' )` checks the type (`function`, `object`, ...) of an entity
+ `test.types( [entity1, entity2], 'type' )` checks the equality among the types of all entities in the first argument (array), If 'type' is specified, the types of entities will be compared with it.
+ `test.group( 'groupname', function(){/*your code here*/} )` combines tests and other groups in a group. It can be called at multiple levels.
+ `test.group(groupName)` - perform nesting of groups.
Example
    ```javascript
    test.group('first group',function(){
      ...
      test.group('second group', function(){
        ...
      });
      ...
    });
    
    // add test 'additional test' to the group 'second group' in group 'first group'
    test.group('first group').group('second group',function(){
      test.it('additional test');
    });
    ```

Next methods proceed chain
+ `.comment('comment text' )` adds comment to the previous test/group.
+ `.callback( funcIfpass, funcIffail, funcIferror)` will execute funcIfpass() if test/group pass, funcIffail() if it failed, funcIferror() if it cause error.

Next methods ends chain
+ `.result()` return result of test or group
+ `.arguments()` return single or array of arguments from test (not from group!)

So you can use chains like this:
```javascript
test.it('single')
    .comment('test a simle string')
    .callback(function(){alert('test has been passed')})
    .result() // -> true
test.it('first','second')
    .comment('test two string')
    .result() // -> false

test.it('single')
    .comment('test a simple string')
    .arguments() // -> 'single'
test.it('first','second')
    .comment('test two string')
    .callback(null, function(){alert('test has been failed')})
    .arguments() // -> ['first','second']
```

Tests must be ended by
+ `test.done()` calculates the execution time for `root` group and prints the result.

Some features:

+ `test.typeof( entity )` determines the type of an entity
  It recognizes `array`, `boolean`, `date`, `error` (`evalerror`, `rangeerror`, `referenceerror`, `syntaxerror`, `typeerror`, `urierror`), `function`, `nan` & `number`, `object`, `regexp`, `string`, `window`, `dom`, `nodelist`. But can't recognize undefined vars.
+ `test.trace()` - return list *(joined by "\n")* of functions that have been performed to call the current line.