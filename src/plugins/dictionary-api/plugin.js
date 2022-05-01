'use strict';

const implementation = require('./implementation');
const entryPoints    = require('./entrypoints');

/**
 * Register the Implementation to act like a Hapi Plugin.
 *
 * @param {Object} server  - Hapi Server Object
 * @param {Object} options - Options passed by the Service
 */
const register = async function(server, options) {
    const instance = new implementation(options);

    return await entryPoints(server, instance);
};

module.exports = {
    name: 'dictionary-api',
    register
};
