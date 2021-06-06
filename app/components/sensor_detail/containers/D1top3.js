import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { d1Top3Style } from '../styles';
import colors from "../../../utils/color";
import { NoiseNameButton } from '../components/NoiseNameButton';

const noiseNameColors = [
    { name: "Engine Rev", color: colors.noiseColor1 },
    { name: "Music", color: colors.noiseColor2 },
    { name: "Shouting", color: colors.noiseColor3 },
    { name: "Construction", color: colors.noiseColor4 },
    { name: "Other 1", color: colors.noiseColor5 },
    { name: "Other 2", color: colors.noiseColor6 },
]

export default class D1top3 extends PureComponent {
    render() {
        const itemsView = noiseNameColors.map((val, key) =>
            <NoiseNameButton 
                key={key}
                color={val.color}
                text={val.name}
                onClick={(name) => this.props._handleNoiseType(name)}
            />
        )
        return (
            <View style={this.props.style}>
                <View style={d1Top3Style.buttonContainer}>
                    {itemsView}
                </View>
            </View>
        );
    }
}