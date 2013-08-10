var globalCounter;

function clear()
{
    callback.remove_callback('callback','callback_1');
    callback.remove_callback('callback','callback_2');
    globalCounter = 0;
}

    test.group('Hapy path',function(){
        clear();
        callback.add_callback('callback','callback_1',function(input){
           globalCounter++;
        });
        callback.add_callback('callback','callback_2',function(input){
           globalCounter++;
        });
        test.it(callback.run_callback('callback', '')).comment("returned true");
        test.it(globalCounter, 2).comment("processed 2 events");
    });
    test.group('After remove callback',function(){
        clear();
        callback.add_callback('callback','callback_1',function(input){
           globalCounter++;
        });
        callback.add_callback('callback','callback_2',function(input){
           globalCounter++;
        });
        callback.remove_callback('callback','callback_2');
        test.it(callback.run_callback('callback', '')).comment("returned true");
        test.it(globalCounter, 1).comment("processed 1 event");
    });
    test.group('Check list',function(){
        clear();
        callback.add_callback('callback','callback_1',function(input){
           globalCounter++;
        });
        callback.add_callback('callback','callback_2',function(input){
           globalCounter++;
        });
        test.it(callback.list_callbacks('callback').callback_1);
        test.it(callback.list_callbacks('callback').callback_2);
    });

test.done();
