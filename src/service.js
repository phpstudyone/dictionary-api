'use strict';
const Glue     = require('@hapi/glue');
const Manifest = require('./manifest');

const startService = async function() {
    const server = await Glue.compose(Manifest, {
        relativeTo: __dirname
    });

    await server.start();
    server.log(['log'], 'Service started');
};

startService();
