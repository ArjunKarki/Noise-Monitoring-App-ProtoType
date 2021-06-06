import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { HighestSplTable as Table } from './table/highestSplTable'

const data = [
    ["Construction", "The Live Turtle & Tortoise Museum", "68dB"],
    ["Construction", "3 CleanTech Loop Nanyang Ave", "88dB"],
    ["Other 2", "Blk 825 Woodlands St 81", "73dB"],
    ["Music", "Blk 363 Bukit Batok St 31", "90dB"],
    ["Shouting", "NTUitive, 71 Nanyang Drive", "76dB"],
    ["Other 1", "Bus interchange 27071", "60dB"],
    ["Engine Rev", "United Square Shopping mall", "53dB"],
    ["Construction", "3 CleanTech Loop Nanyang Ave", "72dB"],
    ["Shouting", "Bus interchange 27071", "72dB"],
    ["Music", "Blk 5 Dover Cres", "70dB"],
    ["Other 1", "Blk 806 Woodlands St 81", "76dB"],
    ["Music", "United Square Shopping mall", "78dB"],
]

class HighestSpl extends Component {

    static navigationOptions = {
        header: null,
        tabBarVisible: false
    }

    constructor(props) {
        super(props)
        this.state = {
            splSortIndicator: "no",
            originalData: [],
            data: [],
        }
    }

    componentDidMount() {
        this.setState({
            data: [...data],
            originalData: [...data]
        })
    }

    nextIndicator = indicator => (
        indicator === "no" ? "up"
            : indicator === "up" ? "down"
                : indicator === "down" ? "no"
                    : "no")

    _onSplSort = () => {
        const indicator = this.state.splSortIndicator
        const nextIndicator = this.nextIndicator(indicator)
        let { originalData } = this.state
        if (nextIndicator === "no") {
            this.setState({ splSortIndicator: "no", data: originalData })
        }

        else {
            let splIndicator = nextIndicator
            const dataClone = [...this.state.data]
            dataClone.sort((left, right) => {
                const rightVal = right[2].split(" ")[0] !== "No" ? right[2].split(" ")[0] : 0
                const leftVal = left[2].split(" ")[0] !== "No" ? left[2].split(" ")[0] : 0
                return (
                    nextIndicator === "up" ? (parseInt(rightVal) - parseInt(leftVal)) :
                        nextIndicator === "down" ? (parseInt(leftVal) - parseInt(rightVal)) : 0
                )
            })
            console.log("clone", dataClone)
            this.setState({ splSortIndicator: splIndicator, data: dataClone })
        }
    }

    render() {
        let { splSortIndicator, data } = this.state
        return (
            <View style={{ flex: 1 }}>
                <Table
                    onSplSort={this._onSplSort}
                    splSortIndicator={splSortIndicator}
                    width={[2.5, 5, 2.5]}
                    header={["Noise Type", "Sensor Location", "Highest SPL"]}
                    data={data}
                />
            </View>
        )
    }
}

export default HighestSpl