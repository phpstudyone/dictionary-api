'use strict';

const  PersonDictionary = require('../../models/PersonDictionary');

module.exports = async function (request, h) {
    const { words } = request.payload;

    let existWords = await this.mysql('dictionary')
        .select('keyword')
        .whereIn('keyword', words)
    existWords = existWords.map(word => word.keyword);

    const exceptionKeyword = words.filter(x => !existWords.includes(x));
    const insertData = exceptionKeyword.map(keyword => ({
        keyword,
        all_describe: '',
        describe: '',
        type: 1,
        video: ''
    }));

    await this.mysql('dictionary').insert(insertData);

    const personDictionary = new PersonDictionary(this.mysql)
    personDictionary.insertDictionary(exceptionKeyword);

    return exceptionKeyword;
}
