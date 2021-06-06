import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import color from '../../utils/color';
import { scale } from '../../utils/scale';
export default class AppBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            bartText: "Noise Monitor"
        }
    }

    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    showMenu = () => {
        this._menu.show();
    };

    setAppBarText(title) {
        this.setState({
            bartText: title
        })
    }

    render() {
        return (
            <View style={Styles.container}>
                <View style={{ alignItems: "flex-start", flexDirection: "row" }}>
                    <Text style={Styles.text}>{this.state.bartText}</Text>
                </View>
            </View>
        )
    }
}

let Styles = StyleSheet.create({
    container: {
        backgroundColor: color.tabBarBackground,
        paddingHorizontal: scale(10),
        paddingTop: scale(8),
        flexDirection: 'row',
        alignItems: "center"
    },
    text: {
        color: color.appBarText,
        fontSize: scale(15)
    }
})