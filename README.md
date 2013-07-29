testit
===================

Simple js testing framework

## *!in progress now!*


#### Goal:
  + use dev console instead of page DOM
  + avoid dying
  + avoid difference in results during testing the same code
  + simple to use
  + multilevel nesting
  + help messages

#### Techniques:
  + OOP
  + dev console API

#### Test types
  + equality between 2 or more entities
  + non-fail result of expression or entity
  + existance of entity *Not realised yet*
  + type of entity *Not realised yet*

===

### How to install
You only need to add 
    
    <script src='path/to/testit.js'></script>

in bottom of your `<body>` tag. Thats it!

### How to use
All API is available through `test` object:

+ `test.it( entity||expression )` - check expression or entity for no-false value.
+ `test.it( entity1, entity2 )` - check equality between 2 entities.
  if entity is function - `test.it` takes it's returned value for comparison.
+ `test.group( 'groupname', function(){/*your code here*/} )` - combines tests and other groups in group. can be called multiple levels.
+ `test.comment('comment text' )` - add comment for previous test or group.
+ `test.done()` - calculate time for `root` group and print result.

Some features:

+ `test.typeof( entity )` - determinate type of entity
  recognizes `array`, `boolean`, `date`, `error` (`evalerror`, `rangeerror`, `referenceerror`, `syntaxerror`, `typeerror`, `urierror`), `function`, `nan` & `number`, `object`, `regexp`, `string`, `window`, `dom`, `nodelist`.

**Not realised yet**
+ `test.them( [entity1, entity2] )` check equality between all entities in array
+ `test.type( entity, 'type' )` - check type (`function`, `object`, ...) of entity
+ `test.types( [entity1, entity2], 'type' )` - check equality between types of all entities in first argument (array), If 'type' specified - types of entities will compare with it.
+ `test.time( entity )` - print time spended on performing entity (commonly function)

some examples:
```javascript
var Me = {name:'Titulus',lastName:'Desiderio'};
test.it( Me ); // pass if variable Me exist and consist non-false value, 'Titulus' for example
  test.comment('Am I exist?')

test.it( Me.getJob ); // pass if Me exist and has property getJob
  test.comment('Everybody always told me to get a job');

test.it( Me.name, 'Titulus' ); // pass if myName is variable with a value of 'Titulus'
test.it( 'Desiderio', Me.lastName ); // equal to previous

function getMyFamilyName(from) {
  return from.lastName;
}

test.it( getMyFamilyName(Me), 'Desiderio' ); // pass if getMyFamilyName(Me) return 'Desiderio'
  test.comment('did i write getMyFamilyName() right?');

var myFamily ={name:'Desiderio',cat:'google',Me:'Titulus'};
test.group('my family',function(){ // first level group
  test.it( myFamily );
  test.it( myFamily.name, 'Desiderio' );
  test.group('Me',function(){ // second level group
    test.it( myFamily.Me );
    test.it( myFamily.Me, 'Titulus' );
  });
    test.comment('I must to check myself more detail');
  test.it( myFamily.dog, 'google' );
});
test.done();
```

### Results
Results of the tests will be placed in dev console.

In Google Chrome it will be shown like this:
![](http://habrastorage.org/storage2/dfd/5b6/9a0/dfd5b69a0ff3a3e2296a64bb71eff0b5.png)

Groups and tests collapsed if passed and expanded otherwise. If you expand every test and group it will be shown this like:
![](http://habrastorage.org/storage2/c82/ef2/b35/c82ef2b353ba1e3efcc997863116a0d4.png)

The same in Firebug:
![](http://habrastorage.org/storage2/fd4/78b/76b/fd478b76b810cd9f0ccaf3fe53a13e5b.png)
![](http://habrastorage.org/storage2/fe8/463/568/fe84635684a108368ae49a39964c5a0a.png)
