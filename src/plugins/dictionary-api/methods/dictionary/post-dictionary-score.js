'use strict';
const { scoreToLevel } = require('../../helpers/tools')
const moment = require('moment');

module.exports = async function (request, h) {
    let { id, score } = request.payload;
    score = parseInt(score);
    const dictionary = await this.mysql('person_dictionary').where('dictionary_id', id);

    if (dictionary) {
        const updateScore = (dictionary[0].score + score > 100) ? 100 : dictionary[0].score + score;

        const updateData = {
            score: updateScore,
            level: scoreToLevel(updateScore),
        }

        await this.mysql('person_dictionary')
            .where('dictionary_id', id)
            .update(updateData);

    } else {
        const insertData = {
            dictionary_id: id,
            score,
            learn_count: scoreToLevel(score),
            create_date: moment().format('YYYY-MM-DD'),
            level: scoreToLevel(score),
        };

        await this.mysql('person_dictionary').insert(insertData);
    }
    return 'OK';
}
