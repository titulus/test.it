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