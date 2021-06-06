import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native'
import {noiseNameButtonStyle} from '../styles'

export const NoiseNameButton = props => {
    return (
        <TouchableOpacity
            onPress={() => props.onClick(props.text)}
             >
            <View style={[noiseNameButtonStyle.container,{backgroundColor: props.color}]}>
                <Text style={noiseNameButtonStyle.text}>{props.text}</Text>
            </View>
        </TouchableOpacity>

    )
}
