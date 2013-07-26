var testit = function() {

    var group = function() {
        this.name = undefined;
        this.status = undefined;
        this.comment = undefined;
        this.error = undefined;
        this.result = {
            tests: {
                passed: undefined,
                failed: undefined,
                total: undefined
            },
            groups: {
                passed: undefined,
                failed: undefined,
                total: undefined
            }
        };
        this.stack = [];
    }

    var test = function() {
        this.status = undefined;
        this.comment = undefined;
        this.error = undefined;
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
        oldRoot.status = (oldRoot.status==='pass' || oldRoot.status===undefined)? root.status: oldRoot.status;
        root = oldRoot;
        root.stack.push(newgroup);
    }
    this.group = _makeGroup;

    var _it = function(a,b) {
        var newtest = new test();
        switch (arguments.length) {
            case 0 : {
                newtest.status='error';
                newtest.error = new ReferenceError("at least one argument expected");
            } break;
            case 1 : {
                if (a) {
                    newtest.status='pass';
                } else {
                    newtest.status='fail';
                }
            } break;
            case 2 : {
                if (a===b) {
                    newtest.status='pass';
                } else {
                    newtest.status='fail';
                }
                newtest.status='pass';
            } break;
            default : {
                newtest.status='error';
                newtest.error = new RangeError("too much arguments");
            }
        }
        
        root.stack.push(newtest);
    }
    this.it = _it;

    var _comment = function(text) {
        if (root.stack.length) root.stack[root.stack.length-1].comment = text;
    }
    this.comment = _comment;


    var _done = function(obj) {
        // stack.time = +new Date - timestamp;
        console.dir(root);
    }
    this.done = _done;

    var _push = function(tst) {

    }
}
