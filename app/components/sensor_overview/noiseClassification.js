import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { NoiseClassificationTable as Table } from './table/noiseClassificationTable'
import color from '../../utils/color';

const data = [
    [color.noiseColor1, "Engine Rev", "60dB"],
    [color.noiseColor2, "Shouting", "65dB"],
    [color.noiseColor3, "Other1", "60dB"],
    [color.noiseColor4, "Construction", "74dB"],
    [color.noiseColor5, "Music", "72dB"],
    [color.noiseColor6, "Other2", "70dB"],
]

class NoiseClassification extends Component {

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Table
                    width={[1, 1, 1]}
                    header={["Colour", "Name", "Threshold"]}
                    data={data}
                />
            </View>
        )
    }
}

export default NoiseClassification