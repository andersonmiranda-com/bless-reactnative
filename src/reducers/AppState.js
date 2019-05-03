const initialState = {
    appToken: "",
    appPNToken: "",
    appUsername: "",
    appUser: {},
    appSettings: {}
};

export default (state = initialState, action) => {
    let cur_state = Object.assign({}, state);

    switch (action.type) {
        case "SET_APP_VAR":
            cur_state[action.payload.key] = action.payload.value;
            return cur_state;

        default:
            return state;
    }
};
