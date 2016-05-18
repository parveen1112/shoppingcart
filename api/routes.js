var controllers = require('./controllers');

module.exports = {
    '/' : {
        method : 'get',
        controller : controllers.IndexController.get
    } ,
    '/user' : {
        method : 'post',
        controller : controllers.IndexController.addUser
    },
    '/logout' : {
        method : 'get',
        controller : controllers.IndexController.logout
    },
    '/search' : {
        method : 'get',
        controller : controllers.IndexController.get
    },
    '/cart' : {
        method  : 'get',
        controller : controllers.CartController.get
    },
    'POST /cart' : {
        method  : 'post',
        controller : controllers.CartController.add
    },
    '/cart/clear' : {
        method : 'get',
        controller : controllers.CartController.clear
    },
    '/cart/:id' : {
        method  : 'delete',
        controller : controllers.CartController.delete
    },
    '/cart/remove/:id' : {
        method  : 'get',
        controller : controllers.CartController.remove
    },
    '/pdp/:product' : {
        method  : 'get',
        controller : controllers.PDPController.get
    }

}