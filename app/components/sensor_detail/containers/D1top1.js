import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import language from '../../../utils/languages'
import { d1Top1Style } from '../styles'
import { unixToDate } from '../containers/functions'
import { DateTimeBtn } from '../../dateTimeBtn/dateTimeBtn';
import { lang } from 'moment';

export default class D1top1 extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            filterButtonSelected,
            fromDate, toDate,
            _handleFilterButton,
            _handleCalendar } = this.props
            
        return (   
            <View style={this.props.style}>
                <View style={d1Top1Style.innerContainer}>
                    <View style={d1Top1Style.dateTimeFilterContainer}>
                        <DateTimeBtn
                            text={language.english.oneHr}
                            number={1}
                            selected={filterButtonSelected === 1}
                            onClick={() => _handleFilterButton(1)}
                        />
                        <DateTimeBtn
                            text={language.english.twentyFourHrs}
                            number={2}
                            selected={filterButtonSelected === 2}
                            onClick={() => _handleFilterButton(2)}
                        />
                        <DateTimeBtn
                            text={language.english.sevenDays}
                            number={3}
                            selected={filterButtonSelected === 3}
                            onClick={() => _handleFilterButton(3)}
                        />
                        <DateTimeBtn
                            text={language.english.all}
                            number={4}
                            selected={filterButtonSelected === 4}
                            onClick={() => _handleFilterButton(4)}
                        />
                    </View>
                    <View style={d1Top1Style.calendarContainer1}>
                        <View style={d1Top1Style.calendarContainer2}>
                            <TouchableOpacity onPress={() => _handleCalendar()}>
                                <View style={d1Top1Style.calendar}>
                                    <Text>{unixToDate(fromDate)}</Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={d1Top1Style.text}>From:</Text>
                        </View>
                        <View style={d1Top1Style.calendarContainer2}>
                            <TouchableOpacity onPress={() => _handleCalendar()}>
                                <View style={d1Top1Style.calendar}>
                                    <Text>{unixToDate(toDate)}</Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={d1Top1Style.text}>To:</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}