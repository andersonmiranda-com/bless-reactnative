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
    Card,
    CardItem,
    Left,
    Text,
    Body,
    Right,
    Form,
    List,
    ListItem,
    Item,
    Separator,
    Label,
    Input
} from "native-base";
import PropTypes from "prop-types";
import OfflineNotice from "../../components/OfflineNotice";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import firebase from "firebase";
import styles from "../../theme/style.js";
import commonColor from "../../theme/variables/commonColor";
var Dimensions = require("Dimensions");
var { width } = Dimensions.get("window");

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "Login" })]
});

class Settings extends Component {
    state = {
        distanceValue: [10],
        ageRangeValues: [25, 35],

        trueSwitchIsOn: true,
        trueSwitchIsOn2: true,
        trueSwitchIsOn3: true,
        falseSwitchIsOn: false,
        notSwitch1: true,
        notSwitch2: true,
        notSwitch3: true,
        notSwitch4: true,
        leftValue: 25,
        rightValue: 35,
        disKM: true
    };

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {}

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
        const { navigation } = this.props;
        const { ageRangeValues, distanceValue } = this.state;
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                        <Title>{this.context.t("Settings")}</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => navigation.goBack()}>
                            <Text>{this.context.t("OK")}</Text>
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
                                    onValueChange={value =>
                                        this.setState({ trueSwitchIsOn: value })
                                    }
                                    trackColor={{ true: commonColor.brandPrimary }}
                                    thumbColor={Platform.OS === "android" ? "#ededed" : undefined}
                                    value={this.state.trueSwitchIsOn}
                                />
                            </Right>
                        </Item>

                        <Item vpadder>
                            <Left>
                                <Text>{this.context.t("Women")}</Text>
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

                        <Item fixedLabelSmall noBordered>
                            <Left>
                                <Text>{this.context.t("Search Distance")}</Text>
                            </Left>
                            <Right>
                                <Text>{distanceValue} km</Text>
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
                                values={distanceValue}
                                onValuesChange={value => this.setState({ distanceValue: value })}
                            />
                        </Item>

                        <Item fixedLabelSmall noBordered>
                            <Left>
                                <Text>{this.context.t("Age Range")}</Text>
                            </Left>
                            <Right>
                                <Text>{ageRangeValues.join("-")}</Text>
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
                                values={ageRangeValues}
                                onValuesChange={value => {
                                    this.setState({ ageRangeValues: value });
                                }}
                            />
                        </Item>

                        <Separator bordered noTopBorder small />

                        <Item vpadder>
                            <Left>
                                <Text>{this.context.t("Show me on Bless")}</Text>
                            </Left>
                            <Right>
                                <Switch
                                    onValueChange={value =>
                                        this.setState({ trueSwitchIsOn2: value })
                                    }
                                    trackColor={{ true: commonColor.brandPrimary }}
                                    thumbColor={Platform.OS === "android" ? "#ededed" : undefined}
                                    value={this.state.trueSwitchIsOn2}
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

export default Settings;
