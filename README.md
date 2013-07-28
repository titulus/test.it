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
+ `test.group('groupname',function(){/*your code here*/})` - combines tests and other groups in group. can be called multiple levels.
+ `test.comment('comment text')` - add comment for previous test or group.
+ `test.done()` - calculate time for `root` group and print result.

**Not realised yet**
+ `test.them( [entity1, entity2] )` check equality between all entities in array
+ `test.type( entity, 'type' )` - check type (`function`, `object`, ...) of entity
+ `test.types( [entity1, entity2], 'type' )` - check equality between types of all entities in first argument (array), If 'type' specified - types of entities will compare with it.
+ `test.time( entity )` - print time spended on performing entity (commonly function)

some examples:
    
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

      test.it( getMyFamilyName(Me), 'Desiderio' ); // pass if myFunction() return 'myReturn'
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

### Results
Results of the tests will be placed in dev console.

There will be single object **(or set of objects)**