'use strict';

module.exports = async function (request, h) {
    const allData = await this
        .mysql('person_dictionary')
        .select('level', this.mysql.raw('count(*) as count'))
        .groupBy('level');

    if (!allData.length) {
        return false;
    }
    const result = {
        count: 0,
        data: {}
    };
    allData.forEach(data => {
        result.data[data.level] = data.count;
        result.count += data.count;
    });

	return result;
}
