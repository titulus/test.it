var Me = {name:'Titulus',lastName:'Desiderio'};

function getMyFamilyName(from) {
  return from.lastName;
}
test.it( 0 ).comment('fail test');
test.it( 1 ).comment('pass test');
test.it( 1,0 ).comment('fail test');
test.it( 1,1 ).comment('pass test');
test.them( [1,'a',true,window] ).comment('pass test them');
test.them( [1,0] ).comment('fail test them');
test.them( 'asd' ).comment('error test them');
test.type('asd','string').comment('pass test type');
test.type(1,'string').comment('fail test type');
test.type('asd','str').comment('fail test type');
test.type(1).comment('error test type');
test.type(1,2).comment('error test type');
test.types(['asd'],'string').comment('pass test types');
test.types([1],'string').comment('fail test types');
test.types(['asd','str']).comment('pass test types');
test.types(1).comment('error test types');
test.types([1]).comment('error test types');
test.types(1,2).comment('error test types');
// console.log(test.trace());
var myFamily ={name:'Desiderio',cat:'google',Me:'Titulus'};
test.group('my family',function(){ // first level group
  test.it( myFamily ).comment('test before');
  test.group('groupname',function(){
    test.it( myFamily.Me ).comment('first contrl test');
  }).comment('group devided into 3 parts');
  var asd = test.it( myFamily.name, 'Desiderio' ).comment('test between').arguments();
  // console.l og(asd);
  var asd = test.group('groupname',function(){ // second level group
    test.it( myFamily.Me ).comment('second contrl test');
  }).arguments();
  // console.log(asd);
});
test.it( myFamily.name, 'Desiderio' ).comment('test between outer groups').arguments();

// console.log(test.group('my family'));
test.group('my family').group('groupname',function(){
      test.it( myFamily.Me,'ASDDS' )
          .callback(null, null, function(){console.log('callback',3)})
          .comment('third contrl test');
      // asd.a.d;
    });
test.group('my family').comment('comment added outer');
/*
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