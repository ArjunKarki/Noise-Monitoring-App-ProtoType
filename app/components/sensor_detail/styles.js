import { StyleSheet } from 'react-native'
import colors from "../../utils/color";

export const d1Top1Style = StyleSheet.create({
    container:{
        flex: 2,
        alignSelf:'stretch',
    },
    innerContainer: { 
        flex: 1, 
        flexDirection: 'row' 
    },
    dateTimeFilterContainer: { 
        flex: 3, 
        flexDirection: 'row', 
        alignSelf: 'stretch', 
        alignItems: "center" 
    },
    calendarContainer1:{ 
        flex: 2, 
        alignSelf: 'stretch', 
        justifyContent: 'center', 
        padding: 4, 
    },
    calendarContainer2: { 
        flex: 1, 
        flexDirection: 'row-reverse', 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        margin: 2 
    },
    calendar: { 
        borderColor: colors.noiseColor4, 
        borderWidth: 1, 
        borderRadius: 2, 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 2, 
        paddingHorizontal: 8 
    },
    titleText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 2
    },
    text: { 
        padding: 2, 
        fontSize: 12 
    }
})

export const d1Top2Style = StyleSheet.create({
    container: {
        flex: 1, 
        alignSelf:'stretch', 
        flexDirection: 'row', 
        alignItems: 'center'
    }, 
    text: {
        paddingLeft: 5, 
        fontSize: 17
    },
    textBold: {
        fontWeight: 'bold', 
        fontSize: 17
    }
})
export const d1Top3Style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //alignSelf:'stretch', 
    },
    buttonContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center', 
        alignSelf: 'stretch'
    },
})
export const d1Top4Style = StyleSheet.create({
    container: {
        flex: 3, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    }
})
export const noiseNameButtonStyle = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center', 
        borderRadius: 5, 
        paddingVertical: 8, 
        paddingHorizontal: 6,
        margin: 2,
    },
    text: {
        fontSize: 11, 
        textAlign: 'center'
    }
})

export const SDetailTableStyle = StyleSheet.create({
    header: {
      backgroundColor: colors.tableHeader
    },
    headerItem: { 
        minHeight: 40, 
        alignSelf: 'stretch', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
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
  
export default StyleSheet.create({
    container: { 
        flex: 3,
        elevation: 2,
        borderRadius: 4,
        backgroundColor: colors.bgColor,
        alignSelf: 'stretch', 
        flexDirection: 'column', 
        alignItems: 'flex-start', 
        justifyContent: 'center',
        padding: 2,
        marginBottom: 8,
        marginTop: 4
    }
})