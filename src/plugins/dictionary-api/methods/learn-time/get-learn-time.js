'use strict';
const moment = require('moment');

module.exports = async function (request, h) {
    const day = moment().format('YYYY-MM-DD')
    const allData = await this.mysql('person_learn_time')
        .select('long_time')
        .where('learn_date', day)
    if (allData.length === 0) {
        return { long_time: 0 };
    }
    return allData[0];
}
