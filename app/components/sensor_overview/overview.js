import React, { Component } from 'react'
import { View, Text, Dimensions, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import CardView from 'react-native-cardview'
import { scale } from '../../utils/scale';
import NoiceOccurrence from './noiceOcc';

let width = Dimensions.get('window').width - scale(70)
let nWidth = Dimensions.get('window').width - scale(50)

const data = {
    totalCount: 81,
    noiseOccList: [
        { name: "Engine Rev", count: 19 },
        { name: "Music", count: 14 },
        { name: "Shouting", count: 13 },
        { name: "Construction", count: 15 },
        { name: "Other 1", count: (9) },
        { name: "Other 2", count: 11 },
    ],
}

export default class Overview extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
            data: data
        }
    }


    render() {
        let { data } = this.state
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                {/* Highest SPL View */}
                <TouchableOpacity onPress={() => this.props.navigation.navigate("HighestSpl")}>
                    <CardView
                        style={Styles.highestSpl}
                        cardElevation={4}
                        cardMaxElevation={4}
                        cornerRadius={20}>
                        <Text style={{ fontSize: scale(15), marginBottom: scale(5), fontWeight: "bold" }}>Recent Highest SPL</Text>
                        <View style={{ flexDirection: 'row', marginBottom: scale(5), alignItems: "center" }}>
                            <Text style={{ fontSize: scale(20), fontWeight: 'bold' }}>90 dB </Text>
                            <Text>[music]</Text>
                        </View>
                        <Text>Sensor #14</Text>
                        <Text>at 3 Clean-Tech Loop, Nanyang Ave</Text>
                    </CardView>
                </TouchableOpacity>
                {/* Noise Occurance View */}
                <NoiceOccurrence
                    data={data}
                />
                {/* Sensor Info View */}
                <View style={Styles.sensorRow}>
                    <View style={[Styles.sensorContainer, { marginRight: scale(15) }]}>
                        <CardView
                            style={Styles.sensor}
                            cardElevation={4}
                            cardMaxElevation={4}
                            cornerRadius={20}
                        >
                            <Text style={Styles.sensorText}>15/50</Text>
                        </CardView>
                        <Text style={Styles.sensorFont}>Active Sensors</Text>
                    </View>
                    <View style={[Styles.sensorContainer, { marginRight: scale(15) }]}>
                        <CardView
                            style={Styles.sensor}
                            cardElevation={4}
                            cardMaxElevation={4}
                            cornerRadius={20}
                        >
                            <Text style={Styles.sensorText} >8</Text>
                        </CardView>
                        <Text style={Styles.sensorFont}>Alerts</Text>
                    </View>
                    <View style={Styles.sensorContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("NoiseClassification")}>
                            <CardView
                                style={Styles.sensor}
                                cardElevation={4}
                                cardMaxElevation={4}
                                cornerRadius={20}
                            >
                                <Text style={Styles.sensorText}>10</Text>
                            </CardView>
                        </TouchableOpacity>
                        <Text style={Styles.sensorFont}>Classifications</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
let Styles = StyleSheet.create({
    highestSpl: {
        marginHorizontal: scale(20),
        height: scale(130),
        marginTop: scale(10),
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e5e7e9"
    },
    noiseOcc: {
        marginTop: scale(20),
        marginHorizontal: scale(20),
        height: scale(260),
        marginBottom: scale(20),
        flex: 1,
        backgroundColor: "#e5e7e9"
    },
    sensorRow: {
        flex: 1,
        flexDirection: "row",
        marginHorizontal: scale(20),
    },
    sensorContainer: {
        flex: 1,
        // width: width / 3,
        // marginRight: scale(15),

    },
    sensor: {
        height: scale(65),
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "#e5e7e9"
    },
    sensorFont: {
        fontSize: scale(11),
        alignSelf: 'center',
        marginTop: scale(5),

    },
    sensorText: {
        fontWeight: 'bold',
        fontSize: scale(18),
        color: '#16a085'
    }
})
