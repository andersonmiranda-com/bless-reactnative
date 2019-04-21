import React, {Component} from "react";
import {connect} from "react-redux";
import {
  View,
  Text,
  Dimensions,
  Platform,
  ActivityIndicator
} from "react-native";
import {
  Container,
  Button,
  Icon,
  Header,
  Title,
  Left,
  Right,
  Body,
  Thumbnail
} from "native-base";
import {GiftedChat, Actions, Bubble, Send} from "react-native-gifted-chat";
import CustomActions from "./CustomActions";
import commonColor from "../../theme/variables/commonColor";
import styles from "./styles";

var {height} = Dimensions.get("window");

class chatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this._isAlright = null;
    this.userName = this.props.navigation.state.params.name;
  }

  componentWillMount() {
    this._isMounted = true;
    this.setState(() => {
      return {
        messages: require("./data.js")
      };
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({show: true});
    }, 600);
  }

  onLoadEarlier() {
    this.setState(previousState => {
      return {
        isLoadingEarlier: true
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState(previousState => {
          return {
            messages: GiftedChat.prepend(
              previousState.messages,
              require("./old.js")
            ),
            loadEarlier: false,
            isLoadingEarlier: false
          };
        });
      }
    }, 1000); // simulating network
  }

  onSend(messages = []) {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      };
    });

    // for demo purpose
    this.answerDemo(messages);
  }

  answerDemo(messages) {
    if (messages.length > 0) {
      if (messages[0].image || messages[0].location || !this._isAlright) {
        this.setState(previousState => {
          return {
            typingText: this.userName + " is typing"
          };
        });
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive("Nice picture!");
          } else if (messages[0].location) {
            this.onReceive("My favorite place");
          } else {
            if (!this._isAlright) {
              this._isAlright = true;
              this.onReceive("Alright");
            }
          }
        }
      }

      this.setState(previousState => {
        return {
          typingText: null
        };
      });
    }, 1000);
  }

  onReceive(text) {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Federer"
            // avatar: 'https://facebook.github.io/react/img/logo_og.png',
          }
        })
      };
    });
  }

  renderCustomActions(props) {
    if (Platform.OS === "android" || "ios") {
      return <CustomActions {...props} />;
    }
    const options = {
      "Action 1": Props => {
        alert("option 1"); // eslint-disable-line no-alert
      },
      "Action 2": Props => {
        alert("option 2"); // eslint-disable-line no-alert
      },
      Cancel: () => {}
    };
    return <Actions {...props} options={options} />;
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#f0f0f0"
          },
          right: {
            backgroundColor: "#F7524C"
          }
        }}
      />
    );
  }
  renderSend(props) {
    return (
      <Send
        {...props}
        containerStyle={{
          height: 30,
          margin: 0,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          right: 10,
          top: 3,
        }}
        textStyle={{color: commonColor.brandPrimary, margin: 0}}
      />
    );
  }

  renderAvatar(props) {
    return <Thumbnail small source={require("../../../assets/e1.jpg")} />;
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  render() {
    const navigation = this.props.navigation;
    if (!this.state.show) {
      return (
        <View style={{flex: 1}}>
          <ActivityIndicator
            size="large"
            color={commonColor.brandPrimary}
            style={{top: height / 2.2}}
          />
        </View>
      );
    } else {
      return (
        <Container style={{backgroundColor: "#FFF"}}>
          <Header>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon name="ios-arrow-back" />
              </Button>
            </Left>
            <Body style={{flex:3}}>
              <Title>
                {navigation.state.params.name}
              </Title>
            </Body>
            <Right />
          </Header>
          <View style={{flex: 1}}>
            <GiftedChat
              messages={this.state.messages}
              onSend={this.onSend}
              loadEarlier={this.state.loadEarlier}
              onLoadEarlier={this.onLoadEarlier}
              isLoadingEarlier={this.state.isLoadingEarlier}
              user={{
                _id: 1 // sent messages should have same user._id
              }}
              renderActions={this.renderCustomActions}
              renderBubble={this.renderBubble}
              renderFooter={this.renderFooter}
              renderAvatar={this.renderAvatar}
              renderSend={this.renderSend}
            />
          </View>
        </Container>
      );
    }
  }
}

export default connect()(chatScreen);
