import React, { Component } from "react";
import { Container, Grid, Row, Icon, Button, Spinner, View } from "native-base";
import commonColor from "../../theme/variables/commonColor";
import Card from "../../components/Card";
import styles from "./styles";

class PhotoCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileIndex: 0
        };
    }

    _onSwiping = (dir, opa) => {
        this.setState({ direction: dir, opac: opa });
    };

    _onSwipeRight = item => {
        console.log("Swipe right", item);
    };

    _onSwipeLeft = item => {
        console.log("Swipe left", item);
    };

    _onSwipeTop = item => {
        console.log("Swipe top", item);
    };

    _onSwipeBottom = item => {
        this.props.navigation.navigate("PhotoCardDetails");
    };

    nextCard = () => {
        this.setState({ profileIndex: this.state.profileIndex + 1 });
    };

    render() {
        const { profileIndex, profiles, loading } = this.props;

        return (
            <Container style={styles.wrapper}>
                <View style={{ flex: 1 }}>
                    {profiles
                        .slice(profileIndex, profileIndex + 3)
                        .reverse()
                        .map(profile => {
                            return (
                                <Card
                                    key={profile.id}
                                    profile={profile}
                                    onSwipeOff={this.nextCard}
                                />
                            );
                        })}
                </View>
                <Grid style={styles.bottomGrid}>
                    <Row style={styles.bottomRowStyle}>
                        <Button style={styles.bottomRoundedSmallPills}>
                            <Icon
                                name="md-refresh"
                                style={{
                                    color: commonColor.brandWarning,
                                    fontSize: 34
                                }}
                            />
                        </Button>
                        <Button
                            style={styles.bottomRoundedPills}
                            onPress={() => this._deckSwiper._root.swipeLeft()}
                        >
                            <Icon
                                name="md-close"
                                style={{
                                    color: commonColor.brandDanger,
                                    fontSize: 40,
                                    lineHeight: 40
                                }}
                            />
                        </Button>
                        <Button
                            style={styles.bottomRoundedPills}
                            onPress={() => this._deckSwiper._root.swipeRight()}
                        >
                            <Icon
                                name="md-heart"
                                style={{
                                    color: commonColor.brandSuccess,
                                    fontSize: 35,
                                    lineHeight: 40,
                                    marginLeft: 2,
                                    marginRight: 2
                                }}
                            />
                        </Button>
                        <Button
                            style={styles.bottomRoundedSmallPills}
                            onPress={() => this._deckSwiper._root.swipeTop()}
                        >
                            <Icon
                                name="md-star"
                                style={{
                                    color: commonColor.brandInfo,
                                    fontSize: 34,
                                    marginLeft: 3,
                                    marginRight: 3
                                }}
                            />
                        </Button>
                    </Row>
                </Grid>
            </Container>
        );
    }
}

export default PhotoCards;
