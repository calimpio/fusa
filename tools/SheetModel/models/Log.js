function Log_(){
    function asLog(){
        this.fields = ['id','data'];
    }
    return SheetModel_('Logs',asLog,app.db_sheet());
}