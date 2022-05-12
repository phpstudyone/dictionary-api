'use strict';

const knex = require('knex');

const Plugin = function Plugin(options = {}) {
    this.options = options;
    this.mysql = knex(this.options.mysql);
};

Plugin.prototype = Object.assign(Plugin.prototype, {
    healthCheck: require('./methods/health-check'),
    postOrder: require('./methods/order/post-order'),
    getOrders: require('./methods/order/get-orders'),
    getOrderInfo: require('./methods/order/get-order-info'),
    getPersonInfo: require('./methods/get-person-info'),
    getDictionaryList: require('./methods/dictionary/get-dictionary-list'),
    postDictionaryInfo: require('./methods/dictionary/post-dictionary-info'),
    postDictionaryScore: require('./methods/dictionary/post-dictionary-score'),
    postLearnTime: require('./methods/learn-time/post-learn-time'),
    getLearnTimes: require('./methods/learn-time/get-learn-times'),
    getLearnTime: require('./methods/learn-time/get-learn-time'),
    download: require('./methods/download'),
});

/**
 * Export the Instance to the World
 */
module.exports = Plugin;
