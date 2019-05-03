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
    Right
} from "native-base";
import MultiSlider from "react-native-multi-slider";
import firebase from "firebase";
import styles from "./styles";
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

    constructor(props) {
        super(props);
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
                    <Left>
                        <Button transparent onPress={() => navigation.goBack()}>
                            <Icon name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Settings</Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={styles.container}>
                    <View style={{ paddingTop: 15, paddingHorizontal: 10 }}>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={styles.headerText}>Discovery Settings</Text>
                        </View>

                        <Card style={styles.card}>
                            <CardItem style={styles.cardItemHeaderView}>
                                <Text style={styles.sectionHeaderText}>Show Me</Text>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Text style={styles.cardItemText}>Men</Text>
                                </Left>
                                <Right>
                                    <Switch
                                        onValueChange={value =>
                                            this.setState({ trueSwitchIsOn: value })
                                        }
                                        trackColor={{ true: commonColor.brandPrimary }}
                                        thumbColor={
                                            Platform.OS === "android" ? "#ededed" : undefined
                                        }
                                        value={this.state.trueSwitchIsOn}
                                    />
                                </Right>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Text style={styles.cardItemText}>Women</Text>
                                </Left>
                                <Right>
                                    <Switch
                                        onValueChange={value =>
                                            this.setState({ falseSwitchIsOn: value })
                                        }
                                        trackColor={{ true: commonColor.brandPrimary }}
                                        thumbColor={
                                            Platform.OS === "android" ? "#ededed" : undefined
                                        }
                                        value={this.state.falseSwitchIsOn}
                                    />
                                </Right>
                            </CardItem>
                        </Card>

                        <Card style={styles.card}>
                            <CardItem style={styles.cardItemHeaderView}>
                                <Left>
                                    <Text style={styles.sectionHeaderText}>Search Distance</Text>
                                </Left>
                                <Right>
                                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                                        {distanceValue}
                                        km
                                    </Text>
                                </Right>
                            </CardItem>
                            <View
                                style={{ flex: 1, justifyContent: "center", paddingHorizontal: 19 }}
                            >
                                <MultiSlider
                                    selectedStyle={{ backgroundColor: commonColor.brandPrimary }}
                                    markerStyle={{
                                        backgroundColor:
                                            Platform.OS === "android"
                                                ? commonColor.brandPrimary
                                                : "white"
                                    }}
                                    max={100}
                                    sliderLength={width - 63}
                                    values={distanceValue}
                                    onValuesChange={value =>
                                        this.setState({ distanceValue: value })
                                    }
                                />
                            </View>
                        </Card>

                        <Card style={styles.card}>
                            <CardItem style={styles.cardItemHeaderView}>
                                <Left>
                                    <Text style={styles.sectionHeaderText}>Age Range</Text>
                                </Left>
                                <Right>
                                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                                        {ageRangeValues.join("-")}
                                    </Text>
                                </Right>
                            </CardItem>
                            <View
                                style={{ flex: 1, justifyContent: "center", paddingHorizontal: 19 }}
                            >
                                <MultiSlider
                                    selectedStyle={{ backgroundColor: commonColor.brandPrimary }}
                                    markerStyle={{
                                        backgroundColor:
                                            Platform.OS === "android"
                                                ? commonColor.brandPrimary
                                                : "white"
                                    }}
                                    min={18}
                                    max={70}
                                    sliderLength={width - 63}
                                    values={ageRangeValues}
                                    onValuesChange={value => {
                                        this.setState({ ageRangeValues: value });
                                    }}
                                />
                            </View>
                        </Card>

                        <Card style={styles.card}>
                            <CardItem>
                                <Left>
                                    <Text style={styles.swipText}>Show me on Bless</Text>
                                </Left>
                                <Right>
                                    <Switch
                                        onValueChange={value =>
                                            this.setState({ trueSwitchIsOn2: value })
                                        }
                                        trackColor={{ true: commonColor.brandPrimary }}
                                        thumbColor={
                                            Platform.OS === "android" ? "#ededed" : undefined
                                        }
                                        value={this.state.trueSwitchIsOn2}
                                    />
                                </Right>
                            </CardItem>
                        </Card>

                        <View style={{ marginTop: 15, marginBottom: 10 }}>
                            <Text style={styles.headerText}>App Settings</Text>
                        </View>

                        <View>
                            <Card style={styles.card}>
                                <CardItem style={styles.cardItemHeaderView}>
                                    <Text style={styles.sectionHeaderText}>Notifications</Text>
                                </CardItem>

                                <CardItem>
                                    <Left>
                                        <Text style={styles.cardItemText}>New Matches</Text>
                                    </Left>
                                    <Right>
                                        <Switch
                                            onValueChange={value =>
                                                this.setState({ notSwitch1: value })
                                            }
                                            trackColor={{ true: commonColor.brandPrimary }}
                                            thumbColor={
                                                Platform.OS === "android" ? "#ededed" : undefined
                                            }
                                            value={this.state.notSwitch1}
                                        />
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Text style={styles.cardItemText}>Messages</Text>
                                    </Left>
                                    <Right>
                                        <Switch
                                            onValueChange={value =>
                                                this.setState({ notSwitch2: value })
                                            }
                                            trackColor={{ true: commonColor.brandPrimary }}
                                            thumbColor={
                                                Platform.OS === "android" ? "#ededed" : undefined
                                            }
                                            value={this.state.notSwitch2}
                                        />
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Text style={styles.cardItemText}>Message Likes</Text>
                                    </Left>
                                    <Right>
                                        <Switch
                                            onValueChange={value =>
                                                this.setState({ notSwitch3: value })
                                            }
                                            trackColor={{ true: commonColor.brandPrimary }}
                                            thumbColor={
                                                Platform.OS === "android" ? "#ededed" : undefined
                                            }
                                            value={this.state.notSwitch3}
                                        />
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Text style={styles.cardItemText}>Super Likes</Text>
                                    </Left>
                                    <Right>
                                        <Switch
                                            onValueChange={value =>
                                                this.setState({ notSwitch4: value })
                                            }
                                            trackColor={{ true: commonColor.brandPrimary }}
                                            thumbColor={
                                                Platform.OS === "android" ? "#ededed" : undefined
                                            }
                                            value={this.state.notSwitch4}
                                        />
                                    </Right>
                                </CardItem>
                            </Card>
                        </View>

                        <View style={{ marginBottom: 10 }}>
                            <Card style={styles.card}>
                                <CardItem style={styles.cardItemHeaderView}>
                                    <Left>
                                        <Text style={styles.sectionHeaderText}>
                                            Show Distance in
                                        </Text>
                                    </Left>
                                    <Right>
                                        <Text style={{ fontSize: 16, fontWeight: "600" }}>
                                            {this.state.disKM ? "Km." : "Mi."}
                                        </Text>
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Button
                                        block
                                        transparent
                                        style={{
                                            flex: 2,
                                            backgroundColor: this.state.disKM
                                                ? commonColor.brandPrimary
                                                : "transparent"
                                        }}
                                        onPress={() => this.changeDisType(1)}
                                    >
                                        <Text
                                            style={{
                                                color: this.state.disKM
                                                    ? "#FFF"
                                                    : commonColor.contentTextColor,
                                                fontSize: 16,
                                                fontWeight: "700"
                                            }}
                                        >
                                            Km.
                                        </Text>
                                    </Button>
                                    <Button
                                        block
                                        transparent
                                        style={{
                                            flex: 2,
                                            backgroundColor: !this.state.disKM
                                                ? commonColor.brandPrimary
                                                : "transparent"
                                        }}
                                        onPress={() => this.changeDisType(2)}
                                    >
                                        <Text
                                            style={{
                                                color: !this.state.disKM
                                                    ? "#FFF"
                                                    : commonColor.contentTextColor,
                                                fontSize: 16,
                                                fontWeight: "700"
                                            }}
                                        >
                                            Mi.
                                        </Text>
                                    </Button>
                                </CardItem>
                            </Card>
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Card style={styles.card}>
                                <CardItem style={styles.cardItemHeaderView}>
                                    <Text style={styles.sectionHeaderText}>Legal</Text>
                                </CardItem>
                                <View style={{ paddingLeft: 3, marginBottom: 10 }}>
                                    <Button transparent small>
                                        <Text style={styles.cardItemText}>Licenses</Text>
                                    </Button>
                                    <Button transparent small>
                                        <Text style={styles.cardItemText}>Privacy Policy</Text>
                                    </Button>
                                    <Button transparent small>
                                        <Text style={styles.cardItemText}>Terms of Service</Text>
                                    </Button>
                                </View>
                            </Card>
                        </View>

                        <Button block rounded bordered primary>
                            <Text>Help & Support</Text>
                        </Button>

                        <Button
                            primary
                            rounded
                            block
                            style={{ marginVertical: 15 }}
                            onPress={() => this.logout()}
                        >
                            <Text>Logout</Text>
                        </Button>

                        <View style={{ alignItems: "center", marginVertical: 20 }}>
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

export default Settings;
