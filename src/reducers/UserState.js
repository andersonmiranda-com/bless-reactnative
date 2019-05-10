const initialState = {};

export default (state = initialState, action) => {
    let cur_state = Object.assign({}, state);

    switch (action.type) {
        case "UPDATE_USER_PARAM":
            cur_state[action.payload.key] = action.payload.value;
            return cur_state;

        case "UPDATE_USER":
            return action.payload;

        default:
            return state;
    }
};
