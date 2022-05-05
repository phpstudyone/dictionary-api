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

    /**
     * 获取个人学习情况
     */
    server.route({
        method: 'GET',
        path: '/person/info',
        handler: plugin.getPersonInfo,
    });

    server.route({
        method: 'GET',
        path: '/dictionary/list/{query}/{lastId}',
        handler: plugin.getDictionaryList,
    });

    /**
     * 从百度翻译中获取 keyword info
     */
     server.route({
        method: 'POST',
        path: '/dictionary/info',
        handler: plugin.postDictionaryInfo,
    });

    /**
     * 生成学习清单
     */
    server.route({
        method: 'POST',
        path: '/order',
        handler: plugin.postOrder,
    });

    server.route({
        method: 'get',
        path: '/orders',
        handler: plugin.getOrders,
    });

    server.route({
        method: 'get',
        path: '/order/{id}',
        handler: plugin.getOrderInfo,
    });
};
/**
 * Export the Instance to the World
 */
module.exports = entryPoints;
