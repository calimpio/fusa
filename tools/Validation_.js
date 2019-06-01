
/**
 * 
 * @param {{}} obj 
 * 
 * 
 * 
 */
function Validation_(obj){
    this.obj = obj;
    var errors = {};
    /**
     * 
     * @method rule 
     * 
     * @param {string} key 
     * @param {{unique:[model_],max:[number],min:[number],min_length:[number],require:[]}} rules
     * 
     */
    this.rule = function(key,rules){
        if(this.obj[key]){
            errors[key]=[];
            for(var k in rules){
                if(validation_rules[k]){              
                  var result = validation_rules[k].apply(this,[key,this.obj[key]].concat(rules[k]));
                  if(result){
                      errors[key].push(result);
                  }
              }
            }
            if(errors[key].length == 0)delete errors[key];
        }else
        {
            if(rules.require){
                errors[key]=['Require'];
            }
        }

    }
    /**
     * @returns {boolean}
     */
    this.hasErros = function(){
        return Object.keys(errors).length>0;
    }

    this.getErrors = function(){
        return {errors:errors}
    }
    
}


