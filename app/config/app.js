var app = {

  /**App Name*/
  name: "App-Name",
  //


  /**Database File Sheet id*/
  db_sheet_id: 'google_drive_sheetbook_id',
  //  

  /**Database File Sheet
   * @returns {GoogleAppsScript.Spreadsheet}
  */
  db_sheet: function () {
    return SpreadsheetApp.openById(this.db_sheet_id);
  },
  //  


  /**Views dir*/
  views_dir: 'app/views/',
  //

  /**Assets dir*/
  assets_dir: 'app/views/assets/',
  //

};



/**/
function install_modal_tigger() {
  AddModalToSheet(app.db_sheet_id, 'modal');
}
/**/

var app_router = {

}

//middlewares

function MiddlewareAuthUser_(req, res, next) {
  var v = new Validation_(req.params);
  v.rule("session_token", { require: [] });
  if (!v.hasErros()) {
    var u = User_().where("session == " + req.params.session_token);
    if (u.length > 0) {
      req.user = u[0];
      next();
    } else {
      return res.status(403).send({ erros: ['session_token_null'] });
    }
  }
  else
    return res.status(403).send({ erros: v.getErrors() });
}