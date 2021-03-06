import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Container,
    Content,
    Button,
    Icon,
    Header,
    Title,
    ListItem,
    Thumbnail,
    Left,
    Right,
    Body,
    List, Text
} from "native-base";
import { NavigationActions } from "react-navigation";
import styles from "./styles";
import data from "./data";

const navigateAction = name =>
    NavigationActions.navigate({
        routeName: "ChatScreen",
        params: { name: name }
    });

class ChatList extends Component {
    render() {
        const navigation = this.props.navigation;
        return (
            <Container style={{ backgroundColor: "#FFF" }}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => navigation.goBack()}>
                            <Icon name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Matches</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <List
                        removeClippedSubviews={false}
                        style={{ marginTop: 7 }}
                        dataArray={data}
                        renderRow={dataRow => (
                            <ListItem
                                avatar
                                button
                                style={{ marginLeft: 15 }}
                                onPress={() => navigation.dispatch(navigateAction(dataRow.name))}
                            >
                                <Left>
                                    <Thumbnail round source={dataRow.thumbnail} />
                                </Left>
                                <Body>
                                    <Text style={styles.userNameText}>{dataRow.name}</Text>
                                    <Text style={styles.distanceText}>{dataRow.distance}</Text>
                                </Body>
                            </ListItem>
                        )}
                    />
                </Content>
            </Container>
        );
    }
}

export default connect()(ChatList);
