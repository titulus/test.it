function checkConsoleInterface(konsole){
  if (typeof konsole.log != "function" ){
   // throw fatal
  }
  if (typeof konsole.group != "function" ){
    //throw fatal
  }
  if (typeof konsole.groupCollapsed != "function" ){
    //throw fatal
  }
  if (typeof konsole.groupEnd != "function" ){
    //throw fatal
  }
  return true;
}
