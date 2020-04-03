var global = this;

var validation_rules = {
    //{unique:[model]}
    /**
     * @param {()=>item_} model
     */
    unique:function(key,data,model){
        if(model().where(key+' == '+data).length > 0)
            return 'NotUnique';
    },
    //{max:[50]}
    max:function(key,data,number){
        if(data > number)return 'NotMaxTo:'+number;
    },
    //{min:[50]}
    min:function(key,data,number){
        if(data < number)return 'NotMinTo:'+number;
    },
    //{length_max:[8]}
    min_length:function(key,data,number){
        if(data.length < number)return 'NotLengthMinTo:'+number;
    },
    //{require:[]}
    require:function(){},
    //{email:[]}
    email:function(key,data){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(data)) return 'EmailBadFormat';
    },
    confirmation:function(key,data,value){
        if(data!==value) return 'ConfrimationError'

    }
}