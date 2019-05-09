import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import AppState from "./AppState";
import UserState from "./UserState";
import ProfilesState from "./ProfilesState";
import { i18nState } from "redux-i18n";

export default combineReducers({
    appState: AppState,
    userState: UserState,
    profilesState: ProfilesState,
    form: formReducer,
    i18nState
});
