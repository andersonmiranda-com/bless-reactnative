import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import { Icon, Header, FooterTab, Button, Thumbnail } from "native-base";
import Profile from "../Profile";
import PhotoCard from "../PhotoCard";
import Chat from "../Chat";
import styles from "./styles";

const HomeTabNavigation = createBottomTabNavigator(
  {
    Profile: { screen: Profile },
    PhotoCard: { screen: PhotoCard },
    Chat: { screen: Chat }
  },
  {
    tabBarPosition: "top",
    initialRouteName: "PhotoCard",
    lazy: true,
    tabBarComponent: props => {
      return (
        <Header>
          <FooterTab>
            <Button onPress={() => props.navigation.navigate("Profile")}>
              <Icon
                name="md-person"
                size={20}
                style={
                  props.navigation.state.index === 0
                    ? styles.activeIcon
                    : styles.inActiveIcon
                }
              />
            </Button>

            <Button onPress={() => props.navigation.navigate("PhotoCard")}>
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
                style={
                  props.navigation.state.index === 2
                    ? styles.activeIcon
                    : styles.inActiveIcon
                }
              />
            </Button>
          </FooterTab>
        </Header>
      );
    }
  }
);

export default HomeTabNavigation;
