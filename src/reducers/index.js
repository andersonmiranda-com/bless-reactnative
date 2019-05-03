import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import AppState from "./AppState";
import { i18nState } from "redux-i18n";

export default combineReducers({
    appState: AppState,
    form: formReducer,
    i18nState
});
