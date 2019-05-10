import React, { PureComponent } from "react";
import { View, NetInfo, Dimensions, StyleSheet } from "react-native";
import { Header, Text } from "native-base";
import PropTypes from "prop-types";

const { width } = Dimensions.get("window");

class OfflineNotice extends PureComponent {
    state = {
        isConnected: true
    };

    componentDidMount() {
        NetInfo.isConnected.addEventListener("connectionChange", this.handleConnectivityChange);
        NetInfo.isConnected.fetch().then(isConnected => {
            if (typeof this.props.onChangeStatus === "function") {
                this.props.onChangeStatus(isConnected);
            }
            this.setState({ isConnected });
        });
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener("connectionChange", this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => {
        if (typeof this.props.onChangeStatus === "function") {
            this.props.onChangeStatus(isConnected);
        }
        if (isConnected) {
            this.setState({ isConnected });
        } else {
            this.setState({ isConnected });
        }
    };

    render() {
        if (!this.state.isConnected) {
            if (this.props.isHeader) {
                return (
                    <Header transparent>
                        <View style={styles.offlineContainer}>
                            <Text style={styles.offlineText}>
                                {this.context.t("No Internet Connection")}
                            </Text>
                        </View>
                    </Header>
                );
            } else {
                return (
                    <View style={styles.offlineContainer}>
                        <Text style={styles.offlineText}>
                            {this.context.t("No Internet Connection")}
                        </Text>
                    </View>
                );
            }
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: "#b52424",
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width
    },
    offlineText: {
        color: "#fff"
    }
});

OfflineNotice.contextTypes = {
    t: PropTypes.func.isRequired
};

export default OfflineNotice;
