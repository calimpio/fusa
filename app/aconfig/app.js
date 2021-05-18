
/**Database File Sheet
 * 
 * 
 * @param {string} id 
  */
function db(id) {
  return SpreadsheetApp.openById(id);
}


var app = {

  /**App Name*/
  name: "App-Name",
  //


  /**Database File Sheet id*/
  db_sheet_id: 'public sheet id',
  //
  db_sheet_private_id:'private sheet id',  

  /**Database File Sheet
   * @returns {GoogleAppsScript.Spreadsheet}
  */  
  //  


  /**Views dir*/
  views_dir: 'app/views/',
  //

  /**Assets dir*/
  assets_dir: 'app/views/assets/',
  //

};

app.db_sheet = db(app.db_sheet_id);
app.db_sheet_private = db(app.db_sheet_private_id);

/**/
function install_modal_tigger() {
  AddModalToSheet(app.db_sheet_id, 'modal');
}
/**/

var app_router = {

}

