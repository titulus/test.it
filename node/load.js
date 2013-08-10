process.stdout.write("loading env ...");

//load jsdom
var jsdom = require('jsdom');
require('util');
var window = jsdom.jsdom().parentWindow;
global.window = window;
global.document = window.document;
global.jQuery = require('jquery');
global.$ = global.jQuery;

var util = require('util');
global.util = util;

//load HttpXMLRequest
global.XMLHttpRequest = require("/usr/lib/node_modules/xmlhttprequest").XMLHttpRequest;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

global.$ = window.jQuery;
global.jQuery = global.$;

//load test.it
require("../testit.js");
global.test = window.test;
//load nconsole
require("./nconsole.js");
process.stdout.write(" ok\n");

//configure test.it
window.test.setConsole(nconsole);


for (i=2; i<process.argv.length; i++){
    testcase = process.argv[i];
    process.stdout.write("load '"+testcase+"' ...");
    require(testcase);
    process.stdout.write(" ok\n");
}

//output nconsole
nconsole.printOutput();

//exit with code= count of errors
process.exit(test.root.result.total - test.root.result.pass);
