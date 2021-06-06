import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import React from 'react';
import { scale } from '../../utils/scale';

export const DateTimeBtn = props => {
    let btnActivClr = props.selected ? "grey" : null
    return (
        <TouchableOpacity
            onPress={() => props.onClick(props.number)}
            style={[Styles.btnStyle, { backgroundColor: btnActivClr }]}>
            <Text style={Styles.btnText}>{props.text}</Text>
        </TouchableOpacity>
    )
}

let Styles = StyleSheet.create({
    btnStyle: {
        flex: 1,
        minHeight: scale(30),
        marginRight: scale(3),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 13,
        borderWidth: 1,
        
    },
    btnText: {
        fontSize: scale(10)
    },
})