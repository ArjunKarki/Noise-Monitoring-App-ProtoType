import React, { PureComponent } from 'react';
import { View,Text } from 'react-native';

import language from '../../../utils/languages'
import {d1Top2Style} from '../styles'

export default class D1top2 extends PureComponent{
    render(){
        const { totalCount } = this.props
        return(
            <View style={this.props.style}>
                <Text style={d1Top2Style.text}>{language.english.totalCount}</Text>
                <Text style={d1Top2Style.textBold}> {totalCount}</Text>
            </View>
        );
    }
}