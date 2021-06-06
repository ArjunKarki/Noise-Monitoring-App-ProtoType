import React from "react";
import { View, Text, TouchableHighlight, TouchableOpacity, FlatList, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { WorkerIcon, CarsIcon, MusicIcon, SpeakIcon } from '../../../utils/icons'
import { SListTableStyle as styles } from '../styles'
import color from "../../../utils/color";

export const SensorListTable = props => {
	return (
		<View style={{ flex: 1 }}>
			<Header {...props} />
			<Row {...props} />
		</View>
	)
}

const Header = props => {
	const { splSortIndicator, favSortIndicator } = props.sortIndicator
	return (
		props.sensorSearchToggle
			?
			(
				<View style={{ backgroundColor: color.tableHeader, padding: 8 }}>
					<SensorLocFilterBox
						sensorSearchText={props.sensorSearchText}
						_sensorSearchTextChange={props._sensorSearchTextChange}
						_handleSensorSearchToggle={props._handleSensorSearchToggle}
					/>
				</View>
			)
			:
			(
				<View style={[styles.rowContainer(false), styles.header]}>
					<TouchableOpacity onPress={() => props._handleSensorSearchToggle()} style={styles.column(props.width[0], 0)}>
						<View style={{ minHeight: 40, alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
							<Text style={{ color: color.colorWhite2 }}> {props.header[0]}</Text>
							<Icon style={{ paddingRight: 4 }} name="filter" size={16} color={color.colorWhite1} />
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => props._onSplSort()} style={styles.column(props.width[1], 1)}>
						<View style={{ minHeight: 40, alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
							<Text style={{ color: color.colorWhite2 }}> {props.header[1]}</Text>
							<SortIconIndicator flat={splSortIndicator} />
						</View>
					</TouchableOpacity>
					<View style={[styles.column(props.width[2], 2), { minHeight: 40 }]}>
						<Text style={{ color: color.colorWhite2 }}> {props.header[2]}</Text>
					</View>
					<TouchableOpacity onPress={() => props._onFavSort()} style={styles.column(props.width[3], 3)}>
						<View style={{ minHeight: 40, alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
							<Text style={{ color: color.colorWhite2 }}> {props.header[3]}</Text>
							<SortIconIndicator flat={favSortIndicator} />
						</View>
					</TouchableOpacity>
				</View>
			)
	);
};

const Row = props => {
	_renderRow = (row, { color, data }) => {
		let colr = color

		return (
			<TouchableOpacity activeOpacity={0.5} onPress={() => props._handleSensorClick(row, { colr, data })}>
				<View style={styles.rowContainer(row === props.data.length - 1, colr)}>
					<View style={styles.column(props.width[0], 0)}>
						<View style={{ paddingHorizontal: 4 }}>
							<Text>{data[0]}</Text>
						</View>
					</View>
					<View style={styles.column(props.width[1], 1)}>
						<Text style={{ fontWeight: 'bold', color: color.colorBlueGrey1 }}>{data[1]}</Text>
					</View>
					<View style={styles.column(props.width[2], 2)}>
						<AlertIconsView alert={data[2]} />
					</View>
					<TouchableOpacity style={styles.column(props.width[3], 3)} onPress={() => props._handleFav(row, data[3])}>

						<View>
							<Icon name="star" size={16} color={data[3] ? '#ffd54f' : color.colorBlueGrey3} />
						</View>
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		)
	}

	return (
		<View style={{ flex: 1, alignSelf: 'stretch' }}>
			<FlatList
				data={props.data}
				renderItem={({ item, index }) => _renderRow(index, item)}
				keyExtractor={(item, index) => item.data[0]}
			/>
		</View>
	)
}

const AlertIconsView = props => {
	const iconcolor = [color.colorRed1, color.colorOrange1, color.colorGreen1, color.colorBlue1]
	const render = props.alert.map((val, key) => (
		<View key={key} style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
			<View style={{ alignItems: 'center', paddingVertical: 2 }}>
				<Text style={{ fontSize: 10, fontWeight: 'bold', color: color.colorBlueGrey1 }}>{val.count}</Text>
			</View>
			{
				val.id === 1 ? <CarsIcon size={16} color={iconcolor[val.id - 1]} /> :
					val.id === 2 ? <WorkerIcon size={16} color={iconcolor[val.id - 1]} /> :
						val.id === 3 ? <MusicIcon size={16} color={iconcolor[val.id - 1]} /> :
							val.id === 4 ? <SpeakIcon size={16} color={iconcolor[val.id - 1]} /> :
								val.id === 5 ? <Icon name="ellipsis-h" size={14} color={color.colorBlueGrey1} /> : null
			}
		</View>
	))
	
	return (
		<View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-around', flex: 1, paddingVertical: 2, paddingHorizontal: 4 }}>
			{render}
		</View>
	)
}

const SortIconIndicator = props => {
	const style = { paddingRight: 4 }
	const render =
		props.flat === 'down' ? <Icon style={style} name="sort-down" size={16} color={color.colorWhite1} />
			: props.flat === 'up' ? <Icon style={style} name="sort-up" size={16} color={color.colorWhite1} />
				: props.flat === 'no' ? <Icon style={style} name="sort" size={16} color={color.colorWhite1} />
					: null
	return render
}

const SensorLocFilterBox = props => {
	return (
		<View style={{
			flexDirection: "row",
			backgroundColor: color.colorWhite1Transparent,
			borderRadius: 20,
			paddingLeft: 16,
			paddingRight: 8,

			alignItems: 'center'
		}}>
			<TextInput
				value={props.sensorSearchText}
				onChangeText={(text) => props._sensorSearchTextChange(text)}
				placeholder="Type sensor address."
				selectionColor={color.colorWhite1}
				placeholderTextColor={color.colorWhite3}
				style={{
					flex: 1,
					paddingVertical: 6,
					color: color.colorWhite1,
				}}
			/>
			<View style={{ paddingHorizontal: 8 }}>
				<TouchableOpacity onPress={() => props._handleSensorSearchToggle()}>
					<Icon name="times-circle" size={20} color={color.colorWhite2} />
				</TouchableOpacity>
			</View>
		</View>)
}


