import React, { Component } from "react";
import { Container, Grid, Row, Icon, Button } from "native-base";
import commonColor from "../../theme/variables/commonColor";
import PhotoCards from "./PhotoCards";
import styles from "./styles";

class Home extends Component {
    render() {
        return (
            <Container style={styles.wrapper}>
                <PhotoCards
                    user={this.props.navigation.state.params.user}
                    ref={mr => (this._photoCards = mr)}
                    navigation={this.props.navigation}
                />

                <Grid style={styles.bottomGrid}>
                    <Row style={styles.bottomRowStyle}>
                        <Button
                            style={styles.bottomRoundedSmallPills}
                            onPress={() => this._photoCards.doRestart()}
                        >
                            <Icon
                                name="md-refresh"
                                style={{
                                    color: commonColor.brandWarning,
                                    fontSize: 30
                                }}
                            />
                        </Button>
                        <Button
                            style={styles.bottomRoundedPills}
                            onPress={() => {
                                this._photoCards.doSwipe("left");
                            }}
                        >
                            <Icon
                                name="md-close"
                                style={{
                                    color: commonColor.brandDanger,
                                    fontSize: 40,
                                    lineHeight: 40,
                                    marginLeft: 1,
                                    width: 36
                                }}
                            />
                        </Button>
                        <Button
                            style={styles.bottomRoundedPills}
                            onPress={() => this._photoCards.doSwipe("right")}
                        >
                            <Icon
                                name="md-heart"
                                style={{
                                    color: commonColor.brandSuccess,
                                    fontSize: 40,
                                    lineHeight: 45,
                                    marginLeft: -3,
                                    width: 40
                                }}
                            />
                        </Button>
                        <Button
                            style={styles.bottomRoundedSmallPills}
                            onPress={() => this._photoCards.doSwipe("top")}
                        >
                            <Icon
                                name="md-star"
                                style={{
                                    color: commonColor.brandInfo,
                                    fontSize: 32,
                                    lineHeight: 30,
                                    marginLeft: 5,
                                    width: 25
                                }}
                            />
                        </Button>
                    </Row>
                </Grid>
            </Container>
        );
    }
}

export default Home;
