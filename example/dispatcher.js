/*
* dispatcher
*/

callback = {
    list : {},
    add_callback : function(event, id, func){
        if (typeof callback.list[event] == "undefined"){
            callback.list[event]={};
        }
        callback.list[event][id]=func;
    },
    
    remove_callback : function(event, id){
        if (typeof callback.list[event] == "undefined"){
            return false;
        }
        callback.list[event][id]=null;
    },
    
    list_callbacks : function(event) {
    	return callback.list[event];
    },
    
    run_callback : function(event, param){
        if (typeof callback.list[event] == "undefined"){
            return false;
        }
        $.each(callback.list[event],function(k,v){
            try {
                if (v != null){
			callback.list[event][k](param);
                }
            }catch(e){
                alert('fail on event '+event+' on run id'+k);
            }
        });
	return true;
    }
};
