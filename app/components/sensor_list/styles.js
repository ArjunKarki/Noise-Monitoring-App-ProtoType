import { StyleSheet } from 'react-native'
import color from '../../utils/color';


export default StyleSheet.create({
    
})

export const SListTableStyle = StyleSheet.create({
    header: {
      paddingLeft: 3,
      backgroundColor:color.tableHeader 
    },
    rowContainer: (last, colr) => {
      return {
        backgroundColor: color.bgColor,
        flexDirection: "row",
        borderTopWidth: 1,
        borderBottomWidth: last ? 1 : 0,
        borderLeftWidth: colr === undefined ? 1 : 6,
        borderTopColor: color.colorWhite4,
        borderBottomColor: color.colorWhite4,
        borderRightColor: color.colorWhite4,
        borderLeftColor: colr === undefined ? color.colorWhite4 : colr,
        minHeight: 36
      }
    },
    column: (flex, i) => {
      return {
        flex: flex,
        alignSelf: 'stretch',
        paddingVertical: 2,
        borderRightWidth: 1,
        borderColor: color.colorWhite4,
        justifyContent: "center",
        alignItems: i === 1 || i === 2 || i === 3 ? "center" : "flex-start"
      };
    }
  });