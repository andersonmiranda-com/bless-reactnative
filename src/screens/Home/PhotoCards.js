import Expo from "expo";
import React, { Component } from "react";
import { View } from "react-native";
import * as firebase from "firebase";
import { GeoFire } from "geofire";
import Card from "../../components/Card";
import styles from "./styles";

class PhotoCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            profileIndex: 0
        };
    }

    componentDidMount() {
        const { uid } = this.props;
        this.updateUserLocation(uid);
        this.getProfiles(uid);
    }

    getUser = uid => {
        return firebase
            .database()
            .ref("users")
            .child(uid)
            .once("value");
    };

    getProfiles = async uid => {
        const geoFireRef = new GeoFire(firebase.database().ref("geoData"));
        const userLocation = await geoFireRef.get(uid);
        const geoQuery = geoFireRef.query({
            center: userLocation,
            radius: 10 //km
        });
        geoQuery.on("key_entered", async (uid, location, distance) => {
            const user = await this.getUser(uid);
            const profiles = [...this.state.profiles, user.val()];
            this.setState({ profiles, loading: false });
        });
    };

    updateUserLocation = async uid => {
        const { Permissions, Location } = Expo;
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === "granted") {
            const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: false });
            // const {latitude, longitude} = location.coords
            const latitude = 37.39239; //demo lat
            const longitude = -122.09072; //demo lon
            const geoFireRef = new GeoFire(firebase.database().ref("geoData"));
            geoFireRef.set(uid, [latitude, longitude]);
        } else {
            console.log("Permission Denied");
        }
    };

    nextCard = () => {
        this.setState({ profileIndex: this.state.profileIndex + 1 });
    };

    render() {
        const { profileIndex } = this.state;
        return (
            <View style={styles.deckswiperView}>
                {this.state.profiles
                    .slice(profileIndex, profileIndex + 3)
                    .reverse()
                    .map(profile => {
                        return (
                            <Card key={profile.id} profile={profile} onSwipeOff={this.nextCard} />
                        );
                    })}
            </View>
        );
    }
}

export default PhotoCards;
