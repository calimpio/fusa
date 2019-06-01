/**
 *
 * @param {{folder:string}} data
 */
function Storage_(data) {
    /**
     * @property {string} folder
     */
    this.folder = data.folder;

    /**
     *
     * @param {string} id
     * @returns {GoogleAppsScript.Drive.File} GoogleAppsScript.Drive.File
     */
    this.getFile = function (id) {
        return DriveApp.getFileById(id);
    };
   
    /**
     *
     * @param {string} name
     * @param {string} content
     * @returns {string} string
     */
    this.saveFile = function (name, content) {
        var file = DriveApp.getFolderById(this.folder).createFile(name, content);        
        return file.getId();
    };
    /**
     * 
     * @param {string} id
     * @returns {string} string
     */
    this.getFileUrl = function (id) {
        var file = this.getFile(id);
        return file.getDownloadUrl();
    };
}