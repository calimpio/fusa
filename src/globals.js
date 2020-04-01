
export default {
    GRequester: (callback)=>{
        return google.script.run.withSuccessHandler(callback);
    }
}