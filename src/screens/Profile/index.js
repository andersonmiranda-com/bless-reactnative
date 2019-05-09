import React, { Component } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Container, Content, Icon, Button, Text } from "native-base";
import { Stitch, RemoteMongoClient, BSON } from "mongodb-stitch-react-native-sdk";
import moment from "moment";
import styles from "./styles";

class Profile extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            user: this.props.navigation.state.params.user,
            loading: true
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

    componentWillMount() {
        const { _id } = this.state.user;
        const usersCollection = this.db.collection("users");
        usersCollection
            .findOne({ _id: _id })
            .then(user => {
                this.setState({ user, loading: false });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const navigation = this.props.navigation;

        const { user } = this.state;
        const { birthday, first_name, bio, image, _id, } = user;
        const profileBday = moment(birthday, "MM/DD/YYYY");
        const profileAge = moment().diff(profileBday, "years");

        return (
            <Container>
                <Content
                    padder
                    scrollEnabled={false}
                    contentContainerStyle={styles.containerVertical}
                >
                    <TouchableOpacity onPress={() => navigation.navigate("UserDetails")}>
                        <Image source={{ uri: image }} style={styles.profileImage} />
                    </TouchableOpacity>

                    <Text style={styles.nameAndAgeText}>
                        {first_name}, {profileAge}
                    </Text>
                    {bio ? <Text note>{bio}</Text> : <View />}

                    <Button
                        rounded
                        center
                        style={{ marginTop: 30 }}
                        onPress={() => navigation.navigate("EditProfile", { user })}
                    >
                        <Icon name="md-create" />
                        <Text>{this.context.t("Edit Profile")}</Text>
                    </Button>

                    <Button
                        rounded
                        center
                        style={{ marginTop: 15 }}
                        onPress={() => navigation.navigate("Settings", { user })}
                    >
                        <Icon name="md-settings" />
                        <Text>{this.context.t("Settings")}</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

Profile.contextTypes = {
    t: PropTypes.func.isRequired
};
export default Profile;
