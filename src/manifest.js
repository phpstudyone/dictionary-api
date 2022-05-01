'use strict';

const config = require('config');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Pack = require(__dirname + '/../package.json');
/**
 * Manifest for the Service.
 */
const manifest = {
    server: {
        app: {
            slogan: Pack.description
        },
        debug: {
            request: ['error']
        },
        port  : 80,
        routes: {
            // cors: true
            cors: {
                headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'],
                origin : ['*'],
                credentials: true
            }
        }
    },
    register: {
        plugins: [
            Inert,
            Vision,
            {
                plugin : './plugins/dictionary-api/plugin.js',
                options: config.get('dictionary-api')
            }
        ]
    }
};
/**
 * Export the Instance to the World
 */
module.exports = manifest;
