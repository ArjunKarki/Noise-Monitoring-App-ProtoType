import React, { PureComponent } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { slistStyles as styles } from './tableStyles'
import colors from '../../../utils/color'
import Icon from "react-native-vector-icons/FontAwesome";

export class HighestSplTable extends PureComponent {
    
    render() {
        return (
            <View style={{ flex: 1, padding: 5 }}>
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
            splSortIndicator
        } = this.props

        return (
            <View style={[styles.rowContainer(false), styles.header]}>
                <View style={styles.column(width[0])}>
                    <View style={styles.headerItem}>
                        <Text style={{ color: colors.colorWhite1 }}> {header[0]}</Text>
                    </View>
                </View>
                <View style={styles.column(width[1])}>
                    <View style={styles.headerItem}>
                        <Text style={{ color: colors.colorWhite1 }}> {header[1]}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => this.props.onSplSort()} style={styles.column(width[2])}>
                    <View style={styles.headerItem}>
                        <Text style={{ color: colors.colorWhite1 }}> {header[2]}</Text>
                        <SortIconIndicator flat={splSortIndicator} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

class RenderRow extends PureComponent {
    render() {
        const { dataLength, width, index, item } = this.props

        return (
            <View style={styles.rowContainer(index === dataLength - 1)}>
                <View style={styles.column(width[0], 0)}>
                    <View style={{ paddingHorizontal: 4 }}>
                        <Text style={styles.textBold}>{item[0]}</Text>
                    </View>
                </View>
                <View style={[styles.column(width[1], 1)]}>
                    <Text style={styles.textBold}>{item[1]}</Text>
                </View>
                <View style={styles.column(width[2], 2)}>
                    <Text style={styles.textBold}>{item[2]}</Text>
                </View>
            </View>
        )
    }

}

class Row extends PureComponent {
    render() {
        return (
            <View
                style={{ flex: 1, alignSelf: "stretch", }}
            >
                <FlatList
                    data={this.props.data}
                    renderItem={({ item, index }) =>
                        <RenderRow
                            width={this.props.width}
                            dataLength={this.props.data.length}
                            index={index}
                            item={item} />}
                    keyExtractor={(item, index) => index}
                    initialNumToRender={0}

                />
            </View>
        )
    }
}

const SortIconIndicator = props => {
    const style = { marginLeft: 4 }
    const render =
        props.flat === 'down' ? <Icon style={style} name="sort-down" size={16} color={colors.colorWhite1} />
            : props.flat === 'up' ? <Icon style={style} name="sort-up" size={16} color={colors.colorWhite1} />
                : props.flat === 'no' ? <Icon style={style} name="sort" size={16} color={colors.colorWhite1} />
                    : null
    return render
}
