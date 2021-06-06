import { StyleSheet } from 'react-native'
import colors from '../../../utils/color'
export const slistStyles = StyleSheet.create({
    header: {
        backgroundColor: colors.tableHeader
    },
    headerItem: {
        minHeight: 40,
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowContainer: (last) => {
        return {
            //backgroundColor: colors.bgColor,
            flexDirection: "row",
            borderTopWidth: 1,
            borderBottomWidth: last ? 1 : 0,
            borderLeftWidth: 1,
            borderColor: colors.colorWhite4,
            minHeight: 40,
        }
    },
    column: (flex, i) => {
        return {
            flex: flex,
            padding: 4,
            alignSelf: 'stretch',
            paddingVertical: 2,
            borderRightWidth: 1,
            borderColor: colors.colorWhite4,
            justifyContent: "center",
            alignItems: i === 2 ? "center" : "flex-start"
        };
    },
    textBold: {
        fontWeight: 'bold',
        color: colors.colorBlueGrey1
    }
});
