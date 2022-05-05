'use strict';

module.exports = async function (request, h) {
    const { query, lastId } = request.params;
    let allData = this.mysql()
        .select(['pd.level', 'd.describe', 'd.keyword', 'd.video', 'd.all_describe'])
        .from('person_dictionary as pd')
        .leftJoin('dictionary as d', 'd.id', 'pd.dictionary_id')
        .where('pd.id', '>', lastId)

    if (query !== 'all') {
        allData.andWhere('pd.level', query)
    }
    allData = await allData.limit(50);
    allData.forEach(data => {
        data.all_describe = JSON.parse(data.all_describe)
    });

    return allData;
}
