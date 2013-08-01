var Me = {name:'Titulus',lastName:'Desiderio'};
test.it( Me ); // pass if variable Me exist and consist non-false value, 'Titulus' for example
  test.comment('Am I exist?')

test.it( Me.getJob ); // will fail, because Me has no property `getJob`
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
  test.it( myFamily.dog, 'google' ); // will fail, because myFamily has no property `dog`
});

test.group('failtests',function(){
    test.it(null);
    test.it(undefined);
    test.it(NaN);
    test.it(0);
    test.it(false);
    test.it('');
    test.it([]);
    test.it('test',null);
    test.it('test',undefined);
    test.it('test',NaN);
    test.it('test',0);
    test.it('test',false);
    test.it('test','');
    test.it('test',[]);

});
test.done();