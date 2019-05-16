import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
import configureStore from "../reducers/configureStore";
import axios from "axios";
import { config } from "../config";

export const getUser = _id => {
    console.log("getUser");
    return dispatch => {
        axios
            .get(config.apiUrl + "/users/" + _id)
            .then(result => {
                userReady(dispatch, result.data);
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

export const saveUser = (_id, userData, upsert = false) => {
    return dispatch => {
        axios.post(config.apiUrl + "/users/save", { _id, userData, upsert }).then(result => {
            userReady(dispatch, userData);
        });
    };
};

export const userReady = (dispatch, user) => {
    dispatch({
        type: "UPDATE_USER",
        payload: user
    });
};
