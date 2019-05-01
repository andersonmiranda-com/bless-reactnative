import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import { Icon, Footer, FooterTab, Button, Thumbnail } from "native-base";
import Profile from "../Profile";
import Home from "./index.js";
import Chat from "../Chat";
import styles from "./styles";

const HomeTabNavigation = createBottomTabNavigator(
    {
        Profile: { screen: Profile },
        Home: { screen: Home },
        Chat: { screen: Chat }
    },
    {
        tabBarPosition: "top",
        initialRouteName: "Home",
        lazy: true,
        tabBarComponent: props => {
            return (
                <Footer>
                    <FooterTab>
                        <Button onPress={() => props.navigation.navigate("Profile")}>
                            <Icon
                                name="md-person"
                                style={[
                                    props.navigation.state.index === 0
                                        ? styles.activeIcon
                                        : styles.inActiveIcon,
                                    { fontSize: 24 }
                                ]}
                            />
                        </Button>

                        <Button onPress={() => props.navigation.navigate("Home")}>
                            <Thumbnail
                                small
                                source={
                                    props.navigation.state.index === 1
                                        ? require("../../../assets/logo.png")
                                        : require("../../../assets/logo1.png")
                                }
                            />
                        </Button>

                        <Button onPress={() => props.navigation.navigate("Chat")}>
                            <Icon
                                name="md-chatboxes"
                                style={[
                                    props.navigation.state.index === 2
                                        ? styles.activeIcon
                                        : styles.inActiveIcon,
                                    { fontSize: 24 }
                                ]}
                            />
                        </Button>
                    </FooterTab>
                </Footer>
            );
        }
    }
);

export default HomeTabNavigation;
