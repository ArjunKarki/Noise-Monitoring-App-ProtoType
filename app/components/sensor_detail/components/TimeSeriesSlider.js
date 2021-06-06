import React, { PureComponent } from 'react'
import { View, Dimensions } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { LineChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import colors from "../../../utils/color";
import { loadData, unixToDate } from '../containers/functions'
import moment from 'moment';

export default class TimeSeriesSlider extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            lineChartData: null,
            sliderData: null,
            width: 0,
            fromDate: this.props.fromDate,
            toDate: this.props.toDate,
            v1: 0,
            v2: 0
        }
        console.log("Time Seri",this.state.fromDate,this.state.toDate)
    }

    componentDidMount() {
        this.fetchData()
    }
    
    // load all data
    fetchData = () => {
        const data = loadData()
        const lineChartData = data.map(v => v.spl)
        const sliderData = data.map(v => v.time)
        this.setState({ lineChartData: lineChartData, sliderData: sliderData, v1: this.state.fromDate, v2: this.state.toDate })
    }

    componentWillReceiveProps(np) {
        if (np.fromDate !== this.state.fromDate || np.toDate !== this.state.toDate) {
            this.setState({ fromDate: np.fromDate, toDate: np.toDate, v1: np.fromDate, v2: np.toDate })
        }
    }

    onLayoutChange = e => {
        if (this.state.width !== e.nativeEvent.layout.width)
            this.setState({ width: e.nativeEvent.layout.width })
    }

    _onSliderChange = (from, to) => {
        // let timeDiff = Math.abs(from - to)
        // if (moment.unix(timeDiff).utc().date() <= 10) {
        //     this.props._handleDateChange(from, to)
        // } else {
        //     if (this.state.fromDate !== from) {
        //         console.log("from change")
        //         //this.props._handleDateChange(1549301400, 1549906200)
        //         let toChange = moment.unix(from).add(10, "d").utc().format('DD-MM-YY')
        //         console.log(moment(toChange, "DD-MM-YY").valueOf())
        //         console.log("aa", moment(toChange).unix());
        //         this.props._handleDateChange(from, moment(toChange, "DD-MM-YY").valueOf())//Date.parse(toChange)
        //     } else {
        //         console.log("to change")
        //         //this.props._handleDateChange(1549301400, 1549819800)
        //         let newDate = moment.unix(to).subtract(10, "days").utc().format('DD-MM-YY')
        //         console.log(moment(newDate, "DD-MM-YY").valueOf())
        //         this.props._handleDateChange(moment(newDate, "DD-MM-YY").valueOf(), to)
        //     }
        // }
        this.props._handleDateChange(from, to)
    }

    render() {
        const { width, v1, v2, lineChartData, sliderData } = this.state
        if (sliderData === null || lineChartData === null) return null
        return (
            <View style={this.props.style} >
                <View
                    style={{ height: 50, justifyContent: 'center', alignItems: "center" }}
                    onLayout={this.onLayoutChange} >
                    <CurveArea
                        data={lineChartData}
                        width={width}
                        style={{ flex: 1, zIndex: 1, position: 'absolute' }} />
                    <View style={{ flex: 2, zIndex: 2, position: 'absolute' }}>
                        <MultiSlider
                            onValuesChangeFinish={(v) => this._onSliderChange(v[0], v[1])}
                            isMarkerSeparated={true}
                            values={[v1, v2]}
                            sliderLength={width}
                            containerStyle={{ height: 50 }}
                            trackStyle={{ height: 50 }}
                            selectedStyle={{ backgroundColor: '#00000000' }}
                            unselectedStyle={{ height: 40, marginVertical: 5, backgroundColor: '#00000030' }}
                            touchDimensions={{ height: 50, width: 28, slipDisplacement: 200 }}
                            snapped={false}
                            min={Math.min(...sliderData)}
                            max={Math.max(...sliderData)}
                            customMarker={LC}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const LC = () => {
    return (
        <View
            style={{ height: 50, width: 14, borderWidth: 1, borderColor: colors.colorBlueGrey4, backgroundColor: colors.colorWhite2, marginTop: 50 }} />
    )
}

const CurveArea = props => {

    return (
        <View style={props.style}>
            <LineChart
                style={{ width: props.width, height: 50 }}
                data={props.data}
                contentInset={{ top: 8, bottom: 8 }}
                curve={shape.curveNatural}
                numberOfTicks={1}
                svg={{ strokeWidth: 2, stroke: colors.colorBlue1 }}>
                <Grid svg={{ strokeWidth: 2, stroke: colors.colorWhite3 }} />
            </LineChart>
        </View>
    )
}