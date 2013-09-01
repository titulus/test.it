function nodeConsole(){
    /** colors for console.log %s */
    var green = "\u001b[32m",
        red = "\u001b[31m",
        orange = "\u001b[33m",
        blue = "\u001b[36m",
        magenta = "\u001b[35m",
        normal = "\u001b[0m";

    var prefix = [];

    function _print(){
        console.log.apply(null, arguments);
    };
    this.print = _print;

    function _error(error){
        console.log('%s%s%s%s: %s',prefix.join('')+'  '+normal,orange,error.type,normal,error.message);
        prefix.push(orange+'  >');
        // console.log(prefix+'.'+normal, error.stack.split(/\n/).length)
        var stack = error.stack.split(/\n/)
        for (var i in stack) {
            console.log(prefix.join('')+normal,stack[i]);
        }
        prefix.pop();
        // console.dir(prefix+'_'+normal,error.error);
        // console.groupEnd();
    };
    this.error = _error;

    function _test(test){
        var color = (test.status==='pass')?green:
                    (test.status==='fail')?red:
                    (test.status==='error')?orange:normal;

        var passed = (test.status==='pass')?true:false;
        
        var sign = (passed)?'.':',';

        var args = ['%s%s%s%s',prefix.join('')+color+sign+normal,color,test.status,normal];
        
        

        if (test.time) {
            args[0] += ' (%s%s%s ms)';
            args.push(blue,test.time,normal);
        };

        if (test.comment) {
            args[0] += ': %s';
            args.push(test.comment);
        }

        console.log.apply(console, args);

        if (!passed) {
            prefix.push(color+':');
            if (test.description) console.log(prefix.join('')+' '+normal,test.description);

            if (test.error) _error(test.error);
        
            console.log(prefix.join('')+'_'+normal,test.argument);
            prefix.pop();
        }

    };
    this.test = _test;

    function _group(group) {
        var color = (group.status==='pass')?green:
                    (group.status==='fail')?red:
                    (group.status==='error')?orange:normal;

        var passed = (group.status==='pass')?true:false;
        
        var sign = (passed)?'.':',';

        var args = ['%s%s%s - %s%s%s',prefix.join('')+color+sign+normal,magenta,group.name,color,group.status,normal];

        args[0] += ' - %s%d%s/%s%d%s/%s%d%s';
        args.push(green,group.result.pass,normal
                 ,red,group.result.fail,normal
                 ,orange,group.result.error,normal);

        args[0] += ' (%s%s%s ms)';
        args.push(blue,group.time,normal);

        if (group.comment) {
            args[0] += ': %s';
            args.push(group.comment);
        };

        console.log.apply(console, args);
        
        if (!passed) {
            prefix.push(color+'|');

            if (group.description) console.log(prefix.join('')+' '+normal,group.description);

            if (group.trace) console.log(group.trace);

            for (var i in group.stack) {
                (group.stack[i].type==='test')?_test(group.stack[i]):_group(group.stack[i]);
            }

            if (group.error) _error(group.error);

            console.log(prefix.join('')+'_'+normal);

            prefix.pop();
        }

    };
    this.group = _group;
}

module.exports = nodeConsole;