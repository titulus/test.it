var myName = 'Titulus';
test.it( myName, 'Titulus' ); // pass if myName is variable with a value of 'Titulus'
test.it( 'Titulus', myName ); // equal to previous
test.done();
