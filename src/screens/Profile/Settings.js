import React, { Component } from "react";
import { Image, View, Platform } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import {
    Container,
    Content,
    Icon,
    Switch,
    Button,
    Header,
    Title,
    Left,
    Text,
    Body,
    Right,
    List,
    ListItem,
    Item,
    Separator,
    Label
} from "native-base";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateCards } from "../../actions/Cards";

import OfflineNotice from "../../components/OfflineNotice";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Stitch, RemoteMongoClient, BSON } from "mongodb-stitch-react-native-sdk";
import styles from "../../theme/style.js";
import commonColor from "../../theme/variables/commonColor";
var Dimensions = require("Dimensions");
var { width } = Dimensions.get("window");

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "Login" })]
});

class Settings extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            user: this.props.navigation.state.params.user
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

    componentDidMount() {
        console.log(this.state.user);
    }

    updateUser = (key, value) => {
        this.setState(prevState => {
            return {
                user: {
                    ...prevState.user,
                    [key]: value
                }
            };
        });
    };

    saveUser() {
        const { user } = this.state;
        const usersCollection = this.db.collection("users");
        usersCollection.updateOne({ _id: user._id }, { $set: user }).then(res => {
            this.props.updateCards(user, true);
            this.props.navigation.goBack();
        });
    }

    logout() {
        const { navigation } = this.props;
        firebase
            .auth()
            .signOut()
            .then(() => {
                navigation.dispatch(resetAction);
            });
    }

    changeDisType(val) {
        if (val === 1) {
            this.setState({ disKM: true });
        } else {
            this.setState({ disKM: false });
        }
    }

    render() {
        const { ageRange, distance, showMen, showWomen, showMe } = this.state.user;
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>{this.context.t("Settings")}</Title>
                    </Body>

                    <Right>
                        <Button transparent onPress={() => this.saveUser()}>
                            <Text>{this.context.t("Ok")}</Text>
                        </Button>
                    </Right>
                </Header>

                <OfflineNotice />
                <Content style={styles.backgroundLight} bounces={false}>
                    <List>
                        <Separator bordered noTopBorder>
                            <Text>{this.context.t("DISCOVERY")}</Text>
                        </Separator>

                        <Item fixedLabelSmall noBordered>
                            <Label>{this.context.t("Show me")}</Label>
                        </Item>

                        <Item vpadder noBordered>
                            <Left>
                                <Text>{this.context.t("Men")}</Text>
                            </Left>
                            <Right>
                                <Switch
                                    trackColor={{ true: commonColor.brandPrimary }}
                                    thumbColor={Platform.OS === "android" ? "#ededed" : undefined}
                                    value={showMen}
                                    onValueChange={val => {
                                        this.updateUser("showMen", val);
                                    }}
                                />
                            </Right>
                        </Item>

                        <Item vpadder>
                            <Left>
                                <Text>{this.context.t("Women")}</Text>
                            </Left>
                            <Right>
                                <Switch
                                    trackColor={{ true: commonColor.brandPrimary }}
                                    thumbColor={Platform.OS === "android" ? "#ededed" : undefined}
                                    value={showWomen}
                                    onValueChange={val => {
                                        this.updateUser("showWomen", val);
                                    }}
                                />
                            </Right>
                        </Item>

                        <Item fixedLabelSmall noBordered>
                            <Left>
                                <Text>{this.context.t("Search Distance")}</Text>
                            </Left>
                            <Right>
                                <Text>{distance} km</Text>
                            </Right>
                        </Item>
                        <Item>
                            <MultiSlider
                                selectedStyle={{ backgroundColor: commonColor.brandPrimary }}
                                markerStyle={{
                                    backgroundColor:
                                        Platform.OS === "android"
                                            ? commonColor.brandPrimary
                                            : "white"
                                }}
                                max={100}
                                sliderLength={width - 28}
                                values={[distance]}
                                onValuesChange={val => this.updateUser("distance", val[0])}
                                //onValuesChangeFinish={val => this.saveUser("distance", val)}
                            />
                        </Item>

                        <Item fixedLabelSmall noBordered>
                            <Left>
                                <Text>{this.context.t("Age Range")}</Text>
                            </Left>
                            <Right>
                                <Text>{ageRange.join("-")}</Text>
                            </Right>
                        </Item>
                        <Item>
                            <MultiSlider
                                selectedStyle={{ backgroundColor: commonColor.brandPrimary }}
                                markerStyle={{
                                    backgroundColor:
                                        Platform.OS === "android"
                                            ? commonColor.brandPrimary
                                            : "white"
                                }}
                                min={18}
                                max={100}
                                sliderLength={width - 28}
                                values={ageRange}
                                onValuesChange={val => this.updateUser("ageRange", val)}
                                //onValuesChangeFinish={val => this.saveUser("ageRange", val)}
                            />
                        </Item>

                        <Separator bordered noTopBorder small />

                        <Item vpadder>
                            <Left>
                                <Text>{this.context.t("Show me on Bless")}</Text>
                            </Left>
                            <Right>
                                <Switch
                                    trackColor={{ true: commonColor.brandPrimary }}
                                    thumbColor={Platform.OS === "android" ? "#ededed" : undefined}
                                    value={showMe}
                                    onValueChange={val => {
                                        this.updateUser("showMe", val);
                                        this.saveUser("showMe", val);
                                    }}
                                />
                            </Right>
                        </Item>

                        <Separator bordered noTopBorder>
                            <Text>{this.context.t("APPLICATION SETTINGS")}</Text>
                        </Separator>

                        <Item fixedLabelSmall noBordered>
                            <Label>{this.context.t("Notifications")}</Label>
                        </Item>

                        <Item vpadder noBordered>
                            <Left>
                                <Text>{this.context.t("New Matches")}</Text>
                            </Left>
                            <Right>
                                <Switch
                                    onValueChange={value =>
                                        this.setState({ trueSwitchIsOn: value })
                                    }
                                    trackColor={{ true: commonColor.brandPrimary }}
                                    thumbColor={Platform.OS === "android" ? "#ededed" : undefined}
                                    value={this.state.trueSwitchIsOn}
                                />
                            </Right>
                        </Item>

                        <Item vpadder noBordered>
                            <Left>
                                <Text>{this.context.t("Messages")}</Text>
                            </Left>
                            <Right>
                                <Switch
                                    onValueChange={value =>
                                        this.setState({ falseSwitchIsOn: value })
                                    }
                                    trackColor={{ true: commonColor.brandPrimary }}
                                    thumbColor={Platform.OS === "android" ? "#ededed" : undefined}
                                    value={this.state.falseSwitchIsOn}
                                />
                            </Right>
                        </Item>

                        <Item vpadder>
                            <Left>
                                <Text>{this.context.t("Super Likes")}</Text>
                            </Left>
                            <Right>
                                <Switch
                                    onValueChange={value =>
                                        this.setState({ falseSwitchIsOn: value })
                                    }
                                    trackColor={{ true: commonColor.brandPrimary }}
                                    thumbColor={Platform.OS === "android" ? "#ededed" : undefined}
                                    value={this.state.falseSwitchIsOn}
                                />
                            </Right>
                        </Item>

                        <Separator bordered noTopBorder>
                            <Text>{this.context.t("LEGAL INFORMATION")}</Text>
                        </Separator>

                        <ListItem noIdent>
                            <Left>
                                <Text>{this.context.t("Privacy Policy")}</Text>
                            </Left>
                            <Right>
                                <Icon active name="ios-arrow-forward" />
                            </Right>
                        </ListItem>

                        <ListItem>
                            <Left>
                                <Text>{this.context.t("Terms of Service")}</Text>
                            </Left>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                    </List>

                    <View style={{ paddingTop: 15, paddingHorizontal: 10 }}>
                        <Button block rounded bordered primary>
                            <Text>{this.context.t("Help & Support")}</Text>
                        </Button>

                        <Button
                            primary
                            rounded
                            block
                            style={{ marginVertical: 15 }}
                            onPress={() => this.logout()}
                        >
                            <Text>{this.context.t("Logout")}</Text>
                        </Button>

                        <View
                            style={{ alignItems: "center", marginVertical: 20, marginBottom: 40 }}
                        >
                            <Image
                                source={require("../../../assets/logo.png")}
                                style={{ width: 40, height: 40 }}
                            />
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

Settings.contextTypes = {
    t: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        userState: state.userState,
        cardsState: state.cardsState
    };
}

export default connect(
    mapStateToProps,
    { updateCards }
)(Settings);
