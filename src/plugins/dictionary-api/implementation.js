'use strict';

const knex = require('knex');

const Plugin = function Plugin(options = {}) {
    this.options = options;
    this.mysql = knex(this.options.mysql);
};

Plugin.prototype = Object.assign(Plugin.prototype, {
    healthCheck: require('./methods/health-check'),
    getDictionaryInfo: require('./methods/get-dictionary-info'),
    getDictionaryList: require('./methods/get-dictionary-list'),
});

/**
 * Export the Instance to the World
 */
module.exports = Plugin;
