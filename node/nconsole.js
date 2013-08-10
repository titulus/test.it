var nconsole = function(){

  _buffer = [];
  _groups = [];

  this.log = function(){
    _buffer.push(['log', arguments]);
  }

  this.error = function(){
    _buffer.push(['error', arguments]);
  }

  this.warn = function(){
    _buffer.push(['warn', arguments]);
  }

  this.info = function(){
    _buffer.push(['info', arguments]);
  }

  this.dir = function(){
    _buffer.push(['dir', arguments]);
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

  _print = function(method, args)
  {
    var i;
    for (i=0; i<args.length; i++){
      method(args[i]);
    }
  }

  this.printOutput = function(){
    var i;
    for (i=0; i<_buffer.length; i++){
      switch (_buffer[i][0]) {
          case 'log':
              _print(console.log, _buffer[i][1]);
              break;
          case 'error':
              _print(console.error, _buffer[i][1]);
              break;
          case 'warn':
              _print(console.warn, _buffer[i][1]);
              break;
          case 'info':
              _print(console.info, _buffer[i][1]);
              break;
          case 'dir':
              _print(console.dir, _buffer[i][1]);
              break;
          default:
              throw "nconsole.printOutput: not implemented: "+_buffer[i][0];
      }
    }
  }

};

nconsole = new nconsole();

global.nconsole = nconsole;

