function doGet() {
    return Template('index');
}

function modal() {
    SpreadsheetApp.getUi().showModalDialog(Template('index'), app.name);
}


//routers
app_router["home"] = function (req, res) {    
    return res.status(200).send({ msg: "fantastic!" });
}
