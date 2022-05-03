'use strict';

const knex = require('knex');

const Plugin = function Plugin(options = {}) {
    this.options = options;
    this.mysql = knex(this.options.mysql);
};

Plugin.prototype = Object.assign(Plugin.prototype, {
    healthCheck: require('./methods/health-check'),
    getPersonInfo: require('./methods/get-person-info'),
    getDictionaryList: require('./methods/get-dictionary-list'),
    postDictionaryOrder: require('./methods/post-dictionary-order'),
    getDictionaryOrders: require('./methods/get-dictionary-orders'),
    postDictionaryInfo: require('./methods/post-dictionary-info'),
});

/**
 * Export the Instance to the World
 */
module.exports = Plugin;
