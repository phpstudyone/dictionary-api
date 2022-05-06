'use strict';

const moment = require('moment');

module.exports = async function (request, h) {
    const allData = await this.mysql('person_order')
        .select('id','title','url','create_date')
        .orderBy('create_date', 'desc');

    allData.forEach(data => {
        data.create_date = moment(data.create_date).format('YYYY-MM-DD')
    })
    return allData;
}
