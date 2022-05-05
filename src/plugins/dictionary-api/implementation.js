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
    postDictionaryInfo: require('./methods/post-dictionary-info'),
    postOrder: require('./methods/post-order'),
    getOrders: require('./methods/get-orders'),
    getOrderInfo: require('./methods/get-order-info'),
});

/**
 * Export the Instance to the World
 */
module.exports = Plugin;
