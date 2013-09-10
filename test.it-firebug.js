(function(scope) {

function firebugConsole(){
    /** colors for console.log %c */
    var green = "color: green",
        red = "color: red;",
        orange = "color: orange",
        blue = "color: blue",
        normal = "color: normal; font-weight:normal;";


    function _print(entity){
        if (entity.type==="group") {
                _group(entity);
            } else if (entity.type==="test") {
                _test(entity);
            } else if (entity.error) {
                _error(entity);
            } else console.log.apply(console, arguments);
    };
    this.print = _print;

    function _error(error){
        console.group('%c%s%c: %s',orange,error.type,normal,error.message);
            if (error.stack) console.log(error.stack);
            console.dir(error.error);
        console.groupEnd();
    };
    this.error = _error;

    function _test(test){
        var color = (test.status==='pass')?green:
                    (test.status==='fail')?red:
                    (test.status==='error')?orange:normal;
        
        var args = ['%c%s%c',color,test.status,normal];
        
        if (typeof test.time !== 'undefined') {
            args[0] += ' (%c%s%c ms)';
            args.push(blue,test.time,normal);
        };

        if (test.comment) {
            args[0] += ': %s';
            args.push(test.comment);
        }

        if (test.status==='pass') {
            console.groupCollapsed.apply(console, args);
        } else {
            console.group.apply(console, args);
        }

        if (test.description) console.log(test.description);

        if (test.trace) {
            console.group('trace');
                console.log(test.trace);
            console.groupEnd();
        }

        if (test.error) _error(test.error);
        
        console.log(test.argument);

        console.groupEnd();
    };
    this.test = _test;

    function _group(group) {
        var color = (group.status==='pass')?green:
                    (group.status==='fail')?red:
                    (group.status==='error')?orange:normal;

        var args = ['%s - %c%s%c',group.name,color,group.status,normal];

        args[0] += ' - %c%d%c/%c%d%c/%c%d%c';
        args.push(green,group.result.pass,normal
                 ,red,group.result.fail,normal
                 ,orange,group.result.error,normal);

        args[0] += ' (%c%s%c ms)';
        args.push(blue,group.time,normal);

        if (group.comment) {
            args[0] += ': %s';
            args.push(group.comment);
        };

        if (group.status==='pass') {
            console.groupCollapsed.apply(console, args);
        } else {
            console.group.apply(console, args);
        }
        
        if (group.description) console.log(group.description);

        if (group.trace) {
            console.group('trace');
                console.log(group.trace);
            console.groupEnd();
        }

        for (var i in group.stack) {
            _print(group.stack[i]);
        }

        if (group.error) _error(group.error);

        console.groupEnd();

    };
    this.group = _group;
}

scope.firebugConsole = new firebugConsole;

})(this);