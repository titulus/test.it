function run (code) {
    console.clear();
    test.exclude.group('root',function(){
        code();
    }).done();
}

function process (code) {
    var name = code.name;
    var element = document.getElementById(name);
    var text = code.toString().split('\n');
    text.pop();
    text.shift();
    text = text.join('\n');
    element.onclick=function(){run(code)};
    element.innerHTML = text;
}

function init () {
    console.info('root, groups and tests are expandable');
    test.group('hello',function(){
        test.it(true)
            .comment('to see how');
        test.it({a:1,b:2},{a:1,b:2})
            .comment('it works');
    }).comment(' click on code examples');
}
run(init);