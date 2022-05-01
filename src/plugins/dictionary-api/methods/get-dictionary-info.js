'use strict';

module.exports = function (request, h) {
	return 'Hello World!' + JSON.stringify(process.env);
}
