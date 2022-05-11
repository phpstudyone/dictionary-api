'use strict';
const { getUrlHtmlString, getUrlWord } = require('../../helpers/tools');
const DictionaryOrderRepo = require('../../models/PersonOrder');

module.exports = async function (request, h) {
    const { url } = request.payload;
    const html = await getUrlHtmlString(url)
    let title = html.match(/<title>(.*)<\/title>/);
    if (!title) return false;
    title = title[1];
    const words = getUrlWord(html);
    if (!words.length) return false;

    let existWords = await this.mysql('dictionary')
        .select('keyword')
        .whereIn('keyword', words)
    existWords = existWords.map(word => word.keyword);

    const exceptionKeyword = words
        .filter(x => !existWords.includes(x))
        .splice(0, 50);
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

    const personOrder = new DictionaryOrderRepo(this.mysql)
    personOrder.insertOrder(words, url, title);

    return exceptionKeyword;
}
