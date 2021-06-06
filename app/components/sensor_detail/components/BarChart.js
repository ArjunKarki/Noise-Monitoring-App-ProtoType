import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { BarChart, XAxis, YAxis, Grid } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
import colors from "../../../utils/color";

export default class MBarChart extends PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        const { data } = this.props
        return (
            <View style={[{ height: 200, flexDirection: 'row', paddingHorizontal: 2 }, this.props.style]}>
                <YAxis
                    style={{ paddingHorizontal: 4 }}
                    data={[0, ...data]}
                    contentInset={{ top: 10, bottom: 22 }}
                    svg={{ fontSize: 9 }}
                />
                <View style={{ flex: 1 }}>
                    <BarChart
                        style={{ flex: 1 }}
                        data={data}
                        gridMin={0}
                        spacingInner={0.4}
                        spacingOuter={0.2}
                        contentInset={{ top: 10, bottom: 0 }}
                        svg={{ fill: this.props.fill }}>
                        <Grid svg={{ strokeWidth: 1, stroke: colors.colorWhite2 }} />
                    </BarChart>
                    <XAxis
                        style={{ paddingTop: 4, height: 20 }}
                        data={data}
                        spacingInner={0.6}
                        spacingOuter={0.2}
                        scale={scale.scaleBand}
                        formatLabel={(value, index) => index + "-02-" + 18}
                        svg={{ fontSize: 9 }}
                    //labelStyle={{ color: '#aaa' }} 
                    />
                </View>
            </View>
        )
    }
}