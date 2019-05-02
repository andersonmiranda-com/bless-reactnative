import * as Expo from "expo";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { StyleProvider } from "native-base";
import App from "../App";
import configureStore from "./configureStore";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";
import { PersistGate } from "redux-persist/integration/react";
import * as firebase from "firebase";

// Work around issue `Setting a timer for long time`
import { Platform, InteractionManager } from "react-native";

const firebaseConfig = {
    apiKey: "AIzaSyAiNBiSHwG1KHYtXKLnW6Cztrjfdsn53wM",
    authDomain: "bless-club.firebaseapp.com",
    databaseURL: "https://bless-club.firebaseio.com",
    projectId: "bless-club",
    storageBucket: "bless-club.appspot.com",
    messagingSenderId: "512322399163"
};

firebase.initializeApp(firebaseConfig);

const storeObj = {};

// Work around issue `Setting a timer for long time`
const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === "android") {
    // Work around issue `Setting a timer for long time`
    // see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
            InteractionManager.runAfterInteractions(() => {
                if (!timerFix[id]) {
                    return;
                }
                delete timerFix[id];
                fn(...args);
            });
            return;
        }

        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
        if (MAX_TIMER_DURATION_MS < time) {
            const ttl = Date.now() + time;
            const id = "_lt_" + Object.keys(timerFix).length;
            runTask(id, fn, ttl, args);
            return id;
        }
        return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = id => {
        if (typeof id === "string" && id.startWith("_lt_")) {
            _clearTimeout(timerFix[id]);
            delete timerFix[id];
            return;
        }
        _clearTimeout(id);
    };
}

export default class Setup extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            store: configureStore(() => this.setState({ isLoading: false })),
            isReady: false
        };
        storeObj.store = this.state.store;
    }
    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            arial: require("../../Fonts/Arial.ttf")
        });
        this.setState({ isReady: true });
    }

    render() {
        if (!this.state.isReady) {
            return <Expo.AppLoading />;
        }
        return (
            <StyleProvider style={getTheme(variables)}>
                <Provider store={this.state.store.store}>
                    <PersistGate persistor={this.state.store.persistor}>
                        <App />
                    </PersistGate>
                </Provider>
            </StyleProvider>
        );
    }
}
