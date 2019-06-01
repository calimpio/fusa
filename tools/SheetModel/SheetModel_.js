/**
 * Using your Sheet like a model_.
 * @constructor 
 * @param {string} sheet_name
 * @param {function} asModelType
 * @param {GoogleAppsScript.Spreadsheet} Spreadsheet
 * @param {number} id_pos
 * @return {item_} return a object item. 
 */
function SheetModel_(sheet_name,asModelType,Spreadsheet){
    var db = Spreadsheet;
    var self = this;
    var constr = new asModelType();
    self.name = sheet_name;    
    self.sheet = db.getSheetByName(sheet_name);
    if(!self.sheet){
        var sheet = db.insertSheet();
        sheet.setName(sheet_name);        
        sheet.appendRow(constr.fields);
        self.sheet = sheet;
    }
    self.type = asModelType;
    if(typeof id_pos == 'undefined')
      self.id_pos = 0;
    else
      self.id_pos = id_pos;  
    self.fields={};
    var matrix = self.sheet.getDataRange().getValues();
    if(matrix[0][self.id_pos] == 'id' || matrix[0][self.id_pos] == 'ID')
    {
      for(var k in matrix[0])
      {
        self.fields[matrix[0][k]] = k;
      }
    }
    
    
    return Extend_(new item_(-1,self,db,matrix),constr);
}


function Extend_(base,child){
  Object.keys(child).forEach(function(v){
    base[v] = child[v];
  });
  return base;
}