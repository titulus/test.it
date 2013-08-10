var nconsole = function(){

  _buffer = [];

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
    //empty
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

  this.printOutput = function(){
   console.log(_buffer);
  }

};

nconsole = new nconsole();

global.nconsole = nconsole;

