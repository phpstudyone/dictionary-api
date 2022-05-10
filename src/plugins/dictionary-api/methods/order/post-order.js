'use strict';

const  PersonOrder = require('../../models/PersonOrder');

module.exports = async function (request, h) {
    const { words } = request.payload;

    let existWords = await this.mysql('dictionary')
        .select('keyword')
        .whereIn('keyword', words)
    existWords = existWords.map(word => word.keyword);

    const exceptionKeyword = words.filter(x => !existWords.includes(x));
    if (exceptionKeyword.length) {
        const insertData = exceptionKeyword.map(keyword => ({
            keyword,
            all_describe: '',
            describe: '',
            type: 1,
            video: ''
        }));

        await this.mysql('dictionary').insert(insertData);
    }

    const personOrder = new PersonOrder(this.mysql)
    personOrder.insertOrder(words);

    return exceptionKeyword;
}
