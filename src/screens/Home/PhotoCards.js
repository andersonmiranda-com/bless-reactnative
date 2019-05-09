import { Permissions, Location } from "expo";
import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { Spinner, Text } from "native-base";
import { Stitch, RemoteMongoClient, BSON } from "mongodb-stitch-react-native-sdk";
import { connect } from "react-redux";
import { updateCards } from "../../actions/Cards";

import Card from "../../components/Card";
import styles from "./styles";

class PhotoCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemIndex: 0,
            items: [],
            user: this.props.user,
            loading: true,
            offset: 0
        };

        if (!Stitch.hasAppClient("bless-club-nbaqg")) {
            this.client = Stitch.initializeDefaultAppClient("bless-club-nbaqg");
        } else {
            this.client = Stitch.defaultAppClient;
        }

        this.db = this.client
            .getServiceClient(RemoteMongoClient.factory, "bless-club-mongodb")
            .db("bless");

        console.log("conectado mongoDB");
    }

    componentDidMount() {
        const { user } = this.state;
        this.updateUserLocation(user).then(userLocation => {
            console.log("geolocalizaçao OK");
            this.props.updateCards(this.state.user, true);
        });
    }

    componentDidUpdate(prevProps) {
        const newProps = this.props;
        if (prevProps.cardsState !== newProps.cardsState) {
            console.log("recebido");
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                ...this.props.cardsState
            });
        }
    }

    updateUserLocation = async user => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === "granted") {
            //const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: false });
            //const { latitude, longitude } = location.coords;
            const latitude = -23.716211; //demo lat
            const longitude = -42.507843; //demo lon

            //Update geo no MongoDB
            await this.db
                .collection("users")
                .updateOne(
                    { _id: user._id },
                    { $set: { "location.coordinates": [longitude, latitude] } }
                );

            console.log("Permission Granted");
            return [latitude, longitude];
        } else {
            console.log("Permission Denied");
        }
    };

    relate = (userUid, itemUid, status) => {
        /*  let relationUpdate = {};
        relationUpdate[`${userUid}/liked/${itemUid}`] = status;
        relationUpdate[`${itemUid}/likedBack/${userUid}`] = status;

     firebase
            .database()
            .ref("relationships")
            .update(relationUpdate); */
    };

    nextCard = (direction, itemUid) => {
        const userUid = this.state.user.uid;

        console.log(direction, itemUid);

        switch (direction) {
            case "right":
                this.relate(userUid, itemUid, true);
                break;

            case "left":
                this.relate(userUid, itemUid, false);
                break;

            case "bottom":
                break;

            case "top":
                this.relate(userUid, itemUid, "super");
                break;
        }

        this.setState({ itemIndex: this.state.itemIndex + 1 });
    };

    doSwipe = direction => {
        if (this.state.itemIndex < this.state.items.length) {
            const cardTrigger =
                this.state.itemIndex < this.state.items.length - 4
                    ? 4
                    : this.state.items.length - this.state.itemIndex - 1;
            this._photoCard.doSwipe(direction, cardTrigger);
        }
    };

    doRestart = () => {
        this.setState({ itemIndex: 0, loading: true, items: [] });
        this.getCards(this.props.user);
    };

    doGoBack = () => {
        if (this.state.itemIndex > 0) {
            this.setState({ itemIndex: this.state.itemIndex - 1 });
        }
    };

    cardStack = () => {
        const { itemIndex, items, loading } = this.state;

        if (items.length === 0 && !!loading) {
            return (
                <View style={styles.wrapperCentered}>
                    <Spinner />
                    <Text>{this.context.t("Discovering new people...")}</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.deckswiperView}>
                    {items
                        .slice(itemIndex, itemIndex + 5)
                        .reverse()
                        .map((item, index) => {
                            if (item._id.toString() === this.props.user._id.toString()) {
                                return null;
                            } else {
                                return (
                                    <Card
                                        key={item._id}
                                        ref={mr => (this._photoCard = mr)}
                                        index={index}
                                        item={item}
                                        onSwipeOff={this.nextCard}
                                        onCardOpen={_id => {
                                            this.props.navigation.navigate("PhotoCardDetails", {
                                                _id: _id
                                            });
                                        }}
                                    />
                                );
                            }
                        })}
                </View>
            );
        }
    };

    render() {
        return this.cardStack();
    }
}

PhotoCards.contextTypes = {
    t: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        userState: state.userState,
        cardsState: state.cardsState
    };
}

export default connect(
    mapStateToProps,
    { updateCards }
)(PhotoCards);
