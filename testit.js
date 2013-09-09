(function(scope) {

'use strict'

/** Context for printer strategies @constructor */
function printerFrom (strategy) {
    this.print = strategy.print;
    this.group = strategy.group;
    this.test = strategy.test;
    this.error = strategy.error;
}

function Testit () {

    /** Printer object. It will be used for output results. */
    var printer;

    /** change default printer */
    function _setPrinter(strategy) {
        printer = new printerFrom(strategy);
    };
    this.printer = _setPrinter;

    /** group class @constructor */
    function Group() {
        this.type = 'group';
        this.name = undefined;
        this.status = undefined;
        this.comment = undefined;
        this.error = undefined;
        this.time = 0;
        this.result = {
            pass: 0,
            fail: 0,
            error: 0,
            total: 0
        };
        this.stack = [];
    }

    /** test class @constructor */
    function Test() {
        this.type = 'test';
        this.status = undefined;
        this.comment = undefined;
        this.description = undefined;
        this.error = undefined;
        // this.time = new Date().getTime();
        this.argument = [];
    }

    /** main group */
    var root = new Group();
    root.root = true;
    root.name = 'root';
    root.timestamp = new Date().getTime();

    /** return root object */
    function _returnRoot() {
        return root;
    }
    this.getRoot = this.r = _returnRoot;
    /** public interface for root @deprecated */
    this.root = root;

    /** make new instace of group, fill it, push it into stack of current level group */
    function _makeGroup(name,fun,excluded) {
        /** get timestamp */
        var time = new Date().getTime();
        
        /** var for the new instance of group */
        var newgroup;
        /** identify new group */
        var groupAlreadyExist = false;
        /** find group in current-level stack */
        for (var i in this.stack) {
            if (this.stack[i].type !== 'group') continue;
            if (this.stack[i].name === name) {
                newgroup = this.stack[i];
                groupAlreadyExist = true;
                break;
            }
        }
        if (!groupAlreadyExist) newgroup = new Group();
        newgroup.name = name;

        /** add backlink to provide trace */
        newgroup.linkBack = this;

        /** set to pass as default. it's may be changed in some next lines */
        var oldstatus;
        if (groupAlreadyExist) oldstatus = newgroup.status;
        newgroup.status ='pass';

        /**
         * try to execute fun() with tests and other groups in
         * This part provides nesting.
         * For this reason there are redefinition of root.
         */
        var oldRoot = root;
        root = newgroup;
        try {
            fun();
        } catch(e) {
            newgroup.status = 'error';
            newgroup.error = generateError(e);
        }
        root = oldRoot;

        /** update time */
        newgroup.time += new Date().getTime() - time;

        /** finally place this group into previous level stack (if it's a new group) */
        if (!groupAlreadyExist && !excluded) this.stack.push(newgroup);

        /** update counters */
        updateCounters(newgroup);

        /** return testit with link to this group */
        return newgroup;
    }
    /** return group by it's name in stack of current level group */
    function _getGroup(name) {
        var stack = this.stack;
        for (var i in stack) {
            if (stack[i].type !== 'group') continue;
            if (stack[i].name === name) {
                return stack[i];
            }
        }
        throw new ReferenceError('there is no group with name: '+name);
    }
    /* Interface for _makeGroup() and _getGroup() methods. */
    function _group(name,fun) {
        /**
         * Here may be situations:
         *     this.link is root && root is root                - test.group() called in root scope
         *     this.link is root && root is some group          - test.group() called in some other group scope
         *     this.link is some group && root is root          - .group() called in chain in root scope
         *     this.link is some group && root is some group    - .group() called in chain in some other group scope
         * look at it with:
         *     console.log(name,'\nlink: ',this.link,'\nroot: ',root);
         */
        var currentLevel = (this.link)?this.link:root;
        var linkToGroup;

        switch (arguments.length) {
            case 0 : throw new RangeError("test.group expect at least 1 argument");
            case 1 : {
                    linkToGroup = _getGroup.call(currentLevel,name);
                } break;
            case 2 : {
                    linkToGroup = _makeGroup.call(currentLevel,name,fun,this.excluded);
                } break;
            default : throw new RangeError("test.group expect no more than 2 arguments");
        }

        /** get trace for this group */
        var trace = getTrace();

        return Object.create(this,{link:{value:linkToGroup},trace:{value:trace}});
    };
    this.group = _group;

    /** Base for all tests. Make new instance of test, fill it using test-functions, push it into stack of current level group */
    function _doTest(type,args) {
        /** new instance of test */
        var newtest = new Test();

        /** fill newtest.agrument from method arguments */
        for (var i in args) {
            newtest.argument.push(args[i]);
        }

        /** execute test-function specified by type */
        switch (type) {
            case 'it' : _testIt(newtest); break;
            case 'them' : _testThem(newtest); break;
            case 'type' : _testType(newtest); break;
            case 'types' : _testTypes(newtest); break;
            case 'is' : _testIs(newtest); break;
            case 'are' : _testAre(newtest); break;
        }
        
        /** calculate time, if .time was called before this test */
        if (this.timestamp) newtest.time = new Date().getTime() - this.timestamp;

        /** finally place this test into container stack */
        if (!this.excluded) root.stack.push(newtest);

        /** update counters of contained group */
        updateCounters(root);

        /** get trace for this test */
        var trace = getTrace();

        /** return testit with
         *      link to this test
         *      trace for this test
         */
        return Object.create(this,{link:{value:newtest},trace:{value:trace}});
    }
    this.it = function(){return _doTest.call(this,'it',arguments)};
    this.them = function(){return _doTest.call(this,'them',arguments)};
    this.is = function(){return _doTest.call(this,'is',arguments)};
    this.are = function(){return _doTest.call(this,'are',arguments)};
    /** @deprecated */
    this.type = function(){return _doTest.call(this,'type',arguments)};
    /** @deprecated */
    this.types = function(){return _doTest.call(this,'types',arguments)};

    /** checks the argument for the true-like value */
    function _testIt(testobj){
        switch (testobj.argument.length) {
            /** in case of no arguments - throw Reference error */
            case 0 : {
                testobj.status = 'error';
                testobj.error = generateError(new RangeError("at least one argument expected"));
            } break;
            /** if there is only one argument - check it for truth */
            case 1 : {
                if (testobj.argument[0]) {
                    testobj.description = 'argument is true-like';
                    testobj.status = 'pass';
                } else {
                    testobj.description = 'argument is false-like';
                    testobj.status = 'fail';
                }
            } break;
            /** if there are two arguments - check equalence between them */
            case 2 : {
                if (typeOf(testobj.argument[0]) !== typeOf(testobj.argument[1])) {
                    testobj.description = 'argument hase different types';
                    testobj.status = 'fail';
                } else if (deepCompare(testobj.argument[0],testobj.argument[1])) {
                    testobj.description = 'arguments are equal';
                    testobj.status = 'pass';
                } else {
                    testobj.description = 'argument are not equal';
                    testobj.status = 'fail';
                }
            } break;
            /** otherwise throw Range error */
            default : {
                testobj.status = 'error';
                testobj.error = generateError(new RangeError("maximum of 2 arguments expected"));
            }
        }
    }

    /** checks array of values to be true-like */
    function _testThem(testobj){
        switch (testobj.argument.length) {
            /** in case of no arguments - throw Reference error */
            case 0 : {
                testobj.status = 'error';
                testobj.error = generateError(new RangeError("at least one argument expected"));
            } break;
            /** if there is only one argument - continue */
            case 1 : {
                /** if first argument is not an Array - throw TypeError */
                if (typeOf(testobj.argument[0]) !== 'Array') {
                    testobj.status = 'error';
                    testobj.error = generateError(new TypeError("argument should be an array"));
                } else {
                    /** check elements of array to be true-like */
                    for (var i in testobj.argument[0]) {
                        if (!testobj.argument[0][i]) {
                            testobj.status = 'fail';
                            testobj.description = 'there are at least one false-like element';
                        }
                    }
                    /** test passed if there are no false-like elements found */
                    if (testobj.status !== 'fail') {
                        testobj.status = 'pass';
                        testobj.description = 'arguments are true-like';
                    }
                }
            } break;
            /** otherwise throw Range error */
            default : {
                testobj.status = 'error';
                testobj.error = generateError(new RangeError("maximum of 1 arguments expected"));
            }
        }
    }

    /**
     * checks type of value to be equal to specified
     * @deprecated use test.is instead
     */
    function _testType(testobj) {
        if (testobj.argument.length!==2) {
            testobj.status = 'error';
            testobj.error = generateError(new RangeError("expect two arguments"));
        } else if (typeOf(testobj.argument[1]) !== 'String') {
            testobj.status = 'error';
            testobj.error = generateError(new TypeError("second argument should be a String"));
        } else if (!arrayConsist(identifiedTypes,testobj.argument[1].toLowerCase())) {
            testobj.status = 'error';
            testobj.error = generateError(new TypeError("second argument should be a standart type"));
        } else {
            testobj.description = 'type of argument is ';
            if (typeOf(testobj.argument[0]).toLowerCase() !== testobj.argument[1].toLowerCase()) {
                testobj.description += 'not '+testobj.argument[1];
                testobj.status = 'fail';
            } else {
                testobj.description += typeOf(testobj.argument[0]);
                testobj.status = 'pass';
            }
        }
    }

    /**
     * checks types of elements in array to be equal to specified and between each other
     * @deprecated use test.are instead
     */
    function _testTypes(testobj) {
        if (testobj.argument.length==0) {
            testobj.status = 'error';
            testobj.error = generateError(new RangeError("at least one argument expected"));
        } else if (testobj.argument.length>2) {
            testobj.status = 'error';
            testobj.error = generateError(new RangeError("maximum of two arguments expected"));
        } else if (typeOf(testobj.argument[0]) !== 'Array') {
            testobj.status = 'error';
            testobj.error = generateError(new TypeError("first argument should be an array"));
        } else {
            var type, types;
            if (typeOf(testobj.argument[1]) === 'undefined') {
                type = typeOf(testobj.argument[0][0]);
                types = 'same';
            } else if (typeOf(testobj.argument[1]) !== 'String') {
                testobj.status = 'error';
                testobj.error = generateError(new TypeError("second argument should be a String"));
             } else if (!arrayConsist(identifiedTypes,testobj.argument[1].toLowerCase())) {
                testobj.status = 'error';
                testobj.error = generateError(new TypeError("second argument should be a standart type"));
            } else {
                type = testobj.argument[1];
                types = 'right';
            }
            if (testobj.status !== 'error') {
                type = type.toLowerCase();
                for (var i in testobj.argument[0]) {
                    if (typeOf(testobj.argument[0][i]).toLowerCase() !== type) {
                        testobj.status = 'fail';
                        testobj.description = 'There are at least one element with different type';
                    }
                }
                if (testobj.status !== 'fail') {
                    testobj.status = 'pass';
                    testobj.description = 'arguments are '+types+' type';
                }
            }
        }
    }

    /** checks constructor of value to be equal to specified */
    function _testIs(testobj) {
        if (testobj.argument.length!==2) {
            testobj.status = 'error';
            testobj.error = generateError(new RangeError("expect two arguments"));
        } else if (typeOf(testobj.argument[1]) !== 'Function') {
            testobj.status = 'error';
            testobj.error = generateError(new TypeError("second argument should be a constructor (function)"));
        } else {
            if (testobj.argument[1].name=='') {
                testobj.description = 'argument has ';
                if (testobj.argument[0].constructor !== testobj.argument[1]) {
                    testobj.description += 'wrong';
                    testobj.status = 'fail';
                } else {
                    testobj.description += 'right';
                    testobj.status = 'pass';
                }
                testobj.description += ' constructor';
            } else {
                testobj.description = 'argument is ';
                if (testobj.argument[0].constructor !== testobj.argument[1]) {
                    testobj.description += 'not '+testobj.argument[1].name;
                    testobj.status = 'fail';
                } else {
                    testobj.description += testobj.argument[1].name;
                    testobj.status = 'pass';
                }
            }
        }
    }

    /** checks constructors of elements in array to be equal to specified and between each other */
    function _testAre(testobj) {
        if (testobj.argument.length==0) {
            testobj.status = 'error';
            testobj.error = generateError(new RangeError("at least one argument expected"));
        } else if (testobj.argument.length>2) {
            testobj.status = 'error';
            testobj.error = generateError(new RangeError("maximum of two arguments expected"));
        } else if (typeOf(testobj.argument[0]) !== 'Array') {
            testobj.status = 'error';
            testobj.error = generateError(new TypeError("first argument should be an array"));
        } else {
            var constructor, constructors;
            if (typeOf(testobj.argument[1]) === 'undefined') {
                constructor = testobj.argument[0][0].constructor;
                constructors = 'same';
            } else if (typeOf(testobj.argument[1]) !== 'Function') {
                testobj.status = 'error';
                testobj.error = generateError(new TypeError("second argument should be a constructor (function)"));
            } else {
                constructor = testobj.argument[1];
                constructors = 'right';
            }
            if (testobj.status !== 'error') {
                for (var i in testobj.argument[0]) {
                    if (testobj.argument[0][i].constructor !== constructor) {
                        testobj.status = 'fail';
                        var num = 1 +parseInt(i);
                        testobj.description = 'There are at least one ('+num+') element with different constructor';
                    }
                }
                if (testobj.status !== 'fail') {
                    testobj.status = 'pass';
                    if (typeof testobj.argument[1]!=='undefined') {
                        testobj.description = 'arguments '+(testobj.argument[1].name!=='undefined')?'are '+testobj.argument[1].name:'has same constructor';
                    } else {
                        testobj.description = 'arguments has same constructor';
                    }
                    
                }
            }
        }
    };

    /** adds the time spent on test, into his result */
    function _addTime () {
        return Object.create(this,{timestamp:{value:new Date().getTime()}});
    };
    this.addTime = _addTime;
    /**
     * Old time attribute. It has bug! Do not use it!
     * @deprecated
     */
    this.time = Object.create(this,{timestamp:{value:new Date().getTime()}});

    /** makes test/group unpushable into stack of current level group */
    this.exclude = this.x = Object.create(this,{excluded:{value:true}});

    /** add a comment for the linked test or group */
    function _comment(text) {
        /** add a comment, if there is something can be commented */
        if (!this.link) throw new ReferenceError('comment can only be used in testit chain');
        this.link.comment = text;

        return this;
    };
    this.comment = _comment;

    /** try to execute functions in arguments depending on test|group result */
    function _callback(pass,fail,error) {
        if (!this.link) throw new ReferenceError('callback can only be used in testit chain');
        if (this.link.status === 'pass' && typeOf(pass) === 'Function' ) try {pass();} catch(e) {throw e;}
        if (this.link.status === 'fail' && typeOf(fail) === 'Function' ) try {fail();} catch(e) {throw e;}
        if (this.link.status === 'error' && typeOf(error) === 'Function' ) try {error();} catch(e) {throw e;}

        return this;
    };
    this.callback = _callback;

    /** add stack trace to test/group */
    function _addTrace(level) {
        if (!this.link) throw new ReferenceError('addTrace can only be used in testit chain');
        if (this.trace) {
            var trace = this.trace;
            if (typeOf(level) === 'Number') trace = trace.split('\n').slice(0,level+1).join('\n');
            this.link.trace = trace;
        }

        return this;
    };
    this.addTrace = _addTrace;

    /** Final chain-link: returns result of test or group */
    function _result() {
        if (this.link) {
            return (this.link.status == 'pass')? true : false;
        } else {
            return (root.status == 'pass')? true : false;
        }
        return undefined;
    };
    this.result = _result;

    /** Final chain-link: returns arguments of test (not of group!) */
    function _arguments() {
        if (this.link) {
            if (this.link.type!=='test') return TypeError('groups don\'t return arguments');
            switch (this.link.argument.length) {
                case 0 : return undefined
                case 1 : return this.link.argument[0];
                default : return this.link.argument;
            }
        }
        return undefined;
    };
    this.arguments = _arguments;

    /** apply last stuff and display result */
    function _done() {

        /** update time in root */
        if (typeof root.root !== 'undefined') {
            root.time = new Date().getTime() - root.timestamp;
        }

        var curentLevel = (this.link)?this.link:root;

        /** display result (if printer is set) */
        if (printer) {
            if (curentLevel.type==="group") {
                printer.group(curentLevel)
            } else if (curentLevel.type==="test") {
                printer.test(curentLevel)
            } else throw new TypeError('test or group expected');
        }
    };
    this.done = _done;


    /** update counters of contained object */
    function updateCounters(link) {
        link.result = {
            pass: 0,
            fail: 0,
            error: 0,
            total: 0
        };
        for (var i in link.stack) {
            link.result.total++;
            switch (link.stack[i].status) {
                case 'pass' : {
                    link.result.pass++;
                } break;
                case 'fail' : {
                    link.result.fail++;
                } break;
                case 'error' : {
                    link.result.error++;
                } break;
            };
        };
        
        if (link.result.error || link.error) {link.status='error'}
        else if (link.result.fail) {link.status='fail'}
        else {link.status='pass'}

        if (link.linkBack) {
            updateCounters(link.linkBack);
        }
    }

    /** public interface for typeOf */
    this.typeof = typeOf;
    
    /** public interface for getTrace(error) */
    this.trace = getTrace;

    // return this;
    return this;
}  

/** determinates type of argument. More powerfull then typeof(). */
function typeOf (argument) {
    var type;
    try {
        switch (argument.constructor) {
            case Array : type='Array';break;
            case Boolean : type='Boolean';break;
            case Date : type='Date';break;
            case Error : type='Error';break;
            case EvalError : type='EvalError';break;
            case Function : type='Function';break;
            case Number : {type=(isNaN(argument))?'NaN':'Number';}break;
            case Object : type='Object';break;
            case RangeError : type='RangeError';break;
            case ReferenceError : type='ReferenceError';break;
            case RegExp : type='RegExp';break;
            case String : type='String';break;
            case SyntaxError : type='SyntaxError';break;
            case TypeError : type='TypeError';break;
            case URIError : type='URIError';break;
            case Window : type='Window';break;
            case HTMLDocument : type='HTML';break;
            case NodeList : type='NodeList';break;
            default : {
                if (typeof argument === 'object'
                 && argument.toString().indexOf('HTML') !== -1) {
                    type = 'HTML';
                } else {
                    type = undefined;
                }
            }
        }
    } catch (e) {
        type = (argument === null)? 'null' : typeof argument;
    }
    return type;
}
/** list of types, which can be identified by typeOf */
var identifiedTypes = ['array', 'boolean', 'date', 'error', 'evalerror', 'function', 'html', 'nan', 'nodelist', 'null', 'number', 'object', 'rangeerror', 'referenceerror', 'regexp', 'string', 'syntaxerror', 'typeerror', 'urierror', 'window'];
    

/**
 * figure out what status will be used
 * Depends on significance: More significant -> less significant.
 * error -> fail -> pass -> undefined
 */
function updateStatus(oldstatus,newstatus) {
    if (oldstatus===undefined) return newstatus;
    if (newstatus===undefined) return oldstatus;
    if (oldstatus==='error' || newstatus==='error') return 'error';
    if (oldstatus==='fail' || newstatus==='fail') return 'fail';
    return 'pass';
}

/** make the error object more clear and returns it */
function generateError(error) {
    /** understandable error object */
    var object = {
        error: error
       ,type: typeOf(error)
       ,message: error.message
    }
    if (getTrace(error)) object.stack = getTrace(error);

    return object;
}

/** returns a list of functions that have been performed to call the current line */
function getTrace(error) {
    if (!error) error = new Error();
    if (!error.stack) return;

    var stack = '';
    error.stack.split(/[\n]/).forEach(function(i,n){
        var addToStack = true;
        /** take off empty strings (FireBug) */
        if (i==='') addToStack = false;
        /** take off Errors (Chrome) */
        if (i.indexOf(typeOf(error))!==-1) addToStack = false;
        /** take of reference to this function */
        if (i.indexOf('testit.')!==-1) addToStack = false;
        /** take off any references to testit lines */
        if (i.indexOf('testit-')!==-1) addToStack = false;
        /** fill the stack */
        if (addToStack) {
            stack += (stack)?'\n':'';
            stack += i.replace(/((\s+at\s+)|(^@))/,'');
        }
    })
    return stack;
}

/** finds val in array */
function arrayConsist(array, val) {
    for (var i in array) if (array[i] === val) return true;
    return false;
}

/**
 * Compares any type of variables
 * @return {Boolean}            result of comparison
 * {@link http://stackoverflow.com/a/1144249/1771942}
 */
function deepCompare(){function c(d,e){var f;if(isNaN(d)&&isNaN(e)&&"number"==typeof d&&"number"==typeof e)return!0;if(d===e)return!0;if("function"==typeof d&&"function"==typeof e||d instanceof Date&&e instanceof Date||d instanceof RegExp&&e instanceof RegExp||d instanceof String&&e instanceof String||d instanceof Number&&e instanceof Number)return d.toString()===e.toString();if(!(d instanceof Object&&e instanceof Object))return!1;if(d.isPrototypeOf(e)||e.isPrototypeOf(d))return!1;if(d.constructor!==e.constructor)return!1;if(d.prototype!==e.prototype)return!1;if(a.indexOf(d)>-1||b.indexOf(e)>-1)return!1;for(f in e){if(e.hasOwnProperty(f)!==d.hasOwnProperty(f))return!1;if(typeof e[f]!=typeof d[f])return!1}for(f in d){if(e.hasOwnProperty(f)!==d.hasOwnProperty(f))return!1;if(typeof e[f]!=typeof d[f])return!1;switch(typeof d[f]){case"object":case"function":if(a.push(d),b.push(e),!c(d[f],e[f]))return!1;a.pop(),b.pop();break;default:if(d[f]!==e[f])return!1}}return!0}var a,b;if(arguments.length<1)return!0;for(var d=1,e=arguments.length;e>d;d++)if(a=[],b=[],!c(arguments[0],arguments[d]))return!1;return!0}

/** new instance of testit, availible from outside. */
if (typeof module !== 'undefined' && module.exports) module.exports = new Testit();
    else scope.test = new Testit();

})(this);
