import { Stitch, RemoteMongoClient, BSON } from "mongodb-stitch-react-native-sdk";
import configureStore from "../reducers/configureStore";
import moment from "moment";

//------- App Vars

export const setAppVar = (variable, val) => {
    return {
        type: "SET_APP_VAR",
        payload: { key: variable, value: val }
    };
};

export const updateProfiles = (user, refresh = false) => {
    this.client = Stitch.defaultAppClient;
    this.db = this.client
        .getServiceClient(RemoteMongoClient.factory, "bless-club-mongodb")
        .db("bless");

    this.store = configureStore().store;

    return dispatch => {
        this.limit = 50;

        this.profilesState = this.store.getState().profilesState;

        if (refresh) {
            this.offset = 0;
            this.profiles = [];
        } else {
            this.offset = this.profilesState.offset;
            this.profiles = this.profilesState.profiles;
        }

        this.profilesCount = parseInt(this.profilesState.profilesCount, 10);

        const query = {
            //_id: { $ne: this.props.user._id },
            location: {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: [user.location.coordinates[0], user.location.coordinates[1]]
                    },
                    $maxDistance: user.distance * 1000
                }
            },
            showMe: true,
            birthday: {
                $gt: moment()
                    .subtract(user.ageRange[1], "years")
                    .toDate(),
                $lte: moment()
                    .subtract(user.ageRange[0], "years")
                    .toDate()
            }
        };

        if (user.gender === "Male") {
            query.showMen = true;
        }
        if (user.gender === "Female") {
            query.showWomen = true;
        }

        if (user.showMen && !user.showWomen) {
            query.gender = "Male";
        } else if (user.showWomen && !user.showMen) {
            query.gender = "Female";
        }

        if (this.profiles.length < this.profilesCount || refresh) {
            this.store.dispatch({
                type: "UPDATE_NOTIFICATION_PARAM",
                payload: { key: "loading", value: true }
            });

            this.db
                .collection("users")
                .find(query)
                .toArray()
                .then(res => {
                    console.log("actions OK", res.length);
                    let profiles = {
                        profiles: this.profiles.concat(res),
                        notificationCount: res.count,
                        offset: this.offset + this.limit,
                        loading: false,
                        refreshing: false,
                        scrolling: false
                    };
                    profilesUpdated(dispatch, profiles);
                })
                .catch(error => {
                    this.store.dispatch({
                        type: "UPDATE_NOTIFICATION_PARAM",
                        payload: { key: "loading", value: false }
                    });
                });
        }
    };
};

export const profilesUpdated = (dispatch, profiles) => {
    dispatch({
        type: "UPDATE_PROFILES",
        payload: profiles
    });
};
