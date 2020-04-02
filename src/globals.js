
export default {
    GRequester: (callback) => {
        return google.script.run.withSuccessHandler(callback);
    },
    storages: {
        session_token: "fusa_session_token",
    }
}
