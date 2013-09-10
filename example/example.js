test.printer(firebugConsole);

test.it(true)
    .comment('passed test');
test.it(false)
    .comment('failed test');
test.it()
    .comment('error test');
test.group('first group',function(){
    test.it(true)
        .comment('single test');

    test.group('nested group',function(){
        test.group('deep nested group',function(){
            test.group('very deep nested group',function(){
                test.it(true)
                    .comment('another simple test');
            });
        });
    });

    throw new Error('simple error');
}).comment('consist one test, one group and one error');


test.done();