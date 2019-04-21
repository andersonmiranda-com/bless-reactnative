import React, { Component } from "react";
import { Image, View, Text, Slider, Platform } from "react-native";
import { NavigationActions ,StackActions} from "react-navigation";
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
  Body,
  Right
} from "native-base";
import styles from "./styles";
import commonColor from "../../theme/variables/commonColor";

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Login" })]
});

class Settings extends Component {
  state = {
    trueSwitchIsOn: true,
    trueSwitchIsOn2: true,
    trueSwitchIsOn3: true,
    falseSwitchIsOn: false,
    notSwitch1: true,
    notSwitch2: true,
    notSwitch3: true,
    notSwitch4: true,
    sliderValue: 0,
    leftValue: 25,
    rightValue: 35,
    disKM: true
  };

  changeDisType(val) {
    if (val === 1) {
      this.setState({ disKM: true });
    } else {
      this.setState({ disKM: false });
    }
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="ios-arrow-back-outline" />
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
              <Text style={styles.text}>Discovery Settings</Text>
            </View>
            <Card>
              <CardItem style={styles.locationSwipperCarditem}>
                <Text style={styles.cardItemText}>Swiping in</Text>
                <Text style={styles.textBlue}>My Current Location</Text>
              </CardItem>
            </Card>
            <View>
              <Text style={styles.someText}>
                Change your swipe location to see Tinder members in other cities
              </Text>
            </View>
            <Card style={styles.card}>
              <CardItem style={styles.cardItemHeaderView}>
                <Text style={styles.redText}>Show Me</Text>
              </CardItem>
              <CardItem>
                <Left>
                  <Text style={styles.cardItemText}>Men</Text>
                </Left>
                <Right>
                  <Switch
                    onValueChange={value =>
                      this.setState({ trueSwitchIsOn: value })}
                    onTintColor={commonColor.brandPrimary}
                    thumbTintColor={
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
                      this.setState({ falseSwitchIsOn: value })}
                    onTintColor={commonColor.brandPrimary}
                    thumbTintColor={
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
                  <Text style={styles.redText}>Search Distance</Text>
                </Left>
                <Right>
                  <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    {this.state.sliderValue}km.
                  </Text>
                </Right>
              </CardItem>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Slider
                  style={{ margin: 10 }}
                  onValueChange={value => this.setState({ sliderValue: value })}
                  maximumValue={100}
                  minimumTrackTintColor={commonColor.brandPrimary}
                  step={1}
                />
              </View>
            </Card>
            <CardItem style={styles.switchBlock}>
              <Left>
                <Text style={styles.swipText}>Show me on DatingApp</Text>
              </Left>
              <Right>
                <Switch
                  onValueChange={value =>
                    this.setState({ trueSwitchIsOn2: value })}
                  onTintColor={commonColor.brandPrimary}
                  thumbTintColor={
                    Platform.OS === "android" ? "#ededed" : undefined
                  }
                  value={this.state.trueSwitchIsOn2}
                />
              </Right>
            </CardItem>
            <View>
              <Text style={styles.someText}>
                DatingApp uses these preferences to suggest matches.Some match
                suggestions may not fall within your desired parameters.
              </Text>
            </View>

            <Card style={styles.card}>
              <CardItem style={styles.cardItemHeaderView}>
                <Left>
                  <Text style={styles.redText}>Web Profile</Text>
                </Left>
              </CardItem>
              <CardItem>
                <Left>
                  <Text style={{ color: commonColor.contentTextColor }}>
                    Username
                  </Text>
                </Left>
                <Right>
                  <Text style={{ color: commonColor.contentTextColor }}>
                    Claim Yours
                  </Text>
                </Right>
              </CardItem>
              <CardItem style={styles.cardItemHeaderView}>
                <Text
                  style={{
                    color: commonColor.lightTextColor,
                    fontSize: 12
                  }}
                >
                  Create a username. Share your username. Have people all over
                  the world swipe you right on DatingApp
                </Text>
              </CardItem>
            </Card>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.text}>App Settings</Text>
            </View>
            <View>
              <Card style={{ borderRadius: 5 }}>
                <CardItem style={{ borderRadius: 5 }}>
                  <Text style={styles.redText}>Notifications</Text>
                </CardItem>
                <CardItem>
                  <Left>
                    <Text style={styles.cardItemText}>New Matches</Text>
                  </Left>
                  <Right>
                    <Switch
                      onValueChange={value =>
                        this.setState({ notSwitch1: value })}
                      onTintColor={commonColor.brandPrimary}
                      thumbTintColor={
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
                        this.setState({ notSwitch2: value })}
                      onTintColor={commonColor.brandPrimary}
                      thumbTintColor={
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
                        this.setState({ notSwitch3: value })}
                      onTintColor={commonColor.brandPrimary}
                      thumbTintColor={
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
                        this.setState({ notSwitch4: value })}
                      onTintColor={commonColor.brandPrimary}
                      thumbTintColor={
                        Platform.OS === "android" ? "#ededed" : undefined
                      }
                      value={this.state.notSwitch4}
                    />
                  </Right>
                </CardItem>
              </Card>
            </View>

            <View style={{ marginVertical: 10 }}>
              <Card style={styles.card}>
                <CardItem style={styles.cardItemHeaderView}>
                  <Left>
                    <Text style={styles.redText}>Show Distance in</Text>
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

            <View style={{ marginVertical: 10 }}>
              <Text style={styles.text}>Contact Us</Text>
            </View>
            <Button block style={styles.helpBtn}>
              <Text style={styles.helpBtnText}>Help & Support</Text>
            </Button>

            <View style={{ marginVertical: 10 }}>
              <Card style={{ borderRadius: 5 }}>
                <CardItem style={{ borderRadius: 5 }}>
                  <Text style={styles.redText}>Legal</Text>
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

            <Button
              block
              style={styles.helpBtn}
              onPress={() => navigation.dispatch(resetAction)}
            >
              <Text style={styles.helpBtnText}>Logout</Text>
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
