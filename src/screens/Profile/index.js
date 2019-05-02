import React, { Component } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { Container, Content, Icon, Button, Text } from "native-base";
import commonColor from "../../theme/variables/commonColor";
import styles from "./styles";

class Profile extends Component {
    render() {
        const navigation = this.props.navigation;
        return (
            <Container style={styles.container}>
                <Content scrollEnabled={false}>
                    <View style={styles.profileImageView}>
                        <TouchableOpacity onPress={() => navigation.navigate("UserDetails")}>
                            <Image
                                source={require("../../../assets/federer.jpg")}
                                style={styles.profileImage}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.profileDescriptionView}>
                        <Text style={styles.nameAndAgeText}>Roger Federer, 32yr</Text>
                        <View style={{ padding: 5 }}>
                            <Text style={styles.workplaceText}>World Class Tennis Player</Text>
                        </View>
                        <Text style={styles.workplaceText}>JCE, Bangalore</Text>

                        <Button
                            transparent
                            onPress={() => navigation.navigate("EditProfile")}
                            style={styles.settingsBtn}
                        >
                            <Icon name="create" style={{ color: commonColor.brandPrimary }} />
                            <Text style={styles.settingsBtnText}>Edit Profile</Text>
                        </Button>

                        <Button
                            transparent
                            onPress={() => navigation.navigate("Settings")}
                            style={styles.settingsBtn}
                        >
                            <Icon name="md-settings" style={{ color: commonColor.brandPrimary }} />
                            <Text style={styles.settingsBtnText}>Preferences</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default Profile;
