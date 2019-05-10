// @flow

import variable from "./../variables/platform";

export default (variables /*: * */ = variable) => {
    const inputTheme = {
        ".multiline": {
            height: null,
            fontSize: variables.inputFontSize - 3
        },
        height: variables.inputHeightBase,
        color: variables.inputColor,
        paddingLeft: 5,
        paddingRight: 5,
        flex: 1,
        fontSize: variables.inputFontSize,
        fontFamily: variables.fontFamily
    };

    return inputTheme;
};
