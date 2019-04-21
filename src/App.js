import React from "react";
import { Root } from "native-base";
import { createStackNavigator } from "react-navigation";

import Login from "./screens/Login/";
import HomeTabNavigation from "./screens/Home/tabNavigation";
import ChatList from "./screens/ChatList/";
import ChatScreen from "./screens/ChatScreen";
import PhotoCardDetails from "./screens/PhotoCardDetails";
import Settings from "./screens/Settings";
import UserDetails from "./screens/UserDetails";
import EditProfile from "./screens/EditProfile/editprofile";
import CurrentWork from "./screens/EditProfile/currentWork";
import School from "./screens/EditProfile/school";
import AddPhoto from "./screens/EditProfile/addphoto";

const App = createStackNavigator(
  {
    Login: { screen: Login },
    HomeTabNavigation: { screen: HomeTabNavigation },
    ChatList: { screen: ChatList },
    ChatScreen: { screen: ChatScreen },
    UserDetails: { screen: UserDetails },
    Settings: { screen: Settings },
    EditProfile: { screen: EditProfile },
    AddPhoto: { screen: AddPhoto },
    CurrentWork: { screen: CurrentWork },
    School: { screen: School },
    PhotoCardDetails: { screen: PhotoCardDetails }
  },
  {
    index: 0,
    initialRouteName: "Login",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <App />
  </Root>;
