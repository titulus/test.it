process.stdout.write("loading env ...");

//load jsdom
var jsdom = require("/usr/lib/node_modules/jsdom");
var window = jsdom.jsdom().parentWindow;
global.window = window;
global.document = window.document;
//load HttpXMLRequest
global.XMLHttpRequest = require("/usr/lib/node_modules/xmlhttprequest").XMLHttpRequest;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//load node-jquery
jsdom.jQueryify(window, "./jquery.js", function() {

    global.$ = window.jQuery;
    global.jQuery = global.$;

    //load test.it
    require("../testit.js");
    //load nconsole
    //require("nconsole.js");
    require("./nconsole.js");
    process.stdout.write(" ok\n");

    //configure test.it
    //pl: debug hide: window.test.setConsole(window.nconsole);

    //load app env from config

    //load test.each
    ////run test

    //output nconsole

    //exit with code= count of errors
});