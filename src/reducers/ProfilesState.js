const initialState = {
    profiles: [],
    offset: 0,
    loading: false,
    refreshing: false,
    scrolling: false
};

export default (state = initialState, action) => {
    let cur_state = Object.assign({}, state);

    switch (action.type) {
        case "UPDATE_PROFILES_PARAM":
            cur_state[action.payload.key] = action.payload.value;
            return cur_state;

        case "UPDATE_PROFILES":
            return action.payload;

        default:
            return state;
    }
};
