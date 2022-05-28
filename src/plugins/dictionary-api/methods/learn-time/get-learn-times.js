'use strict';
const moment = require('moment');

module.exports = async function (request, h) {
    const monthly = moment().format('YYYY-MM')
    let allData = await this.mysql('person_learn_time')
        .select('long_time', 'learn_date')
        .where('monthly', monthly)

    allData.forEach(data => {
        data.learn_date = moment(data.learn_date).format('YYYY-MM-DD')
    })

    const monthlyHash = {};
    const monthStartDay = moment(monthly).format("YYYY-MM-DD")

    const day = moment(monthStartDay).day()
    const upMonth = moment(monthStartDay).subtract(day, 'day').format("YYYY-MM-DD")

    for (let i = 0; i < 42; i++){
        let currentDay = moment(upMonth).add(i, 'day').format("YYYY-MM-DD");
        let hasData = allData.find(data => data.learn_date === currentDay)

        monthlyHash[currentDay] = {
            day: currentDay,
            long_time: hasData ? hasData.long_time : 0,
            isCurrentMonth: currentDay.indexOf(monthly) !== -1
        }
    }

    return monthlyHash;
}
