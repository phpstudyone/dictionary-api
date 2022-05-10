const moment = require('moment');

class DictionaryRepo {
	constructor(db) {
        this.table = db('person_order');
        this.db = db;
    }

    //找出熟练度在 60% 以下的 word 进入到 order 表.
    insertOrder = async (words) => {

        let allWords = await this.db('dictionary')
            .select('id')
            .whereIn('keyword', words);

        allWords = allWords.map(word => word.id)

        let moreThen60 = await this.db.select({ id: 'd.id' })
            .from({ d: 'dictionary' })
            .leftJoin({ pd: 'person_dictionary' }, 'd.id', 'pd.dictionary_id')
            .where('pd.level', '>=', 4)
            .whereIn('d.keyword', words);

        moreThen60 = moreThen60.map(word => word.id)

        const ids = allWords.filter(x => !moreThen60.includes(x));
        if (ids.length) {
            await this.table.insert({
                title: '',
                url: '',
                dictionary_ids: JSON.stringify(ids),
                create_date: moment().format('YYYY-MM-DD')
            });
        };
    }
}

module.exports = DictionaryRepo;
