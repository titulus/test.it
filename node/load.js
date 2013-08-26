process.stdout.write("loading env ...");

var util = require('util');
global.util = util;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

for (i=2; i<process.argv.length; i++){
    if (process.argv[i] == '--emulate-window'){
        //load jsdom
        var jsdom = require('jsdom');
        require('util');
        var window = jsdom.jsdom().parentWindow;
        global.window = window;
        global.document = window.document;
        //load HttpXMLRequest
        global.XMLHttpRequest = require("/usr/lib/node_modules/xmlhttprequest").XMLHttpRequest;
    }
}

//load test.it
require("../testit.js");
global.test = window.test;
//load nconsole
require("./NodeNonInteractiveConsole.js");
process.stdout.write(" ok\n");

//configure test.it
window.test.setConsole('nodeNoInteractive');


for (i=2; i<process.argv.length; i++){
    if (! /^--/.test(process.argv[i])){
        testcase = process.argv[i];
        process.stdout.write("load '"+testcase+"' ...");
        require(testcase);
        process.stdout.write(" ok\n");
    }
}

test.done();

//output nconsole
test.console.printOutput();

//exit with code= count of errors
process.exit(test.root.result.total - test.root.result.pass);
