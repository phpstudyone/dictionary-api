const moment = require('moment');

class DictionaryRepo {
	constructor(db) {
        this.table = db('person_dictionary');
        this.db = db;
    }

    insertDictionary = async (words) => {
        const keywords = await this.db('dictionary').select('id', 'keyword').whereIn('keyword', words)
        const pdInsertArr = keywords.map(keyword => ({
            dictionary_id: keyword.id,
            score: 20,
            learn_count: 0,
            create_date: moment().format('YYYY-MM-DD'),
            level: 1
        }));
        if (pdInsertArr) {
            await this.table.insert(pdInsertArr);
        }
    }
}

module.exports = DictionaryRepo;
