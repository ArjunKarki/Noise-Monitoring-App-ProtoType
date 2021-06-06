import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import CardView from 'react-native-cardview'
import { scale } from '../../utils/scale';

import { GroupedSort } from '../../utils/algorithm';
import { DateTimeBtn } from '../dateTimeBtn/dateTimeBtn';
import color from '../../utils/color';

// const data = {
//     totalCount: 81,
//     noiseOccList: [
//         { name: "Engine Rev", count: 19 },
//         { name: "Music", count: 14 },
//         { name: "Shouting", count: 13 },
//         { name: "Construction", count: 15 },
//         { name: "Other 1", count: (9) },
//         { name: "Other 2", count: 11 },
//     ],
// }

const nColor = [color.noiseColor1, color.noiseColor2, color.noiseColor3, color.noiseColor4, color.noiseColor5, color.noiseColor6]
export default class NoiceOccurrence extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dateTimeBtnSelected: 3
        }
    }

    _handleFilterBtn = (btnNum) => {
        this.setState({
            dateTimeBtnSelected: btnNum
        })
    }

    render() {
        const {
            totalCount,
            noiseOccList,
        } = this.props.data

        const listTmp = noiseOccList.map((v, i) => v.count)
        // const test=noiseOccList.map((v,i)=>v.count)


        const occList = GroupedSort(listTmp)

        const sortedNoiseOccList = occList.map((v, i) => noiseOccList[v])//noiseOccList.sort((left, right)=> right.count-left.count )

        return (
            <CardView
                style={Styles.noiseOcc}
                cardElevation={4}
                cardMaxElevation={4}
                cornerRadius={20}>
                <View style={{ minHeight: scale(60), flex: 1 }}>
                    <Text style={{ alignSelf: "center", marginTop: scale(5), fontSize: scale(15), fontWeight: 'bold' }}>Noise Occurrence</Text>

                    {/* filter View */}

                    <View style={{ flexDirection: 'row', marginTop: scale(8), marginHorizontal: scale(5), flex: 1, alignItems: "center" }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: scale(13) }} >Total count: {totalCount}</Text>
                        </View>
                        <View style={{ flexDirection: "row", flex: 1.5 }}>
                            <DateTimeBtn
                                text="1 hr"
                                selected={this.state.dateTimeBtnSelected === 1}
                                number={1}
                                onClick={this._handleFilterBtn}
                            />
                            <DateTimeBtn
                                text="24 hr"
                                selected={this.state.dateTimeBtnSelected === 2}
                                number={2}
                                onClick={this._handleFilterBtn}
                            />
                            <DateTimeBtn
                                text="7 days"
                                selected={this.state.dateTimeBtnSelected === 3}
                                number={3}
                                onClick={this._handleFilterBtn}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ marginVertical: scale(12), flex: 1, minHeight: scale(200) }}>
                    <View style={
                        Styles.noiseInfoContainer
                    }>
                        {

                            sortedNoiseOccList.map((val, key) =>
                                key < 3 ?
                                    <View key={key} style={Styles.noiseInfo1(val.count, nColor[key])}>
                                        <View style={Styles.noiseInfo2}>
                                            <Text>{val.name}</Text>
                                            <Text> - </Text>
                                            <Text>{val.count}</Text>
                                        </View>
                                    </View>
                                    :
                                    null

                            )
                        }
                    </View>
                    <View
                        style={Styles.noiseInfoContainer}
                    >
                        {
                            sortedNoiseOccList.map((val, key) =>
                                key >= 3 ?
                                    <View key={key} style={Styles.noiseInfo1(val.count, nColor[key])}>
                                        <View style={Styles.noiseInfo2}>
                                            <Text>{val.name}</Text>
                                            <Text> - </Text>
                                            <Text>{val.count}</Text>
                                        </View>
                                    </View>
                                    :
                                    null
                            )
                        }
                    </View>
                </View>
            </CardView>

        )
    }

}

let Styles = StyleSheet.create({
    smallBtn: {
        borderWidth: scale(1),
        borderRadius: scale(5),
        width: scale(50),
        height: scale(25),
        justifyContent: "center",
        alignItems: 'center'
    },
    noiseOcc: {
        marginTop: scale(20),
        marginHorizontal: scale(20),
        minHeight: scale(260),
        marginBottom: scale(20),
        backgroundColor: "#e5e7e9"
    },
    noiseInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        // flexWrap: 'wrap', 
        justifyContent: 'space-around',
        marginHorizontal: scale(5)
    },
    noiseInfo1: (flexValue, color) => ({
        backgroundColor: color,
        margin: 1,
        // flexWrap: 'wrap',
        borderRadius: 5,
        // width: 32.4+"%",
        flex: flexValue,
        padding: 4,
        paddingBottom: 8,
        flexDirection: 'row',
        alignItems: "flex-end",
    }),
    noiseInfo2: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
})