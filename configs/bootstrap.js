var Logger = require('./../lib/logger'),
    path = require('path'),
    Router = require('../lib/router');


function merge(destination, source){
    for (var i in source){
        destination[i] = source[i];
    }
}

module.exports = function (bootstrapLocation, router) {
    global.shopCartSys = {
        config : {},
        env : process.env.NODE_ENV || 'development'
    };
    // Requiring base config
    shopCartSys.config = require(path.join(bootstrapLocation, 'configs', 'config.js'));
    // Requiring environment based configs
    if(shopCartSys.env){
        var env_config = require(path.join(bootstrapLocation, 'configs', 'env', shopCartSys.env + '.js'));
    }
    merge(shopCartSys.config, env_config);
    global.log = new Logger(shopCartSys.config.logs, true);

    // All the routes have been initialized using custom router in lib.
    // routes.js file contains all the routes in api folder
    Router.initialize(router, require('../api/routes.js'));
};