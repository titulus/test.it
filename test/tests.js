var testit = {
    '_first failed': 'test which failed',
    'passed': 10,
    'failed': 2,
    'tests': {
        'initial' : {
            'passed': 10,
            'failed': 2,
            'tests' : [
                {'passed':this},
                {'failed':'aaa'},
                {'passed':'dsa'}
            ]
        }
    }
}
var tests1=2;
var tests2=10;
var group1=2;
var group2=1;
console.log('first');
console.time("overall");
console.group("%ctestit","color: green;");
    console.info('%cpassed%c: %d tests in %d groups','color:green;','color:inherit;',(tests1+tests2),(group1+group2));
    console.timeEnd("overall");
console.groupEnd();
console.log(' ');
console.log('second');
console.time("overall");
console.group("%ctestit","color: red;");
    console.warn('%cfailed%c: %d tests in %d groups\n%cpassed%c: %d tests and %d groups','color:red;','color:inherit;',tests1,group2,'color:green;','color:inherit;',tests2,group1);
    console.group("tests");
        console.groupCollapsed("%cinit tests","color: green;");
            console.log('%cpass%c: first step\n\t%ctestit%c exist\t%o',"color: green;","color: normal;","color: blue;","color: normal;",testit);
            console.log('%cpass%c: first step\n\t%ctestit%c exist\t%o',"color: green;","color: normal;","color: blue;","color: normal;",testit);
            console.log('%cpass%c: first step\n\t%ctestit%c exist\t%o',"color: green;","color: normal;","color: blue;","color: normal;",testit);
            console.log('%cpass%c: first step\n\t%ctestit%c exist\t%o',"color: green;","color: normal;","color: blue;","color: normal;",testit);
        console.groupEnd();
        console.group("%csomthn tests","color: red;");
            console.log('%cpass%c: first step\n\t%ctestit%c exist\t%o',"color: green;","color: normal;","color: blue;","color: normal;",testit);
            console.log('%cfail%c: check smthn\n\t%ctestthat%c not exist',"color: red;","color: normal;","color: blue;","color: normal;");

        console.groupEnd();
        console.group("%cend tests","color: green;");

        console.groupEnd();
    console.groupEnd();
    console.timeEnd("overall");
console.groupEnd();