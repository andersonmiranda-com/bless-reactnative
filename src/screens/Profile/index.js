import React, { Component } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Container, Content, Icon, Button, Text } from "native-base";
import moment from "moment";
import styles from "./styles";

class Profile extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const navigation = this.props.navigation;

        const { birthday, first_name, work, id, uid } = this.props.navigation.state.params.user;
        const bio = work && work[0] && work[0].position ? work[0].position.name : null;
        const profileBday = moment(birthday, "MM/DD/YYYY");
        const profileAge = moment().diff(profileBday, "years");
        const fbImage = `https://graph.facebook.com/${id}/picture?height=500`;

        return (
            <Container>
                <Content
                    padder
                    scrollEnabled={false}
                    contentContainerStyle={styles.containerVertical}
                >
                    <TouchableOpacity onPress={() => navigation.navigate("UserDetails")}>
                        <Image source={{ uri: fbImage }} style={styles.profileImage} />
                    </TouchableOpacity>

                    <Text style={styles.nameAndAgeText}>
                        {first_name}, {profileAge}
                    </Text>
                    {bio ? <Text note>{bio}</Text> : <View />}
                    <Button
                        rounded
                        style={[styles.settingsBtn, { marginTop: 30 }]}
                        onPress={() => navigation.navigate("EditProfile")}
                    >
                        <Icon name="md-create" />
                        <Text>{this.context.t("Edit Profile")}</Text>
                    </Button>

                    <Button
                        rounded
                        style={styles.settingsBtn}
                        onPress={() => navigation.navigate("Settings")}
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
