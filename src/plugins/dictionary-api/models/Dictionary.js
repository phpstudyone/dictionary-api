class DictionaryRepo {
	constructor(db) {
		this.table = db('dictionary');
	}
}

module.exports = DictionaryRepo;
