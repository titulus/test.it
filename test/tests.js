
window.test = new testit;

var mockstack = {
    status: 'failed',
    result: {
        failed: {
            tests: 2,
            groups: 1
        },
        passed: {
            tests: 10,
            groups: 2
        },
        total: {
            tests: 12,
            groups: 3
        }
    },
    time: 5123,
    tests: [
        {
            type: 'group',
            name: 'first group',
            status: 'passed',
            result: {
                passed: {
                    tests: 4,
                    groups: 0
                }
            },
            tests: [
                {
                    type: 'test',
                    name: 'helloword'
                }
            ]
        }
    ]
}
console.log('mockstack: %o',mockstack);
var tests1=2;
var tests2=10;
var group1=2;
var group2=1;
console.time("overall");
console.group("%ctestit","color: red;");
    console.warn('%cfailed%c: %d tests in %d groups\n%cpassed%c: %d tests and %d groups','color:red;','color:inherit;',tests1,group2,'color:green;','color:inherit;',tests2,group1);
    console.group("tests");
        console.groupCollapsed("%cinit tests","color: green;");
            console.log('%cpass%c: first step\n\t%ctestit%c exist\t%o',"color: green;","color: normal;","color: blue;","color: normal;",test);
            console.log('%cpass%c: first step\n\t%ctestit%c exist\t%o',"color: green;","color: normal;","color: blue;","color: normal;",test);
            console.log('%cpass%c: first step\n\t%ctestit%c exist\t%o',"color: green;","color: normal;","color: blue;","color: normal;",test);
            console.log('%cpass%c: first step\n\t%ctestit%c exist\t%o',"color: green;","color: normal;","color: blue;","color: normal;",test);
        console.groupEnd();
        console.group("%csomthn tests","color: red;");
            console.log('%cpass%c: first step\n\t%ctestit%c exist\n\t%O',"color: green;","color: normal;","color: blue;","color: normal;",test);
            console.log('%cfail%c: check smthn\n\t%ctestthat%c not exist',"color: red;","color: normal;","color: blue;","color: normal;");

        console.groupEnd();
        console.group("%cend tests","color: green;");

        console.groupEnd();
    console.groupEnd();
    console.timeEnd("overall");
console.groupEnd();
console.log(1);

// a=true;
// testmain = test.group('~',function(){
//         console.count('level');
//     test.group('asd',function(){
        
//         console.count('level');
//     });
// });

// test.done(testmain);

// test.record('first record','some text');
// test.group('first group');
// test.record('second record','yet another text');
// test.group('second group',function(){
//     test.record('first record in second group','how can i do it?');
//     test.group('subgroup in subgroup',function(){
//         test.record('first',1);
//         test.record('second',2);
//         test.record('last',3);
//     });
// });
test.it('a',231,3,4);
test.group('test a',function(){
    test.it(a);
        test.comment('try to: a');
}); test.comment('обернул в группу, что бы отловить ошибку');
test.group('second a',function(){
    a = 1+1;
    test.it(a); test.comment('try to: a; again');
    test.it(a>5);
        test.comment('is a>5?');
    a += 4;
    test.it(a>5);
        test.comment('is a>5?');
});
test.group('objects',function(){
    a = document.createElement('div');
    test.it(a);
        test.comment('test object a')
});
test.group('two arguments',function(){
    test.it(1,2);
        test.comment('wrong value');
    test.it(1,1);
        test.comment('same value');
    test.it(1+1,2);
        test.comment('values');
});
test.done();
