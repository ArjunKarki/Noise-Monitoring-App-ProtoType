/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import SensorList from './app/components/sensor_list/containers/SensorList';
import Detail1 from './app/components/sensor_detail/containers/Detail1';
//import Overview from './app/components/sensor_overview/overview';
import color from './app/utils/color';
import Overview from './app/components/sensor_overview/overview';
import AppBar from './app/components/appBar/appBar';
import HighestSpl from './app/components/sensor_overview/highestSpl';
import NoiseClassification from './app/components/sensor_overview/noiseClassification';
console.disableYellowBox = true;

const OverviewStack = createStackNavigator(
  {
    Overview: { screen: Overview },
    HighestSpl: { screen: HighestSpl },
    NoiseClassification: { screen: NoiseClassification }
  }
)

const MainTab = createAppContainer(

  createMaterialTopTabNavigator({
    Overview: {
      screen: OverviewStack,
      navigationOptions: {
        title: "Overview",
      }
    },
    SensorList: {
      screen: SensorList,
      navigationOptions: {
        title: "Sensor List",
        tabBarOnPress: ({ navigation }) => {
          navigation.navigate("SensorList")
        },
      }
    },
    Detail: {
      screen: Detail1,
      navigationOptions: {
        title: "Details",
        tabBarOnPress: ({ navigation }) => {
        }
      }
    }
  },
    {
      tabBarOptions: {
        activeTintColor: color.activeTab,
        style: {
          backgroundColor: color.tabBarBackground,
        }
      },
      swipeEnabled: false,
      lazy:false
    }
  ),
)

export default class App extends Component {

  render() {

    return (
      <View style={{ flex: 1 }}>
        <AppBar
          ref={ref => this.appBar = ref}
        />
        <MainTab
          screenProps={(text) => this.appBar.setAppBarText(text)}
        />
      </View>
    );
  }
}

