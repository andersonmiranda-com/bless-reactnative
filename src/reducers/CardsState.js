const initialState = {
    items: [],
    itemIndex: 0,
    offset: 0,
    loading: false,
    refreshing: false,
    scrolling: false
};

export default (state = initialState, action) => {
    let cur_state = Object.assign({}, state);

    switch (action.type) {
        case "UPDATE_CARDS_PARAM":
            cur_state[action.payload.key] = action.payload.value;
            return cur_state;

        case "UPDATE_CARDS":
            return action.payload;

        default:
            return state;
    }
};
