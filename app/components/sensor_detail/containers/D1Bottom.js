import React, { PureComponent } from "react";
import { View } from "react-native";
import { DetailTable as Table } from '../components/DetailTable'
import colors from "../../../utils/color";
import { unixToDateTime, loadData, getSelectedNoiseData } from './functions'

export default class D1Bottom extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            fromDate: this.props.fromDate,
            toDate: this.props.toDate,
            currentTypeSelected: this.props.currentTypeSelected,
            originalData: [],
            data: [],
            sortIndicator: {
                timeSortIndicator: "no",
                typeSortIndicator: "no",
                splSortIndicator: "no",
            },
        }
    }

    componentDidMount() {
        this.fetchData(this.state.fromDate, this.state.toDate, this.state.currentTypeSelected)
    }

    // handle props change, because we use PureComponent for the performance 
    // but PureComponent sometimes cant render, here we handle that problem
    componentWillReceiveProps(np) {
        if (np.fromDate !== this.state.fromDate || np.toDate !== this.state.toDate || np.currentTypeSelected !== this.state.currentTypeSelected) {
           
            this.setState({ fromDate: np.fromDate, toDate: np.toDate, currentTypeSelected: np.currentTypeSelected })
            // if any change, re fetch data and render
            this.fetchData(np.fromDate, np.toDate, np.currentTypeSelected)
        }
    }

    fetchData(fromDate, toDate, noiseType) {
        // const data = loadData(fromDate, toDate).map((val) => [unixToDateTime(val.time), val.type, val.spl + " dB"])
        // const dd = getSelectedNoiseData(fromDate, toDate, noiseType).map((val) => [unixToDateTime(val.time), val.type, val.spl + " dB"])
        //    console.log("DD",dd)

        // if (noiseType !== null) {
        //     const test = getSelectedNoiseData(fromDate, toDate, noiseType)
        // }
        // if(currentTypeSelected===null)
        let data = []
        if (noiseType !== null)
            data = getSelectedNoiseData(fromDate, toDate, noiseType).map((val) => [unixToDateTime(val.time), val.type, val.spl + " dB"])
        else
            data = loadData(fromDate, toDate).map((val) => [unixToDateTime(val.time), val.type, val.spl + " dB"])

         

        // else
        // const data=getSelectedTypeData(fromDate.toData)
        // web backup original data for the normal sort 
        // can change here according to the api data
        this.setState({ data: data, originalData: data })
    }

    // no => up, up => down, down=> no
    nextIndicator = indicator => (
        indicator === "no" ? "up"
            : indicator === "up" ? "down"
                : indicator === "down" ? "no"
                    : "no")

    _onTimeSort = () => {
        const indicator = this.state.sortIndicator.timeSortIndicator
        const nextIndicator = this.nextIndicator(indicator)
        if (nextIndicator === "no") {
            const clone = { ...this.state.sortIndicator }
            clone.timeSortIndicator = nextIndicator
            this.setState(prev => ({ sortIndicator: clone, data: [...prev.originalData] }))
        }
        else {
            const clone = { ...this.state.sortIndicator }
            clone.timeSortIndicator = nextIndicator
            clone.typeSortIndicator = "no"
            clone.splSortIndicator = "no"
            const dataClone = [...this.state.data]
            dataClone.sort((left, right) => {
                const rightVal = right[0]
                const leftVal = left[0]
                return (
                    nextIndicator === "up" ? (rightVal.localeCompare(leftVal)) :
                        nextIndicator === "down" ? (leftVal.localeCompare(rightVal)) : 0
                )
            })
            this.setState({ sortIndicator: clone, data: dataClone })
        }
    }
    
    _onTypeSort = () => {
        const indicator = this.state.sortIndicator.typeSortIndicator
        const nextIndicator = this.nextIndicator(indicator)
        if (nextIndicator === "no") {
            const clone = { ...this.state.sortIndicator }
            clone.typeSortIndicator = nextIndicator
            this.setState(prev => ({ sortIndicator: clone, data: [...prev.originalData] }))
        }
        else {
            const clone = { ...this.state.sortIndicator }
            clone.typeSortIndicator = nextIndicator
            clone.timeSortIndicator = "no"
            clone.splSortIndicator = "no"
            const dataClone = [...this.state.data]
            dataClone.sort((left, right) => {
                const rightVal = right[1]
                const leftVal = left[1]
                return (
                    nextIndicator === "down" ? (rightVal.localeCompare(leftVal)) :
                        nextIndicator === "up" ? (leftVal.localeCompare(rightVal)) : 0
                )
            })
            this.setState({ sortIndicator: clone, data: dataClone })
        }
    }
    
    _onSplSort = () => {
        const indicator = this.state.sortIndicator.splSortIndicator
        const nextIndicator = this.nextIndicator(indicator)
        if (nextIndicator === "no") {
            const clone = { ...this.state.sortIndicator }
            clone.splSortIndicator = nextIndicator
            this.setState(prev => ({ sortIndicator: clone, data: [...prev.originalData] }))
        }
        else {
            const clone = { ...this.state.sortIndicator }
            clone.splSortIndicator = nextIndicator
            clone.timeSortIndicator = "no"
            clone.typeSortIndicator = "no"
            const dataClone = [...this.state.data]
            dataClone.sort((left, right) => {
                const rightVal = right[2].split(" ")[0] !== "No" ? right[2].split(" ")[0] : 0
                const leftVal = left[2].split(" ")[0] !== "No" ? left[2].split(" ")[0] : 0
                return (
                    nextIndicator === "up" ? (parseInt(rightVal) - parseInt(leftVal)) :
                        nextIndicator === "down" ? (parseInt(leftVal) - parseInt(rightVal)) : 0
                )
            })
            this.setState({ sortIndicator: clone, data: dataClone })
        }
    }

    //RENDER
    render() {
        const { data, sortIndicator } = this.state
        return (
            <View
                style={{ flex: 1, padding: 2, borderRadius: 4, backgroundColor: colors.bgColor, alignSelf: 'stretch' }}
                onStartShouldSetResponderCapture={() => this.props._handleOnInnerScroll(true)}>
                <Table
                    _handleOnInnerScroll={this.props._handleOnInnerScroll}
                    width={[1, 1, 1]}
                    sortIndicator={sortIndicator}
                    header={["Time Stamp", "Type", "SPL"]}
                    data={data}
                    _onTimeSort={this._onTimeSort}
                    _onTypeSort={this._onTypeSort}
                    _onSplSort={this._onSplSort}
                />
            </View>
        );
    }
}