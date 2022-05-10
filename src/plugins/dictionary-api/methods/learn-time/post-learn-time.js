'use strict';
const moment = require('moment');

module.exports = async function (request, h) {
    const { times } = request.payload;
    const day = moment().format('YYYY-MM-DD');
    const monthly = moment().format('YYYY-MM');
    const days = await this.mysql('person_learn_time').where('learn_date', day);
    if (days[0]) {
        await this.mysql('person_learn_time')
            .where('id', days[0].id)
            .update({
                long_time: days[0].long_time + times
            });
    } else {
        await this.mysql('person_learn_time')
            .insert({
                learn_date: day,
                long_time: times,
                monthly
            })
    }
    return 'OK';
}
