import data from './detaildata'
import moment from 'moment'

// fetch data here 
// all data if fromDate and toDate are not passed
export const loadData = (fromDate, toDate) => {
    if (fromDate !== undefined && toDate !== undefined)
        return data.filter((val, key) => val.time >= fromDate && val.time <= toDate)
    else
        return data
}

export const getSelectedNoiseData = (fromDate, toDate, noiseType) => {
    if (fromDate !== undefined && toDate !== undefined) {
        return data.filter((val, key) => val.time >= fromDate && val.time <= toDate && val.type === noiseType)
    }
    else {
        return data
    }
}

// export const getSelectedNoiseData = (from, to, type) => {
//     return data.filter((val, key) => val.time >= from && val.time <= to && val.type === type)

// }

// determine the 7 days ( today and previous 6 days)
export const get7Days = () => {
    // console.log('moment',moment(1548974015))
    // console.log("A",moment(1548974015).subtract(6, 'days'))
    return {
        toDate: moment().unix(),
        fromDate: moment().subtract(6, 'days').unix()
    }
}

// determine the 24 hours from current time
export const get24Hours = () => {
    return {
        toDate: moment().unix(),
        fromDate: moment().subtract(1, 'days').unix()
    }
}

// format date of 12
export const unixToTime = (timestamp) => {
    return moment.unix(timestamp).utc().format('HH') //.utcOffset('+0630')
}

// format date of 20-08-19
export const unixToDate = (timestamp) => {

    return moment.unix(timestamp).utc().format('DD-MM-YY') //.utcOffset('+0630')
}

// format date of 20-08-19 12:11
export const unixToDateTime = (timestamp) => {
    return moment.unix(timestamp).utc().format('DD-MM-YY HH:mm') //.utcOffset('+0630')
}