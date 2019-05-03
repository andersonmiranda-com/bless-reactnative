
//------- App Vars

export const setAppVar = (variable, val) => {
    return {
        type: "SET_APP_VAR",
        payload: { key: variable, value: val }
    };
};
