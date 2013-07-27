
test.it('a');
test.group('second a',function(){
    a = 1+1;
    test.it(a); test.comment('try to: a;');
    test.it(a>5);
        test.comment('is a>5?');
    a += 4;
    test.it(a>5);
        test.comment('is a>5?');
});
test.it(1,2,3,4);
var asd = function() {
    for (i=1;i<10000000;i++) {var s = 'asd'; s+='dsa'; s=12; delete s;}
    return i;
}
test.group('longtest',function(){
    test.it(asd());
})
test.group('objects',function(){
    a = document.createElement('div');
    test.it(a);
        test.comment('test object a');
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
