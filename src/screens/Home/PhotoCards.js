import { Permissions, Location } from "expo";
import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { Spinner, Text } from "native-base";
import moment from "moment";
import { Stitch, RemoteMongoClient, BSON } from "mongodb-stitch-react-native-sdk";
import { connect } from "react-redux";
import { updateProfiles } from "../../actions";

import Card from "../../components/Card";
import styles from "./styles";

class PhotoCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileIndex: 0,
            profiles: [],
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
            this.props.updateProfiles(this.state.user, true);
        });
    }

    componentDidUpdate(prevProps) {
        const newProps = this.props;
        if (prevProps.profilesState !== newProps.profilesState) {
            console.log("recebido");
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                ...this.props.profilesState
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

    relate = (userUid, profileUid, status) => {
        /*  let relationUpdate = {};
        relationUpdate[`${userUid}/liked/${profileUid}`] = status;
        relationUpdate[`${profileUid}/likedBack/${userUid}`] = status;

     firebase
            .database()
            .ref("relationships")
            .update(relationUpdate); */
    };

    nextCard = (direction, profileUid) => {
        const userUid = this.state.user.uid;

        console.log(direction, profileUid);

        switch (direction) {
            case "right":
                this.relate(userUid, profileUid, true);
                break;

            case "left":
                this.relate(userUid, profileUid, false);
                break;

            case "bottom":
                break;

            case "top":
                this.relate(userUid, profileUid, "super");
                break;
        }

        this.setState({ profileIndex: this.state.profileIndex + 1 });
    };

    doSwipe = direction => {
        if (this.state.profileIndex < this.state.profiles.length) {
            const cardTrigger =
                this.state.profileIndex < this.state.profiles.length - 4
                    ? 4
                    : this.state.profiles.length - this.state.profileIndex - 1;
            this._photoCard.doSwipe(direction, cardTrigger);
        }
    };

    doRestart = () => {
        this.setState({ profileIndex: 0, loading: true, profiles: [] });
        this.getCards(this.props.user);
    };

    doGoBack = () => {
        if (this.state.profileIndex > 0) {
            this.setState({ profileIndex: this.state.profileIndex - 1 });
        }
    };

    cardStack = () => {
        const { profileIndex, profiles, loading } = this.state;

        if (profiles.length === 0 && !!loading) {
            return (
                <View style={styles.wrapperCentered}>
                    <Spinner />
                    <Text>{this.context.t("Discovering new people...")}</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.deckswiperView}>
                    {profiles
                        .slice(profileIndex, profileIndex + 5)
                        .reverse()
                        .map((profile, index) => {
                            if (profile._id.toString() === this.props.user._id.toString()) {
                                return null;
                            } else {
                                return (
                                    <Card
                                        key={profile._id}
                                        ref={mr => (this._photoCard = mr)}
                                        index={index}
                                        profile={profile}
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
        profilesState: state.profilesState
    };
}

export default connect(
    mapStateToProps,
    { updateProfiles }
)(PhotoCards);
