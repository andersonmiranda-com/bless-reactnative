import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import {
  Container,
  Content,
  Icon,
  Button,
  ListItem,
  Title,
  Left,
  Right,
  Body,
  Header,
  Radio
} from "native-base";

class AddPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radio1: true,
      radio2: false,
      radio3: false
    };
  }

  toggleRadio1() {
    this.setState({
      radio1: true,
      radio2: false,
      radio3: false
    });
  }
  toggleRadio2() {
    this.setState({
      radio1: false,
      radio2: true,
      radio3: false
    });
  }
  toggleRadio3() {
    this.setState({
      radio1: false,
      radio2: false,
      radio3: true
    });
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#FFF" }}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back-outline" />
            </Button>
          </Left>
          <Body>
            <Title>Add Photo</Title>
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
                <Text style={styles.radioText}>Camera</Text>
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
                <Text style={styles.radioText}>Gallery</Text>
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
                <Text style={styles.radioText}>Google Drive</Text>
              </Left>
              <Right>
                <Radio
                  selected={this.state.radio3}
                  onPress={() => this.toggleRadio3()}
                />
              </Right>
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
  }
};

export default connect()(AddPhoto);
