import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, FlatList, Dimensions } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../../utils/color";

import { SDetailTableStyle as styles } from '../styles'

const noiseNameColors = [
    { name: "Engine Rev", color: colors.noiseColor1 },
    { name: "Music", color: colors.noiseColor2 },
    { name: "Shouting", color: colors.noiseColor3 },
    { name: "Construction", color: colors.noiseColor4 },
    { name: "Other 1", color: colors.noiseColor5 },
    { name: "Other 2", color: colors.noiseColor6 },
]

export class DetailTable extends PureComponent {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header {...this.props} />
                <Row {...this.props} />
            </View>
        )
    }
}

class Header extends PureComponent {
    render() {
        const {
            header,
            width,
            _onTimeSort,
            _onSplSort,
            _onTypeSort,
        } = this.props
        const {
            timeSortIndicator,
            typeSortIndicator,
            splSortIndicator,
        } = this.props.sortIndicator
        return (
            <View style={[styles.rowContainer(false), styles.header]}>
                <TouchableOpacity onPress={() => _onTimeSort()} style={styles.column(width[0], 0)}>
                    <View style={styles.headerItem}>
                        <Text style={{ color: colors.colorWhite1 }}> {header[0]}</Text>
                        <SortIconIndicator flat={timeSortIndicator} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => _onTypeSort()} style={styles.column(width[1], 1)}>
                    <View style={styles.headerItem}>
                        <Text style={{ color: colors.colorWhite1 }}> {header[1]}</Text>
                        <SortIconIndicator flat={typeSortIndicator} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => _onSplSort()} style={styles.column(width[2], 2)}>
                    <View style={styles.headerItem}>
                        <Text style={{ color: colors.colorWhite1 }}> {header[2]}</Text>
                        <SortIconIndicator flat={splSortIndicator} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const getColor = (name, list) => list.reduce((result, cv) => name.trim() === cv.name.trim() ? cv.color : result, "")

class RenderRow extends PureComponent {
    render() {
        const { dataLength, width, index, item } = this.props
        return (
            <View style={styles.rowContainer(index === dataLength - 1)}>
                <View style={styles.column(width[0], 0)}>
                    <View style={{ paddingHorizontal: 4 }}>
                        <Text>{item[0]}</Text>
                    </View>
                </View>
                <View style={[styles.column(width[1], 1), { backgroundColor: getColor(item[1], noiseNameColors) }]}>
                    <Text style={styles.textBold}>{item[1]}</Text>
                </View>
                <View style={styles.column(width[2], 2)}>
                    <Text style={styles.textBold}>{item[2]}</Text>
                </View>
            </View>
        )
    }

}

// screen height
const height = Dimensions.get('window').height

class Row extends PureComponent {
    render() {
        return (
            <View
                style={{ flex: 1, alignSelf: 'stretch', }}
                onStartShouldSetResponderCapture={() => this.props._handleOnInnerScroll(false)}>
                <FlatList
                    // onScroll={ e=> {
                    //         let offset = e.nativeEvent.contentOffset
                    //         if(offset.y===0) this.props._handleOnInnerScroll(true)
                    //         else this.props._handleOnInnerScroll(false)
                    //     }
                    // }
                    data={this.props.data}
                    renderItem={({ item, index }) => <RenderRow
                        width={this.props.width}
                        dataLength={this.props.data.length}
                        index={index}
                        item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                    initialNumToRender={0}
                    maxHeight={height - 100}
                />
            </View>
        )
    }
}

const SortIconIndicator = props => {
    const style = { paddingRight: 4 }
    const render =
        props.flat === 'down' ? <Icon style={style} name="sort-down" size={16} color={colors.colorWhite1} />
            : props.flat === 'up' ? <Icon style={style} name="sort-up" size={16} color={colors.colorWhite1} />
                : props.flat === 'no' ? <Icon style={style} name="sort" size={16} color={colors.colorWhite1} />
                    : null
    return render
}