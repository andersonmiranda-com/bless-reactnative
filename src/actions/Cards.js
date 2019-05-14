import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
import configureStore from "../reducers/configureStore";
import axios from "axios";

export const updateCards = (user, refresh = false) => {
    //console.log("called updateCards", user);

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

        if (this.items.length < this.itemsCount || refresh) {
            this.store.dispatch({
                type: "UPDATE_NOTIFICATION_PARAM",
                payload: { key: "loading", value: true }
            });

            axios.post("http://192.168.1.51:3000/api/getCards", { user }).then(function(response) {
                let items = response.data.data;

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

export const saveRelation = (user_id, item_id, type) => {
    return dispatch => {
        axios.post("http://192.168.1.51:3000/api/saveRelation", { user_id, item_id, type });
    };
};
