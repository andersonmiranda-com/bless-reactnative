import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
import { ObjectId } from "bson";
import configureStore from "../reducers/configureStore";
import moment from "moment";

export const updateCards = (user, refresh = false) => {
    console.log("called updateCards", user);

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
            this.itemIndex = 0;
        } else {
            this.offset = this.cardsState.offset;
            this.items = this.cardsState.items;
            this.itemIndex = this.cardsState.itemIndex;
        }

        this.profilesCount = parseInt(this.cardsState.itemsCount, 10);

        let ageRange0 = user.ageRange[0] || 18;
        let ageRange1 = user.ageRange[1] || 100;

        let query = {
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
                    .subtract(ageRange1, "years")
                    .toDate(),
                $lte: moment()
                    .subtract(ageRange0, "years")
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

        const options = {
            projection: { birthday: 1, first_name: 1, bio: 1, _id: 1, image: 1, location: 1 }
        };

        if (this.items.length < this.itemsCount || refresh) {
            this.store.dispatch({
                type: "UPDATE_NOTIFICATION_PARAM",
                payload: { key: "loading", value: true }
            });

            this.db
                .collection("users")
                .find(query, options)
                .toArray()
                .then(items => {
                    console.log("updateCards", items);
                    let cards = {
                        items: this.items.concat(items),
                        itemsCount: items.count,
                        itemIndex: this.itemIndex,
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

export const saveRelation = (user_id, item_id, status) => {
    this.client = Stitch.defaultAppClient;
    this.db = this.client
        .getServiceClient(RemoteMongoClient.factory, "bless-club-mongodb")
        .db("bless");

    return dispatch => {
        this.db.collection("relations").updateOne(
            { _id: new ObjectId(user_id) },
            {
                $push: { liked: { uid: item_id, status: status } }
            },
            { upsert: true }
        );
        this.db.collection("relations").updateOne(
            { _id: new ObjectId(item_id) },
            {
                $push: { likedBack: { uid: new ObjectId(user_id), status: status } }
            },
            { upsert: true }
        );
    };
};
