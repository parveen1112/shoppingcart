/**
 * Customer Router to initialize routes
 * @param app Express Router
 * @constructor
 */
var Router = function (app) {
    this.router = app;
}
/**
 * Function to add Routes
 * @param route Route
 * @param chain Route Chain
 * @param method Route Method
 */
Router.prototype.add = function(route,controller, method, middlewares) {
    var routeChain = [];
    for (var i = 0; i < middlewares.length; i++){
        routeChain.push(this.getMiddlewareCallback(middlewares[i]));
    }
    routeChain.push(this.getControllerCallback(controller));
    this.router[method](route, routeChain);
}

/**
 * Converting method to promise and handling next calls
 * @param service Method from routes.js
 * @returns {Function}
 */
Router.prototype.getControllerCallback = function (service) {
    return function (req, res, next) {
        Promise.all([service(req, res)]).catch(function (err) {
            next(err);
        });
    }
};

/**
 * Converting method to promise and handling next calls
 * @param service Method from routes.js
 * @returns {Function}
 */
Router.prototype.getMiddlewareCallback = function (middleware) {
    return function (req, res, next) {
        Promise.all([service(req, res)]).then(function (response) {
            next();
        }).catch(function (err) {
            next(err);
        });
    }
};


module.exports = {
    // Function to initialize Router
    initialize : function(app, routeConfiguration) {
        var router = new Router(app);
        for(var i in routeConfiguration) {
            var route = i;
            if (i.toLowerCase().indexOf('post ') > -1) {
                route = i.substr(5, i.length);
            }
            router.add(route, routeConfiguration[i]['controller'], routeConfiguration[i]['method'] || 'get', routeConfiguration[i]['middlewares'] || []);
        }
    }
}