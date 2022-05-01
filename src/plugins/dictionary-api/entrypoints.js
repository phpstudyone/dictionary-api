'use strict';

/**
 * EntryPoints into the Plugin.
 * These can be URI's or Bus Messages.
 *
 * @param {Object} server - Hapi Server Object
 * @param {Object} plugin - Instance of the Implementation
 */
const entryPoints = function(server, plugin) {
    server.bind(plugin);

    server.route({
        method : 'GET',
        path   : '/health',
        options: {
            auth       : false,
            handler    : plugin.healthCheck,
            description: 'Health check endpoint',
            notes      : 'Returns a successful message when the service is running.',
            tags       : ['api']
        }
    });

    server.route({
        method: 'GET',
        path: '/dictionary/info',
        handler: plugin.getDictionaryInfo,
    });

    server.route({
        method: 'GET',
        path: '/dictionary/list/{query}/{lastId}',
        handler: plugin.getDictionaryList,
    });
};
/**
 * Export the Instance to the World
 */
module.exports = entryPoints;
