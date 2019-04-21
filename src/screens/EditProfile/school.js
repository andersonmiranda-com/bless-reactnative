import React, { Component } from "react";
import { Text, View } from "react-native";
import {
  Container,
  Content,
  Icon,
  Button,
  ListItem,
  Header,
  Title,
  Left,
  Right,
  Body,
  Radio
} from "native-base";
import commonColor from "../../theme/variables/commonColor";

class School extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radio1: true,
      radio2: false,
      radio3: false,
      radio4: false
    };
  }

  toggleRadio1() {
    this.setState({
      radio1: true,
      radio2: false,
      radio3: false,
      radio4: false
    });
  }
  toggleRadio2() {
    this.setState({
      radio1: false,
      radio2: true,
      radio3: false,
      radio4: false
    });
  }
  toggleRadio3() {
    this.setState({
      radio1: false,
      radio2: false,
      radio3: true,
      radio4: false
    });
  }
  toggleRadio4() {
    this.setState({
      radio1: false,
      radio2: false,
      radio3: false,
      radio4: true
    });
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "#FFF" }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back-outline" />
            </Button>
          </Left>
          <Body>
            <Title>School</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.container}>
          <View style={styles.listView}>
            <ListItem
              selected={this.state.radio1}
              onPress={() => this.toggleRadio1()}
            >
              <Left>
                <Text style={styles.radioText}>JCE, Bangalore</Text>
              </Left>
              <Right>
                <Radio
                  selected={this.state.radio1}
                  onPress={() => this.toggleRadio1()}
                />
              </Right>
            </ListItem>
            <ListItem
              selected={this.state.radio2}
              onPress={() => this.toggleRadio2()}
            >
              <Left>
                <Text style={styles.radioText}>PESIT, Bangalore</Text>
              </Left>
              <Right>
                <Radio
                  selected={this.state.radio2}
                  onPress={() => this.toggleRadio2()}
                />
              </Right>
            </ListItem>
            <ListItem
              selected={this.state.radio3}
              onPress={() => this.toggleRadio3()}
            >
              <Left>
                <Text style={styles.radioText}>
                  JSS Academy of Technical Education, Bangalore
                </Text>
              </Left>
              <Right>
                <Radio
                  selected={this.state.radio3}
                  onPress={() => this.toggleRadio3()}
                />
              </Right>
            </ListItem>
            <ListItem
              selected={this.state.radio4}
              last
              onPress={() => this.toggleRadio4()}
            >
              <Left>
                <Text style={styles.radioText}>
                  Oxford University, Bangalore
                </Text>
              </Left>
              <Right>
                <Radio
                  selected={this.state.radio4}
                  onPress={() => this.toggleRadio4()}
                />
              </Right>
            </ListItem>
          </View>
          <View style={styles.noteView}>
            <Text style={styles.noteText}>
              If your school isnt shown, please update it on facebook and it
              will appear here.
            </Text>
          </View>
          <View style={styles.listView}>
            <ListItem>
              <Text style={styles.radioText}>None </Text>
            </ListItem>
          </View>
        </Content>
      </Container>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  listView: {
    backgroundColor: "white",
    flexDirection: "column"
  },
  radioText: {
    marginLeft: 10,
    color: "black"
  },
  noteView: {
    marginLeft: 0,
    marginRight: 0,
    padding: 8,
    backgroundColor: "#f5f5f5",
    height: 50
  },
  noteText: {
    color: commonColor.lightTextColor,
    fontSize: 12,
    textAlign: "center"
  }
};

export default School;
