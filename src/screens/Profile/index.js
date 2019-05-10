import React, { Component } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Content, Icon, Button, Text } from "native-base";
import moment from "moment";
import styles from "./styles";

class Profile extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            user: this.props.userState
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps) {
        const newProps = this.props;
        if (prevProps.userState !== newProps.userState) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ user: newProps.userState });
        }
    }

    render() {
        const navigation = this.props.navigation;
        const { user } = this.state;
        const { birthday, first_name, bio, image, _id } = user;
        const profileAge = moment().diff(birthday, "years");

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

function mapStateToProps(state) {
    return {
        userState: state.userState
    };
}

export default connect(mapStateToProps)(Profile);
