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
console.log(test.trace());
var myFamily ={name:'Desiderio',cat:'google',Me:'Titulus'};
test.group('my family',function(){ // first level group
  test.it( myFamily );
  test.it( myFamily.name, 'Desiderio' );
  test.group('Me',function(){ // second level group
    test.it( myFamily.Me );
    test.it( myFamily.Me, 'Titulus' );
    test.it(a.s.d);
  });
    test.comment('I must to check myself more detail');
  test.it( myFamily.dog, 'google' ); // will fail, because myFamily has no property `dog`
});/*
var groupresult = test.group('failtests',function(){
    test.it(null);
      test.comment('comment1');
    test.it(undefined).comment('comment2');
    test.it(NaN);
    test.it(0);
    test.it(false);
    test.it(h.a.b.r);
    test.it([]);
    test.it('test',null);
    test.it('test',undefined);
    test.it('test',NaN);
    test.it('test',0);
    test.it('test',false);
    test.it('test','');
    test.it('test',[]);

}).comment('chaincomment').result();
console.log('result of group: ',groupresult);
console.log('result of this test: ',test.it(1).comment('result will displayed in console').result());
console.log('result of this test: ',test.it(NaN).comment('result will displayed in console').result());

console.error(fritstGroupOfTest);
console.log('arguments of this test: ',test.it(Infinity).comment('arguments will displayed in console').arguments());
console.log('arguments of this test: ',test.it('(:','(:').comment('arguments will displayed in console').arguments());
console.log('arguments of this test: ',test.it(1,2,3).comment('arguments will displayed in console').arguments());

console.log('deep in arguments: ',test.it({a:'asd',b:'dsa'}).arguments().a);*/
test.done();