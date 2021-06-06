import React, { Component } from "react";
import { View, Text } from "react-native";
import { SensorListTable as Table } from '../components/Table'
import data from './testdata'

export default class SensorList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			originalData: [],
			data: [],
			sortIndicator: {
				splSortIndicator: "no",
				favSortIndicator: "up"
			},
			sensorSearchText: "",
			sensorSearchToggle: false
		}
		
	}

	// static navigationOptions = () => {
	// 	return {
	// 	  tabBarOnPress(navigation) {
	// 		  console.log(navigation)
	// 	  }
	// 	};
	//   };

	componentDidMount() {
		this.setState({ data: [...data], originalData: [...data] })
	}

	nextIndicator = indicator => (
		indicator === "no" ? "up"
			: indicator === "up" ? "down"
				: indicator === "down" ? "no"
					: "no")

	_onSplSort = () => {
		const indicator = this.state.sortIndicator.splSortIndicator
		const nextIndicator = this.nextIndicator(indicator)
		if (nextIndicator === "no") this._onFavSort("up")
		else {
			const clone = { ...this.state.sortIndicator }
			clone.splSortIndicator = nextIndicator
			clone.favSortIndicator = "no"

			const dataClone = [...this.state.data]
			dataClone.sort((left, right) => {
				const rightVal = right.data[1].split(" ")[0] !== "No" ? right.data[1].split(" ")[0] : 0
				const leftVal = left.data[1].split(" ")[0] !== "No" ? left.data[1].split(" ")[0] : 0
				return (
					nextIndicator === "up" ? (parseInt(rightVal) - parseInt(leftVal)) :
						nextIndicator === "down" ? (parseInt(leftVal) - parseInt(rightVal)) : 0
				)
			})
			this.setState({ sortIndicator: clone, data: dataClone })
		}
	}

	_onFavSort = (nextIndicat) => {
		const indicator = this.state.sortIndicator.favSortIndicator
		const nextIndicator = nextIndicat !== undefined ? nextIndicat : indicator === "up" ? "down" : "up"
		const clone = { ...this.state.sortIndicator }
		clone.favSortIndicator = nextIndicator
		clone.splSortIndicator = "no"

		const dataClone = [...this.state.data]
		dataClone.sort((left, right) => {
			const rightVal = right.data[3]
			const leftVal = left.data[3]
			return (
				rightVal === leftVal ? 0 :
					nextIndicator === "up" ?
						rightVal === true ? 1 : -1 :
						nextIndicator === "down" ?
							leftVal === true ? 1 : -1 : 0
			)
		})
		this.setState({ sortIndicator: clone, data: dataClone })
	}

	_sensorSearchTextChange = (text) => {
		this.setState({ sensorSearchText: text })
		if (text.trim().length === 0) {
			this.setState({ sensorSearchText: text, data: [...this.state.originalData] })
		}
		else {
			this.setState({
				sensorSearchText: text,
				data: [...this.state.originalData].filter(data => data.data[0].includes(text))
			})
		}
	}

	_handleSensorSearchToggle = () => {
		if (!this.state.sensorSearchToggle) this._sensorSearchTextChange("")
		this.setState(prev => ({
			sensorSearchToggle: !prev.sensorSearchToggle,
			sensorSearchText: "",
		}))
	}

	_handleFav = (row, val) => {
		// alert("Row: " + row + " - " + val)
	}

	_handleSensorClick = (row, val) => {
		if (val.data[1] === "No data") {
			alert("No Data!")
		} else {
			this.props.screenProps(val.data[0]);
			
			this.props.navigation.navigate("Detail")
		}
	}

	//RENDER
	render() {
		const { data, sortIndicator, sensorSearchText, sensorSearchToggle } = this.state
		return (
			<View style={{ flex: 1, paddingVertical: 2 }}>
				<Table
					width={[4.6, 2, 3, 1.4]}
					sortIndicator={sortIndicator}
					header={["Sensors", "SPL", "Alerts", "Fav"]}
					data={data}
					_handleFav={(row, val) => this._handleFav(row, val)}
					_handleSensorClick={(row, val) => this._handleSensorClick(row, val)}
					_onSplSort={this._onSplSort}
					_onFavSort={this._onFavSort}
					sensorSearchText={sensorSearchText}
					_sensorSearchTextChange={this._sensorSearchTextChange}
					sensorSearchToggle={sensorSearchToggle}
					_handleSensorSearchToggle={this._handleSensorSearchToggle}
				/>
			</View>
		);
	}
}
