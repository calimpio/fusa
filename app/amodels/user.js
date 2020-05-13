
/**SheetModel item_ as User_*/
/**
 * @returns {item_<asUser>}
 */
function User_(){
    /**Item as User_
     * @extends {item_} 
     * @returns {item_}
     */    
    function asUser(){          
        this.fields = ['id','username','name','email','password','session','forgetpassword_code','roles'];
        this.publicFields = ['id','username','name','roles'];   
        this.typesFields = {
            roles:'json'
        }
                
        this.addRoles=function(roles_array){
            var roles = JsonParse_(this.getField('roles'));
            if(!roles)roles={};
            for(var i in roles_array){
                roles[roles_array[i]] = roles_array[i];
            }
            this.setField("roles",JsonStringify_(roles));                      
        }

        this.hasRole=function(role){
            var roles = JsonParse_(this.getField('roles'));
            if(!roles)roles={};            
            return typeof roles[role] === 'string';
        }

        this.removeRole=function(role){
            var roles = JsonParse_(this.getField('roles'));
            if(!roles)roles={}; 
            delete roles[role];
            this.setField("roles",JsonStringify_(roles));                     
        }
        
    }
    return SheetModel_('Users', asUser,app.db_sheet_private);
}

var roles={
    admin:'admin',
    teacher:'teacher',
    student:'student',    
}