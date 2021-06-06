import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { StackedBarChart, XAxis, YAxis, Grid } from 'react-native-svg-charts'
import colors from "../../../utils/color";
import * as scale from 'd3-scale'

const noiseNameColors = [
    { name: "Engine Rev", color: colors.noiseColor1 },
    { name: "Music", color: colors.noiseColor2 },
    { name: "Shouting", color: colors.noiseColor3 },
    { name: "Construction", color: colors.noiseColor4 },
    { name: "Other 1", color: colors.noiseColor5 },
    { name: "Other 2", color: colors.noiseColor6 },
]

export default class MStackedBarChart extends PureComponent {

    constructor(props) {
        super(props)

    }

    showAlert = (d) => alert('Bar-' + d)

    _dayStackPress = (date) => {
        this.props._onStackBarPress(date)
    }

    render() {
        const dataRaw = Object.values(this.props.data)
        const dataKey = Object.keys(this.props.data)
        const barKey = Object.keys(dataRaw[0])
        const data = dataRaw.map((val, key) => {
            const tData = Object.values(val)
            const tKey = Object.keys(val)

            const d = {}

            for (let i = 0; i < tKey.length; i++) {
                const v = {
                    value: tData[i],
                    svg: { onPress: () => this._dayStackPress(dataKey[key]) }
                }
                d[tKey[i]] = v
            }
            d.date = dataKey[key]
            return d
        })

        const color = noiseNameColors.map(val => val.color)
        const yData = data.map((val, key) => barKey.reduce((result, cValue) => result + val[cValue].value, 0))
        return (
            <View style={[{ flexDirection: 'row', }, this.props.style]}>
                <YAxis
                    style={{ paddingHorizontal: 4 }}
                    data={[0, ...yData]}
                    valueAccessor={({ item, key }) => item}
                    contentInset={{ top: 10, bottom: 22 }}
                    svg={{ fontSize: 9 }}
                />
                <View style={{ flex: 1 }}>
                    <StackedBarChart
                        style={{ flex: 1 }}
                        keys={barKey}
                        colors={color}
                        data={data}
                        showGrid={false}
                        spacingInner={0.3}
                        spacingOuter={0.2}
                        valueAccessor={({ item, key }) => item[key].value}
                        contentInset={{ top: 10, bottom: 0 }}>
                        <Grid svg={{ strokeWidth: 1, stroke: colors.colorWhite2 }} />
                    </StackedBarChart>
                    <XAxis
                        style={{ paddingTop: 4, height: 20 }}
                        data={data}
                        xAccessor={({ item }) => item.date}
                        spacingInner={0.3}
                        spacingOuter={0.2}
                        scale={scale.scaleBand}
                        formatLabel={(value, index) => value}
                        svg={{ fontSize: 9 }} />
                </View>
            </View>
        )
    }
}
