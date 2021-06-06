import React, { PureComponent } from 'react';
import { View } from 'react-native';

import colors from "../../../utils/color";

import BarChart from '../components/BarChart'
import StackedBarChart from '../components/StackedBarChart'
import TimeSeriesSlider from '../components/TimeSeriesSlider'

import { unixToTime, unixToDate, loadData } from './functions'

const noiseNameColors = [
    { name: "Engine Rev", color: colors.noiseColor1 },
    { name: "Music", color: colors.noiseColor2 },
    { name: "Shouting", color: colors.noiseColor3 },
    { name: "Construction", color: colors.noiseColor4 },
    { name: "Other 1", color: colors.noiseColor5 },
    { name: "Other 2", color: colors.noiseColor6 },
]

export default class D1top4 extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            fromDate: this.props.fromDate,
            toDate: this.props.toDate,
            data: null, // Barchart or StackedBarchart data
            showStackedBar: true, // show StackedBarchart or Barchart
            filterButtonSelected: this.props.filterButtonSelected,
            currentTypeSelected: this.props.currentTypeSelected,
        }
    }

    /* ---- format incoming data ------------------- */
    // Here a little logic, 
    // we divide data by its date as key for the 7days, but for 24hours divide data by its hour of datatime as key

    // for 7days, out will be
    // { 21-02-19:{Music: 9, Shouting: 8,...}, 22-02-19:{Music: 9, Shouting: 8,...}, ... }
    get7daysData = (data) => {
        let result = data.reduce((start, current) => {
            const d = { ...start }
            // read previous value, if not exist expty object is assigned 
            const r = d[unixToDate(current.time)] !== undefined ? d[unixToDate(current.time)] : this.emptyDataCountObject()
            // add current value to previous value 
            const r1 = this.initDataCount(r, current)
            // add to the main object ( which to return )
            d[unixToDate(current.time)] = r1
            return d
        }, {} /*initialize empty object*/)

        return result
    }
    // for 24hours, out will be
    // { 08:{Music: 9, Shouting: 8,...}, 09:{Music: 9, Shouting: 8,...}, 14:{Music: 9, Shouting: 8,...}, ... }
    get24hoursData = (data) => {
        return data.reduce((start, current) => {
            const d = { ...start }
            const r = d[unixToTime(current.time)] !== undefined ? d[unixToTime(current.time)] : this.emptyDataCountObject()
            const r1 = this.initDataCount(r, current)
            d[unixToTime(current.time)] = r1
            return d
        }, {})
    }
    // output will be
    // {Music: 9, Shouting: 8,...}
    emptyDataCountObject = () => {
        return noiseNameColors.reduce((start, val) => {
            const clone = { ...start }
            clone[val.name] = 0
            return clone
        }, {})
    }

    // add count of d1 and d2 for each noise type
    initDataCount = (d1, d2) => {
        const d = { ...d1 }
        d[d2.type] = d[d2.type] + 1
        return d
    }

    /* -------------------------------- */
    componentDidMount() {
        this.fetchData(this.state.fromDate, this.state.toDate, this.state.filterButtonSelected, this.state.currentTypeSelected)
    }

    // handle props changes occur
    componentWillReceiveProps(np) {

        if (np.fromDate !== this.state.fromDate || np.toDate !== this.state.toDate ||
            np.filterButtonSelected !== this.state.filterButtonSelected ||
            np.currentTypeSelected !== this.state.currentTypeSelected) {
            this.setState({ fromDate: np.fromDate, toDate: np.toDate, currentTypeSelected: np.currentTypeSelected })
            this.fetchData(np.fromDate, np.toDate, np.filterButtonSelected, np.currentTypeSelected)
        }
    }

    fetchData = (fromDate, toDate, filterButtonSelected, currentTypeSelected) => {
        const data = loadData(fromDate, toDate)
        // console.log("DAAAA",data)
        // data.map((item)=>{console.log("Item",unixToDate(item.time))})
        // check if specific noise type not set
        if (currentTypeSelected === null) {
            if (filterButtonSelected === 3) { // 7 days 
                this.setState({
                    data: { ...this.get7daysData(data) },
                    showStackedBar: true,
                    filterButtonSelected,
                })
            } else if (filterButtonSelected === 2) { // 24 hours
                this.setState({
                    data: { ...this.get24hoursData(data) },
                    showStackedBar: true,
                    filterButtonSelected
                })
            }
        } else { // with specific noise type
            // todo something to show the barchart for a specific noise type
            this.setState({
                showStackedBar: false,  // for now just show the barchar  
                // todo here          
            })
        }
    }

    render() {
        const { data, showStackedBar } = this.state
        if (showStackedBar && data === null) return null
        return (
            <View style={this.props.style}>
                {
                    showStackedBar
                        ? <StackedBarChart
                            {...this.props}
                            data={data}
                            style={{ flex: 2, marginVertical: 4 }} />
                        : <BarChart
                            data={[4, 5, 6, 9, 8, 7, 3]}
                            fill={noiseNameColors.reduce((r, v) => v.name === this.state.currentTypeSelected ? v.color : r, 'black')}
                            style={{ flex: 2, marginVertical: 4 }} />
                }

                <TimeSeriesSlider
                    _handleDateChange={this.props._handleDateChange}
                    fromDate={this.state.fromDate}
                    toDate={this.state.toDate}
                    style={{ marginVertical: 4 }} />
            </View>
        )
    }
}
