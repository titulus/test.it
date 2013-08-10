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

  this.group = function(gname) {
    var newGroup = { name: gname, status:'opened', entries:[] };
    _push(['group', newGroup]);
    _groupsTree.push(newGroup);
  }

  this.groupCollapsed = function(gname) {
    var newGroup = { name: gname, status:'closed', entries:[] };
    _push(['group', newGroup]);
    _groupsTree.push(newGroup);
  }

  this.groupEnd = function() {
    _groupsTree = _groupsTree.splice(0, _groupsTree.length-1);
  }

  _print = function(method, args, deep) {
    var i;
    for (i=0; i<args.length; i++){
      _printDeep(deep, " ");
      method(args[i]);
    }
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
     _printDeep(deep + 1, symbol);
     process.stdout.write(" " + level.name + "\n");
     var i;
     for (i=0; i<level.entries.length; i++){
       switch (level.entries[i][0]) {
           case 'log':
             _print(console.log, level.entries[i][1], deep + 4);
             break;
           case 'error':
             _print(console.error, level.entries[i][1], deep + 4);
             break;
           case 'warn':
             _print(console.warn, level.entries[i][1], deep + 4);
             break;
           case 'info':
             _print(console.info, level.entries[i][1], deep + 4);
             break;
           case 'dir':
             _print(console.dir, level.entries[i][1], deep + 4);
             break;
           case 'group':
             _printLevel(deep+2, level.entries[i][1], deep + 4);
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

