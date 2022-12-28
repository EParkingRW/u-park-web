import endpoints from "./endpoints";
const status = {
    LOADING: 1,
    DONE: 2,
    ERROR: 3,
    NOTHING: 4
};
const Constants = {
    endpoints,
    BACKEND_URL:process.env.REMOTE_BACKEND_URL,
    status,
}

export default Constants