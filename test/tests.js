var asdTest = {}
var asdGroup = {}
var asdArgs = {}
var fPass = function(s) {console.log(s,'pass')}
var fFail = function(s) {console.log(s,'fail')}
var fError = function(s) {console.log(s,'error')}
asdGroup.pass = test.group('pass',function(){
    asdTest.pass = test.it(1)
      .comment('pass to result')
      .callback(function(){fPass('passTest')},function(){fFail('passTest')},function(){fError('passTest')})
      .result();
})
  .comment('pass to result')
  .callback(function(){fPass('passGroup')},function(){fFail('passGroup')},function(){fError('passGroup')})
  .result();
asdGroup.fail = test.group('fail',function(){
    asdTest.fail = test.it(false)
      .comment('fail to result')
      .callback(function(){fPass('failTest')},function(){fFail('failTest')},function(){fError('failTest')})
      .result();
})
  .comment('fail to result')
  .callback(function(){fPass('failGroup')},function(){fFail('failGroup')},function(){fError('failGroup')})
  .result();
asdGroup.error = test.group('error',function(){
    asdTest.error = test.it()
      .comment('error to result')
      .callback(function(){fPass('errorTest')},function(){fFail('errorTest')},function(){fError('errorTest')})
      .result();
})
  .comment('error to result')
  .callback(function(){fPass('errorGroup')},function(){fFail('errorGroup')},function(){fError('errorGroup')})
  .result();
test.group('argument tests',function(){
    asdArgs.it0 = test.it().comment('pass to result').arguments();
    asdArgs.it1 = test.it('a').comment('pass to result').arguments();
    asdArgs.it2 = test.it('a','b').comment('pass to result').arguments();
});
console.log(asdTest)
console.log(asdGroup)
console.log(asdArgs);

test.group('groupname',function(){}).comment('commented group');
test.group('first level',function(){
    test.it(true).comment('test in first level');
    test.group('second level',function(){
        test.it(true).comment('test in second level');
        test.group('third level',function(){
            test.it(true).comment('test in third leve');
            test.group('last level',function(){
                test.it(true).comment('test in last level');
            });
            test.it(true).comment('test betwen 2 groups');
            test.group('last level',function(){
                test.it(true).comment('test added to last level');
            });
            test.it(true).comment('test after 2 groups');
        });
    });
});
test.group('first level')
    .group('second level')
    .group('third level')
    .group('last level',function(){
        test.it(false).comment('test added to last level last');
    });

test.group('it',function(){
  test.it( 1 ).comment('pass single');
  test.it( 0 ).comment('fail single');
  test.it( 1,0 ).comment('fail double');
  test.it( 1,1 ).comment('pass double');
  test.it( ).comment('error <1');
  test.it( 1,2,3 ).comment('error >2');
});
test.group('them',function(){
  test.them( [1,'a'] ).comment('pass');
  test.them( [1,0] ).comment('fail');
  test.them( ).comment('error <1');
  test.them( [1,'a'], 1 ).comment('error >1');
  test.them( 'asd' ).comment('error type');
});
test.group('type',function(){
  test.type( 'asd','string' ).comment('pass');
  test.type( 1,'string' ).comment('fail');
  test.type( 'asd','str' ).comment('error type');
  test.type( 1 ).comment('error <2');
  test.type( 1,2 ).comment('error not type');
  test.type( 1,'string',2 ).comment('error >2');
});
test.group('types',function(){
  test.types(['asd'],'string').comment('pass');
  test.types([1],'string').comment('fail');
  test.types(['asd','str']).comment('pass');
  test.types(['asd',1]).comment('fail');
  test.types(['asd',1],'string').comment('fail');
  test.types(1).comment('error not array');
  test.types([1]).comment('error array.length=1, no type');
  test.types(1,2).comment('error type'); 
});
test.group('error group',function(){
    a.s.d;
});

test.done();
