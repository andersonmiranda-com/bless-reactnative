import Expo from "expo";
import React, { Component } from "react";
import PhotoCards from "../PhotoCards";
import * as firebase from "firebase";
import { GeoFire } from "geofire";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            profileIndex: 0
        };
    }

    componentDidMount() {
        const { uid } = this.props.navigation.state.params;
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
        console.log("userLocation", userLocation);
        const geoQuery = geoFireRef.query({
            center: userLocation,
            radius: 10 //km
        });
        geoQuery.on("key_entered", async (uid, location, distance) => {
            console.log(uid + " at " + location + " is " + distance + "km from the center");
            const user = await this.getUser(uid);
            console.log(user.val().first_name);
            const profiles = [...this.state.profiles, user.val()];
            this.setState({ profiles });
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

            console.log("Permission Granted", location);
        } else {
            console.log("Permission Denied");
        }
    };

    render() {
        const { profiles, loading } = this.state;
        return (
            <PhotoCards profiles={profiles} loading={loading} navigation={this.props.navigation} />
        );
    }
}

export default Home;
