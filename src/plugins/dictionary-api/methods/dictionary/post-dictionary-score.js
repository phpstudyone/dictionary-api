'use strict';
const { scoreToLevel } = require('../../helpers/tools')
const moment = require('moment');

const singleHandler = (that) => async (id, score) => {
    const dictionary = await that.mysql('person_dictionary').where('dictionary_id', id);

    if (dictionary.length) {
        let updateScore = parseInt(dictionary[0].score) + score;
        updateScore > 100 && (updateScore = 100)
        const updateData = {
            score: updateScore,
            level: scoreToLevel(updateScore),
        }

        await that.mysql('person_dictionary')
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

        await that.mysql('person_dictionary').insert(insertData);
    }
}

module.exports = async function (request, h) {
    let { id, score, data_s } = request.payload;

    if (data_s && data_s instanceof Array) {
        data_s.forEach(data => {
            singleHandler(this)(data.id, parseInt(data.score));
        })
    } else {
        score = parseInt(score);
        singleHandler(this)(id, score);
    }
    return 'OK';
}
