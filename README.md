testit
===================

Simple js testing framework

## *!in progress now!*


#### Goal:
  + use dev console instead of page DOM
  + avoid dying
  + avoid difference in results during testing the same code
  + simple to use

#### Techniques:
  + OOP
  + dev console API
  + no changes in tests sequence

#### Test types
  + equality between 2 or more entities
  + existance of entity
  + type of entity

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
+ `test.group('groupname',function(){/*your code here*/})` - combines tests and other groups in group. can be called multiple levels.
+ `test.done()` - calculate time for `root` group and print result.

**Not realised yet**
+ `test.them( [entity1, entity2] )` check equality between all entities in array
+ `test.type( entity, 'type' )` - check type (`function`, `object`, ...) of entity
+ `test.types( [entity1, entity2], 'type' )` - check equality between types of all entities in first argument (array), If 'type' specified - types of entities will compare with it.
+ `test.time( entity )` - print time spended on performing entity (commonly function)

some examples:
    
    test.it( Me ); // pass if variable Me exist and consist non-false value, 'Titulus' for example
    
    test.it( Me.getJob ); // pass if Me exist and has property getJob
    
    test.it( myName, 'Titulus' ); // pass if myName is variable with a value of 'Titulus'
    test.it( 'Titulus', myName ); // equal to previous
    
    test.it( getMyFamilyName(), 'Desiderio' ); // pass if myFunction() return 'myReturn'

    test.group('my family',function(){ // first level group
      test.it( myFamily );
      test.it( myFamily.name, 'Desiderio' );
      test.group('my family',function(){ // second level group
        test.it( myFamily.Me );
        test.it( myFamily.Me, 'Titulus' );
        test.it( myFamily.myDog, 'google' );
      });
    });

### Results
Results of the tests will be placed in dev console.

There will be single object **(or set of objects)**