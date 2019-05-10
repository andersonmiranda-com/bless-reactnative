import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { connectStyle } from "native-base";
import StreamlineIcon from "./StreamlineIcon";

class Icon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <StreamlineIcon name={this.props.name} style={this.props.style} />;
    }
}

const styles = StyleSheet.create({});

export default connectStyle("NativeBase.Icon", styles)(Icon);
