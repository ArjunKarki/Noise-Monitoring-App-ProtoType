import React, { PureComponent } from 'react';
import { View } from 'react-native';
import D1top1 from './D1top1';
import D1top2 from './D1top2';
import D1top3 from './D1top3';
import D1top4 from './D1top4';
import styles, { d1Top1Style, d1Top2Style, d1Top3Style } from '../styles'

export default class D1top extends PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View
                style={styles.container}
                onStartShouldSetResponderCapture={() => this.props._handleOnInnerScroll(true)}
            >
                <D1top1
                    //{...this.props} 
                    _handleCalendar={this.props._handleCalendar}
                    _handleFilterButton={this.props._handleFilterButton}
                    fromDate={this.props.fromDate}
                    toDate={this.props.toDate}
                    filterButtonSelected={this.props.filterButtonSelected}
                    style={d1Top1Style.container} />
                <D1top2
                    totalCount={this.props.totalCount}
                    style={d1Top2Style.container} />
                <D1top3
                    _handleNoiseType={this.props._handleNoiseType}
                    style={d1Top3Style.container} />
                <D1top4
                    _handleDateChange={this.props._handleDateChange} // do when slider change 
                    currentTypeSelected={this.props.currentTypeSelected}
                    _onStackBarPress={this.props._onStackBarPress}
                    filterButtonSelected={this.props.filterButtonSelected}
                    fromDate={this.props.fromDate}
                    toDate={this.props.toDate}
                    style={{ flex: 5, alignSelf: 'stretch', height: 250 }} />
            </View>
        );
    }
}