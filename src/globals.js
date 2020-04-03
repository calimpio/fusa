
export default {
    GRequester: (callback) => {
        
        return google.script.run.withLogger().withSuccessHandler(callback);
    },
    storages: {
        session_token: "fusa_session_token",
    }
}
