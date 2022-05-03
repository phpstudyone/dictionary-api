'use strict';

const moment = require('moment');

module.exports = async function (request, h) {
    let allData = await this.mysql('person_dictionary')
        .select('create_date')
        .groupBy('create_date');

    return allData.map(data => moment(data.create_date)
        .format('YYYY-MM-DD'))
        .sort((a, b) => {
            if (b < a) return -1
        });
}
