'use strict';

module.exports = async function (request, h) {
    const { id } = request.params;
    const ids = await this
        .mysql('person_order')
        .select('dictionary_ids')
        .where({ id })

    const allData = await this
        .mysql('dictionary')
        .whereIn('id', JSON.parse(ids[0].dictionary_ids))

    allData.forEach(data => {
        data.all_describe = JSON.parse(data.all_describe)
    });
	return allData;
}
