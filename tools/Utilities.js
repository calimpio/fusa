
/**
 * 
 * @param {string} key
 * @returns {string} 
 */
function HashEncript_(key){
    return Utilities.base64EncodeWebSafe(key,Utilities.Charset.UTF_8);
}

/**
 * 
 * @param {string} value 
 * @param {string} key
 * 
 * @returns {boolean} 
 */
function HashCompare_(value , key){    
    var passb = Utilities.base64DecodeWebSafe(key,Utilities.Charset.UTF_8);
    var passd = Utilities.newBlob(passb).getDataAsString();    
    return passd === value;
}
/**
 * 
 * @param {string} m
 * @returns {string} 
 */
function reandomStr_(m) {
    var m = m || 15; s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i=0; i < m; i++) { s += r.charAt(Math.floor(Math.random()*r.length)); }
    return s;
};

function JsonStringify_(obj){
    return JSON.stringify(obj);    
}

function JsonParse_(str){
    return JSON.parse(str);
}


