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
All API is available through `testit` object:

+ `test.it( entity )` - check existance of entity:
+ `test.it( entity1, entity2 )` - check equality between 2 entities.
  
  if entity is function - `testit` takes it's returned value for comparison.
+ `test.it( [entity1, entity2] )` check equality between all entities in array
+ `test.type( entity, 'type' )` - check type (`function`, `object`, ...) of entity
+ `test.types( [entity1, entity2] )` - check equality between types of all entities in array

Some other stuff

+ `test.time( entity )` - print time spended on performing entity (commonly function)

some examples:
    
    test.it( Me ); // pass if variable Me exist
    
    test.it( Me.getJob ); // pass if Me exist and has property getJob (even if getJob is a function)
    
    test.it( myName, 'Titulus' ); // pass if myName is variable with a value of 'Titulus'
    test.it( 'Titulus', myName ); // equal to previous
    
    test.it( getMyFamilyName(), 'Desiderio' ); // pass if myFunction() return 'myReturn'
    
    test.it( [mySurname, mySisterSurname, myMotherSurname, myFatherSurname, 'Desiderio', getMyFamilyName()] );
    // pass if all of entities in the transmitted array contains or returns 'Desiderio'
    
    test.type( myName, 'string' ); // pass if myName is string value
    test.type( getMyFamilyName, 'function' ); // pass if getMyFamilyName is function
    test.type( getMyFamilyName(), 'string' ); // pass if getMyFamilyName return string
    
    test.types( [mySurname, mySisterSurname, myMotherSurname, myFatherSurname, 'Desiderio', getMyFamilyName()] );
    // pass if all entities in the transmitted array contains or returns values of the same type

### Results
Results of the tests will be placed in dev console.

There will be single object **(or set of objects)**