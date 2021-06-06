import React, { PureComponent } from 'react';
import { View, ScrollView, BackHandler } from 'react-native';

import D1Top from './D1Top';
import D1Bottom from './D1Bottom';

import colors from "../../../utils/color";
import { loadData, get7Days, get24Hours, unixToDate } from './functions'

// Array combined each color and noise type together
const noiseNameColors = [
	{ name: "Engine Rev", color: colors.noiseColor1 },
	{ name: "Music", color: colors.noiseColor2 },
	{ name: "Shouting", color: colors.noiseColor3 },
	{ name: "Construction", color: colors.noiseColor4 },
	{ name: "Other 1", color: colors.noiseColor5 },
	{ name: "Other 2", color: colors.noiseColor6 },
]

export default class Detail1 extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			// regonize the current selected filter button ( 24hours as 2, 7days as 3, all as 4, etc... )
			filterButtonSelected: 3,
			// start date in format unix timestamp
			fromDate: null,
			// end date in format unix timestamp
			toDate: null,
			// noise type count of data for selected fromDate and endDate
			totalCount: 0,
			// current type selected ( Engine Rev. or Music or Shouting, etc.. )
			currentTypeSelected: null,
			// for the User EXP, to control the scrollview which contain the flatlist, ( Scrollview from Detail1 and Flatlist from D1Button table)
			enableScrollView: true,
		}
	}

	componentDidMount() {
		// first determine start date and end date in timestamp for 7days (default)
		const { fromDate, toDate } = get7Days()
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
		this.fetchData(fromDate, toDate)
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
	}

	handleBackPress = () => {
		this.props.screenProps("Noise Monitor")// works best when the goBack is async
		return false;
	}

	fetchData = (fromDate, toDate) => {
		const data = loadData(fromDate, toDate)
		const dataCount = data.reduce((start, current) => {
			return { ...start, [current.type]: start[current.type] + 1 }
		}, this.initDataCount())
		const totalCount = Object.values(dataCount).reduce((start, val) => start + val, 0)

		const dateTimeData = data.map((v) => v.time) // for searching fromDate and toDate from the current loaded array
		this.setState({
			fromDate: Math.min(...dateTimeData),
			toDate: Math.max(...dateTimeData),
			totalCount
		})
	}

	// initialize a object which contain noise name as key and count 0 as data
	// output will be { "Engine Rev.": 0, "Music": 0, "Shouting": 0, ...  }
	initDataCount = () => {
		return noiseNameColors.reduce((start, val) => {
			const clone = { ...start }
			clone[val.name] = 0
			return clone
		},
			{})
	}

	// action for the date time filter buttons ( 24hours, 7days, etc... )
	_handleFilterButton = (filterButtonSelected) => {
		const { fromDate, toDate } =
			filterButtonSelected === 3 ? get7Days() :
				filterButtonSelected === 2 ? get24Hours() :
					{ fromDate: this.state.fromDate, toDate: this.state.toDate }
		this.setState({ filterButtonSelected: filterButtonSelected })
		this.fetchData(fromDate, toDate)
	}

	// action click on view of fromDate and toDate
	_handleCalendar = () => {
		alert('start-date to end-date Here..');
	}

	// action click on the noise type button ( Engine Rev., Music, Shouting, ... )
	_handleNoiseType = (name) => {
		// check toggle click
		if (this.state.currentTypeSelected !== null && this.state.currentTypeSelected === name)
			this.setState({ currentTypeSelected: null })
		else
			this.setState({ currentTypeSelected: name })
	}

	// handle date change from the time slider
	_handleDateChange = (fromDate, toDate) => {
		console.log("From",unixToDate(fromDate))
		console.log("To",unixToDate(toDate))
		// take care about the chart when filterButtonSelected state going to change
		//this.setState({ filterButtonSelected: 4 })
		this.fetchData(fromDate, toDate)
	}

	_onStackBarPress = (date) => {
		// this.setState({
		// 	filterButtonSelected:2,

		// })
		let { fromDate, toDate } = get24Hours()
		this.setState({
			filterButtonSelected: 2,
			fromDate: fromDate,
			toDate: toDate
		})
	}

	// for user exp, handle scroll to control scrollview allow scroll or not 
	_handleOnInnerScroll = (scroll) => {
		if (this.state.enableScrollView !== scroll)
			this.setState({ enableScrollView: scroll })
	}

	render() {
		const { filterButtonSelected, fromDate, toDate, totalCount, currentTypeSelected } = this.state
		// render will be affect if fromDate and toDate already exist
		if (fromDate === null || toDate === null) return null
		return (
			<View
				style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
				<ScrollView
					stickyHeaderIndices={[1]}
					scrollEnabled={this.state.enableScrollView}
					showsVerticalScrollIndicator={false}
					style={{ flex: 1, alignSelf: 'stretch' }}>
					<D1Top
						// props used in D1top1
						fromDate={fromDate}
						toDate={toDate}
						filterButtonSelected={filterButtonSelected}
						_handleCalendar={this._handleCalendar}
						_handleFilterButton={this._handleFilterButton}
						// props used in D1top2
						totalCount={totalCount}
						// props used in D1top3
						_handleNoiseType={this._handleNoiseType}
						// props used in D1top4
						filterButtonSelected={filterButtonSelected}
						currentTypeSelected={currentTypeSelected}
						_handleDateChange={this._handleDateChange}
						_onStackBarPress={this._onStackBarPress}
						_handleOnInnerScroll={this._handleOnInnerScroll}
					/>
					<D1Bottom
						_handleOnInnerScroll={this._handleOnInnerScroll}
						currentTypeSelected={currentTypeSelected}
						fromDate={fromDate}
						toDate={toDate}
					/>
				</ScrollView>
			</View>
		);
	}
}