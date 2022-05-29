'use strict';

module.exports = async function (request, h) {
    let { level, limit = 50 } = request.params;
    let sql = this.mysql('person_dictionary').select('dictionary_id as id');
    if (level === 'all') {
        sql.where('level', '!=', 5)
    } else {
        sql.where('level', level)
    }
    const ids = await sql;

    const responseIds = [];
    for (let i = 0; i < limit; i++){
        const random = parseInt(Math.random() * ids.length);
        const id = ids[random].id
        responseIds.push(id);
    }

    const allData = await this.mysql('dictionary').whereIn('id', responseIds)

    allData.forEach(data => {
        data.all_describe = data.all_describe ? JSON.parse(data.all_describe) : []
    });

    return allData;
}
