import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
import configureStore from "../reducers/configureStore";
import moment from "moment";

export const updateCards = (user, refresh = false) => {
    this.client = Stitch.defaultAppClient;
    this.db = this.client
        .getServiceClient(RemoteMongoClient.factory, "bless-club-mongodb")
        .db("bless");

    this.store = configureStore().store;

    return dispatch => {
        this.limit = 50;

        this.cardsState = this.store.getState().cardsState;

        if (refresh) {
            this.offset = 0;
            this.items = [];
        } else {
            this.offset = this.cardsState.offset;
            this.items = this.cardsState.items;
        }

        this.profilesCount = parseInt(this.cardsState.itemsCount, 10);

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

        if (this.items.length < this.itemsCount || refresh) {
            this.store.dispatch({
                type: "UPDATE_NOTIFICATION_PARAM",
                payload: { key: "loading", value: true }
            });

            this.db
                .collection("users")
                .find(query)
                .toArray()
                .then(items => {
                    console.log("actions OK", items.length);
                    let cards = {
                        items: this.items.concat(items),
                        itemsCount: items.count,
                        offset: this.offset + this.limit,
                        loading: false,
                        refreshing: false,
                        scrolling: false
                    };
                    profilesUpdated(dispatch, cards);
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

export const profilesUpdated = (dispatch, cards) => {
    dispatch({
        type: "UPDATE_CARDS",
        payload: cards
    });
};
