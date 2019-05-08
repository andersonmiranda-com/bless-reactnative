import { Permissions, Location } from "expo";
import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { Spinner, Text } from "native-base";
import * as firebase from "firebase";
import { GeoFire } from "geofire";
import filter from "../../modules/filter";
import Card from "../../components/Card";
import styles from "./styles";

class PhotoCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileIndex: 0,
            profiles: [],
            user: this.props.user,
            loading: true
        };
    }

    componentWillMount() {
        const { user } = this.state;
        this.updateUserLocation(user).then(userLocation => {
            firebase
                .database()
                .ref("users")
                .child(user.uid)
                .on("value", snap => {
                    const user = snap.val();
                    this.setState({
                        user,
                        profiles: [],
                        profileIndex: 0
                    });
                    this.getProfiles(user.uid, userLocation, user.distance);
                });
        });
    }

    getUser = uid => {
        return firebase
            .database()
            .ref("users")
            .child(uid)
            .once("value");
    };

    getSwiped = uid => {
        return firebase
            .database()
            .ref("relationships")
            .child(uid)
            .child("liked")
            .once("value")
            .then(snap => snap.val() || {});
    };

    getProfiles = async (uid, userLocation, distance) => {
        const geoFireRef = new GeoFire(firebase.database().ref("geoData"));
        //const userLocation = await geoFireRef.get(uid);
        const swipedProfiles = await this.getSwiped(uid);
        console.log("userLocation", userLocation);
        const geoQuery = geoFireRef.query({
            center: userLocation,
            radius: distance //km
        });
        geoQuery.on("key_entered", async (uid, location, distance) => {
            const user = await this.getUser(uid);

            console.log("got", user.val().first_name);
            const profiles = [...this.state.profiles, user.val()];

            //idade e sexo - frontend
            const filtered = filter(profiles, this.state.user, swipedProfiles);

            //denominação

            this.setState({ profiles: filtered, loading: false });
        });
    };

    updateUserLocation = async user => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === "granted") {
            //const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: false });
            // const {latitude, longitude} = location.coords
            const latitude = 37.39239; //demo lat
            const longitude = -122.09072; //demo lon
            //geofire
            const geoFireRef = new GeoFire(firebase.database().ref("geoData"));
            geoFireRef.set(user.uid, [latitude, longitude]);
            //console.log("Permission Granted", location);
            return [latitude, longitude];
        } else {
            console.log("Permission Denied");
        }
    };

    relate = (userUid, profileUid, status) => {
        let relationUpdate = {};
        relationUpdate[`${userUid}/liked/${profileUid}`] = status;
        relationUpdate[`${profileUid}/likedBack/${userUid}`] = status;

        firebase
            .database()
            .ref("relationships")
            .update(relationUpdate);
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
                this.state.profileIndex < this.state.profiles.length - 2
                    ? 2
                    : this.state.profiles.length - this.state.profileIndex - 1;
            this._photoCard.doSwipe(direction, cardTrigger);
        }
    };

    doRestart = () => {
        this.setState({ profileIndex: 0 });
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
                        .slice(profileIndex, profileIndex + 3)
                        .reverse()
                        .map((profile, index) => {
                            return (
                                <Card
                                    key={profile.uid}
                                    ref={mr => (this._photoCard = mr)}
                                    index={index}
                                    profile={profile}
                                    onSwipeOff={this.nextCard}
                                    onCardOpen={uid => {
                                        this.props.navigation.navigate("PhotoCardDetails", {
                                            uid: uid
                                        });
                                    }}
                                />
                            );
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

export default PhotoCards;
