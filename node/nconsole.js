var nconsole = function(){

  _buffer = {
        name: 'console',
        status: 'opened',
        entries: [] };
  _groupsTree = [ _buffer ];
  _lastEntry = _buffer;

  this.log = function(){
    _lastEntry.entries.push(['log', arguments]);
  }

  this.error = function(){
    _lastEntry.entries.push(['error', arguments]);
  }

  this.warn = function(){
    _lastEntry.entries.push(['warn', arguments]);
  }

  this.info = function(){
    _lastEntry.entries.push(['info', arguments]);
  }

  this.dir = function(){
    _lastEntry.entries.push(['dir', arguments]);
  }

  this.group = function(){
    //empty
  }
  
  this.groupCollapsed = function(){
    //empty
  }
  
  this.groupEnd = function(){
    //empty
  }
  
  this.printOutput = function(){
    //empty
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
           default:
             throw "nconsole.printOutput: not implemented: "+level.entries[i][0];
       }
     }
  }

  this.printOutput = function() {
    _printLevel(0, _buffer);
  }

};

nconsole = new nconsole();

global.nconsole = nconsole;

