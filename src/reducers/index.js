import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import AppState from "./AppState";
import UserState from "./UserState";
import CardsState from "./CardsState";
import { i18nState } from "redux-i18n";

export default combineReducers({
    appState: AppState,
    userState: UserState,
    cardsState: CardsState,
    form: formReducer,
    i18nState
});
