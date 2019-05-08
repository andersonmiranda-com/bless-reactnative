import React from "react";
import { Root } from "native-base";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Login from "./screens/Login/";
import LoginMDB from "./screens/Login/login_mongo";
import HomeTabNavigation from "./screens/Home/tabNavigation";
import ChatList from "./screens/ChatList/";
import ChatScreen from "./screens/ChatScreen";
import PhotoCardDetails from "./screens/PhotoCardDetails";
import Settings from "./screens/Profile/Settings";
import UserDetails from "./screens/UserDetails";
import EditProfile from "./screens/EditProfile/editprofile";
import Profile from "./screens/Profile";
import CurrentWork from "./screens/EditProfile/currentWork";
import School from "./screens/EditProfile/school";
import AddPhoto from "./screens/EditProfile/addphoto";

const MainNavigator = createStackNavigator(
    {
        Login: { screen: Login },
        LoginMDB: { screen: LoginMDB },
        HomeTabNavigation: { screen: HomeTabNavigation },
        ChatList: { screen: ChatList },
        ChatScreen: { screen: ChatScreen },
        UserDetails: { screen: UserDetails },
        Settings: { screen: Settings },
        EditProfile: { screen: EditProfile },
        Profile: { screen: Profile },
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

const App = createAppContainer(MainNavigator);

export default () => (
    <Root>
        <App />
    </Root>
);
