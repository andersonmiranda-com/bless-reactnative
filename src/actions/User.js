import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
import configureStore from "../reducers/configureStore";

export const getUser = _id => {
    this.client = Stitch.defaultAppClient;
    this.db = this.client
        .getServiceClient(RemoteMongoClient.factory, "bless-club-mongodb")
        .db("bless");

    this.store = configureStore().store;

    return dispatch => {
        this.userState = this.store.getState().userState;
        this.db
            .collection("users")
            .findOne({ _id: _id })
            .then(user => {
                userReady(dispatch, user);
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const setUser = user => {
    return {
        type: "UPDATE_USER",
        payload: user
    };
};

export const saveUser = (_id, uData, upsert = false) => {
    this.client = Stitch.defaultAppClient;
    this.db = this.client
        .getServiceClient(RemoteMongoClient.factory, "bless-club-mongodb")
        .db("bless");

    this.store = configureStore().store;
    this.userState = this.store.getState().userState;

    return dispatch => {
        this.db
            .collection("users")
            .updateOne({ _id: _id }, { $set: uData }, { upsert: upsert })
            .then(result => {
                userReady(dispatch, uData);
            });
    };
};

export const userReady = (dispatch, user) => {
    dispatch({
        type: "UPDATE_USER",
        payload: user
    });
};
