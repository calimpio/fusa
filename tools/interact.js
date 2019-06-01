
/** Using for return view Htmltemplate as HTMLoutput */
function Template(filename){
    return HtmlService.createTemplateFromFile(app.views_dir+filename).evaluate();    
}

/** Using for return a Asset file as Content string */
function Asset(filename){
    return HtmlService.createTemplateFromFile(app.assets_dir+filename).evaluate().getContent();
}
  

function AddModalToSheet(sheet_id,fn_name_str) {
   ScriptApp.newTrigger(fn_name_str).forSpreadsheet(SpreadsheetApp.openById(sheet_id)).onOpen().create();
}