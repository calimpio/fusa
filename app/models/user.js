
/**SheetModel item_ as User_*/
/**
 * @returns {item_<asUser>}
 */
function User_(){
    /**Item as User_
     * @param {item_} item 
     * @returns {item_} item
     */
    function asUser(){          
        this.fields = ['id','username','name','email','password','session'];       
    }
    return SheetModel_('Users', asUser, app.db_sheet());
}

/**
 * 
 * @param {item_} item 
 */
function User_public_porps_(item){
    
    return {
        id: item.getId(),        
        email: item.getField('email'),
        name: item.getField('name')        
    } 
}