// @flow

import variable from "./../variables/platform";

export default (variables /*: * */ = variable) => {
    const theme = {
        ".group": {
            height: 50,
            paddingVertical: variables.listItemPadding - 8,
            paddingTop: variables.listItemPadding + 12,
            ".bordered": {
                height: 50,
                paddingVertical: variables.listItemPadding - 8,
                paddingTop: variables.listItemPadding + 12
            }
        },
        ".bordered": {
            ".noTopBorder": {
                borderTopWidth: 0
            },
            ".noBottomBorder": {
                borderBottomWidth: 0
            },
            height: 35,
            paddingTop: variables.listItemPadding + 2,
            paddingBottom: variables.listItemPadding,
            borderBottomWidth: variables.borderWidth,
            borderTopWidth: variables.borderWidth,
            borderColor: variables.listBorderColor
        },
        "NativeBase.Text": {
            fontSize: variables.DefaultFontSize - 2,
            color: variables.brandMedium
        },
        ".noTopBorder": {
            borderTopWidth: 0
        },
        ".noBottomBorder": {
            borderBottomWidth: 0
        },

        ".small": {
            marginTop: 0,
            padding: 0,
            height: 20
        },

        height: 25,
        //backgroundColor: "#F5F5F5",
        flex: 1,
        justifyContent: "center",
        paddingLeft: variables.listItemPadding + 5,
        marginTop: 15,
        letterSpacing: 1
    };

    return theme;
};
