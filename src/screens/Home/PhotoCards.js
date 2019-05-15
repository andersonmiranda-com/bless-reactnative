import { Permissions, Location } from "expo";
import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { Spinner, Text } from "native-base";
import { connect } from "react-redux";
import { updateCards, saveRelation } from "../../actions/Cards";
import { getUser, saveUser } from "../../actions/User";

import Card from "../../components/Card";
import styles from "./styles";

class PhotoCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemIndex: 0,
            items: [],
            user: this.props.userState,
            loading: true,
            offset: 0
        };
    }

    async componentDidMount() {
        console.log("inicio photocards");
        await this.props.getUser(this.props.userState._id);
        this.updateUserLocation(this.props.userState).then(user => {
            console.log("updated user");

            this.props.updateCards(user, true);
        });
    }

    componentDidUpdate(prevProps) {
        const newProps = this.props;
        if (prevProps.cardsState !== newProps.cardsState) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                ...this.props.cardsState
            });
        }
    }

    updateUserLocation = async user => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === "granted") {
            //const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: false });
            //const { latitude, longitude } = location.coords;
            const latitude = -23.716211; //demo lat
            const longitude = -42.507444; //demo lon

            if (user.location === undefined) {
                user.location = { type: "Point", coordinates: [] };
            }
            user.location.coordinates[0] = longitude;
            user.location.coordinates[1] = latitude;
            await this.props.saveUser(user._id, user);

            console.log("Permission Granted");
            return user;
        } else {
            console.log("Permission Denied");
        }
    };

    relate = (user_id, item_id, type) => {
        this.props.saveRelation(user_id, item_id, type);
    };

    nextCard = (direction, itemUid) => {
        const userUid = this.props.userState._id;

        console.log(direction, userUid, itemUid);

        switch (direction) {
            case "right":
                this.relate(userUid, itemUid, "like");
                break;

            case "left":
                this.relate(userUid, itemUid, "dislike");
                break;

            case "bottom":
                break;

            case "top":
                this.relate(userUid, itemUid, "superlike");
                break;
        }

        console.log("this.state.itemIndex", this.state.itemIndex);

        this.setState({ itemIndex: this.state.itemIndex + 1 });
    };

    doSwipe = direction => {
        if (this.state.itemIndex < this.state.items.length) {
            const cardTrigger =
                this.state.itemIndex < this.state.items.length - 4
                    ? 4
                    : this.state.items.length - this.state.itemIndex - 1;
            this._photoCard.doSwipe(direction, cardTrigger);
        }
    };

    doRestart = () => {
        this.setState({ itemIndex: 0, loading: true, items: [] });
        this.props.updateCards(this.state.user, true);
    };

    doGoBack = () => {
        if (this.state.itemIndex > 0) {
            this.setState({ itemIndex: this.state.itemIndex - 1 });
        }
    };

    cardStack = () => {
        const { itemIndex, items, loading, user } = this.state;

        if (items.length === 0 && !!loading) {
            return (
                <View style={styles.wrapperCentered}>
                    <Spinner />
                    <Text>{this.context.t("Discovering new people...")}</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.deckswiperView}>
                    {items
                        .slice(itemIndex, itemIndex + 5)
                        .reverse()
                        .map((item, index) => {
                           
                                return (
                                    <Card
                                        key={item._id}
                                        ref={mr => (this._photoCard = mr)}
                                        index={index}
                                        item={item}
                                        userLocation={
                                            user.location
                                                ? {
                                                      longitude: user.location.coordinates[0],
                                                      latitude: user.location.coordinates[1]
                                                  }
                                                : {}
                                        }
                                        onSwipeOff={this.nextCard}
                                        onCardOpen={_id => {
                                            this.props.navigation.navigate("PhotoCardDetails", {
                                                _id: _id
                                            });
                                        }}
                                    />
                                );
                            
                        })}
                </View>
            );
        }
    };

    render() {
        return this.cardStack();
    }
}

PhotoCards.contextTypes = {
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
    { updateCards, saveUser, getUser, saveRelation }
)(PhotoCards);
