var app = {

  /**App Name*/
  name:"App-Name",
  //
 
  
  /**Database File Sheet id*/
  db_sheet_id:'google_drive_sheetbook_id',
  //  

  /**Database File Sheet
   * @returns {GoogleAppsScript.Spreadsheet}
  */
  db_sheet:function(){
    return SpreadsheetApp.openById(this.db_sheet_id);
  },
  //  
  
  
  /**Views dir*/
  views_dir : 'app/views/',
  //
  
  /**Assets dir*/
  assets_dir : 'app/views/assets/',
  //
  
};



/**/
function install_modal_tigger()
{
  AddModalToSheet(app.db_sheet_id,'modal');
}
/**/

var app_router={
    
}