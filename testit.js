(function(window) {

    var testit = function() {

        var group = function() {
            this.name = undefined;
            this.status = undefined;
            this.comment = undefined;
            this.error = undefined;
            this.time = new Date().getTime();
            this.result = {
                tests: {
                    passed: 0,
                    failed: 0,
                    error: 0,
                    total: 0
                },
                groups: {
                    passed: 0,
                    failed: 0,
                    error: 0,
                    total: 0
                }
            };
            this.stack = [];
        }

        var test = function() {
            this.status = undefined;
            this.comment = undefined;
            this.error = undefined;
            this.description = undefined;
            this.time = new Date().getTime();
            this.entity = [];
        }

        var root = new group();
        this.root = root;
        root.name = 'root';

        var _makeGroup = function(name,fun) {
            var newgroup = new group();
            newgroup.name = name;
            newgroup.status ='pass';

            var oldRoot = root;
            root = newgroup;

            try{fun();} catch(e) {
                newgroup.status = 'error';
                newgroup.error = e;
            }
            oldRoot.status = updateStatus(oldRoot.status,root.status);
            root = oldRoot;
            switch (newgroup.status) {
                case 'pass' : {
                    root.result.groups.passed++;
                } break;
                case 'fail' : {
                    root.result.groups.failed++;
                } break;
                case 'error' : {
                    root.result.groups.error++;
                } break;
            }
            root.result.groups.total++;
            newgroup.time = new Date().getTime() - newgroup.time;
            root.stack.push(newgroup);
        }
        this.group = _makeGroup;

        var _it = function(a,b) {
            var newtest = new test();
            for (i in arguments) {
                newtest.entity.push(arguments[i]);
            }
            switch (arguments.length) {
                case 0 : {
                    newtest.status = 'error';
                    newtest.error = new ReferenceError("at least one argument expected");
                } break;
                case 1 : {
                    newtest.description = 'argument exist and not false';
                    if (a) {
                        newtest.status = 'pass';
                    } else {
                        newtest.status = 'fail';
                    }
                } break;
                case 2 : {
                    newtest.description = 'arguments are equal';
                    if (a == b) {
                        newtest.status = 'pass';
                    } else {
                        newtest.status = 'fail';
                    }
                } break;
                default : {
                    newtest.status = 'error';
                    newtest.error = new RangeError("too much arguments");
                }
            }
            switch (newtest.status) {
                case 'pass' : {
                    root.result.tests.passed++;
                } break;
                case 'fail' : {
                    root.result.tests.failed++;
                } break;
                case 'error' : {
                    root.result.tests.error++;
                } break;
            }
            root.result.tests.total++;
            root.status = updateStatus(root.status,newtest.status);
            newtest.time = new Date().getTime() - newtest.time;
            root.stack.push(newtest);
        }
        this.it = _it;

        var _comment = function(text) {
            if (root.stack.length) root.stack[root.stack.length-1].comment = text;
        }
        this.comment = _comment;


        var _done = function(obj) {
            // stack.time = +new Date - timestamp;
           root.time = new Date().getTime() - root.time;
            console.dir(root);
        }
        this.done = _done;
    }

var updateStatus = function(oldstatus,newstatus) {
    if (oldstatus===undefined) return newstatus;
    if (newstatus===undefined) return oldstatus;
    if (oldstatus==='error' || newstatus==='error') return 'error';
    if (oldstatus==='fail' || newstatus==='fail') return 'fail';
    return 'pass';
}

window.test = new testit();

})(window) 