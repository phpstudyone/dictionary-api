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

    /**
     * 获取不同掌握度单词列表
     */
    server.route({
        method: 'GET',
        path: '/dictionary/list/{level}/{limit?}',
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

    /**
     * 获取所有的 order
     */
    server.route({
        method: 'get',
        path: '/orders',
        handler: plugin.getOrders,
    });

    /**
     * 获取指定order 的单词列表
     */
    server.route({
        method: 'get',
        path: '/order/{id}',
        handler: plugin.getOrderInfo,
    });

    server.route({
        method: 'post',
        path: '/dictionary/score',
        handler: plugin.postDictionaryScore,
    });
};
/**
 * Export the Instance to the World
 */
module.exports = entryPoints;
