'use strict';
const moment = require('moment');

module.exports = async function (request, h) {
    const monthly = moment().format('YYYY-MM')
    const allData = await this.mysql('person_learn_time')
        .select('long_time')
        .where('monthly', monthly)

    return allData;
}
