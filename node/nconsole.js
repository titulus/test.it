var nconsole = function(){

  _buffer = {
        name: 'console',
        status: 'opened',
        entries: [] };
  _groupsTree = [ _buffer ];

  _push = function(what) {
    _groupsTree[_groupsTree.length - 1].entries.push(what)
  }

  this.log = function() {
    _push(['log', arguments]);
  }

  this.error = function() {
    _push(['error', arguments]);
  }

  this.warn = function() {
    _push(['warn', arguments]);
  }

  this.info = function() {
    _push(['info', arguments]);
  }

  this.dir = function() {
    _push(['dir', arguments]);
  }

  this.group = function() {
    var newGroup = { name: arguments, status:'opened', entries:[] };
    _push(['group', newGroup]);
    _groupsTree.push(newGroup);
  }

  this.groupCollapsed = function() {
    var newGroup = { name: arguments, status:'closed', entries:[] };
    _push(['group', newGroup]);
    _groupsTree.push(newGroup);
  }

  this.groupEnd = function() {
    _groupsTree = _groupsTree.splice(0, _groupsTree.length-1);
  }

  _print = function(method, args, deep) {
    var i;
    _printDeep(deep, " ");
    var rargs = [];
    for (i=0; i<args.length; i++){
	args[i] = (args[i]+"").split('%c').join('%s');
	if (/color: /.test(args[i])){
          var cchar = args[i];
	  if (/red/.test(args[i])){
              cchar = '\033[31m';
          }else
	  if (/green/.test(args[i])){
              cchar = '\033[32m';
          }else
	  if (/orange/.test(args[i])){
              cchar = '\033[33m';
          }else
	  if (/normal/.test(args[i])){
              cchar = '\033[00m';
          }else
	  if (/blue/.test(args[i])){
              cchar = '\033[34m';
          }
          args[i] = cchar;
        }
        rargs.push(args[i]);
    }
    process.stdout.write(util.format.apply(this, rargs));
  }

  _printDeep = function(deep, symbol) {
    var i;
    for (i=0; i<deep; i++){
      process.stdout.write(symbol);
    }
  }

  _printLevel = function(deep, level) {
     var symbol = "+";
     if (level.status == 'opened'){
       symbol = "-";
     }
     _printDeep(deep, symbol);
     process.stdout.write(" ");
     _print(console.log, level.name);
     process.stdout.write("\n");
     if (symbol == "+"){
        return;
     }
     var i;
     for (i=0; i<level.entries.length; i++){
       switch (level.entries[i][0]) {
           case 'log':
             _print(console.log, level.entries[i][1], deep + 3);
             process.stdout.write("\n");
             break;
           case 'error':
             _print(console.error, level.entries[i][1], deep + 3);
             process.stdout.write("\n");
             break;
           case 'warn':
             _print(console.warn, level.entries[i][1], deep + 3);
             process.stdout.write("\n");
             break;
           case 'info':
             _print(console.info, level.entries[i][1], deep + 3);
             process.stdout.write("\n");
             break;
           case 'dir':
             _print(console.dir, level.entries[i][1], deep + 3);
             process.stdout.write("\n");
             break;
           case 'group':
             _printLevel(deep+1, level.entries[i][1], deep + 3);
             break;
           default:
             throw ("nconsole.printOutput: not implemented: "+level.entries[i][0]);
       }

     }
  }

  this.printOutput = function() {
    _printLevel(0, _buffer);
  }

};

nconsole = new nconsole();

global.nconsole = nconsole;

