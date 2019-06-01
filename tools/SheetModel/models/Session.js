/**
 * @returns {item_}
 */
function Session_(){
    function asSession(){
        
        this.fields = ['id','user_id','token','ip'];

        this.user=function () {
            return this.hasOne(User_,'user_id');
        }
    }
    return SheetModel_('Sessions',asSession,app.db_sheet())
}