var catalogModel = require('../models/catalog');

module.exports = {
    get : function(req, res){
        var products = [], session = req.session;
        if (req.url.indexOf('/search') > -1 && req.query && req.query.q) {
            products = catalogModel.search(req.query.q);
        } else {
            products = catalogModel.get();
        }
        if (session.isLoggedIn) {
            return res.render('index.ejs', {
                isLoggedIn : true,
                user : session.user,
                products : products,
                cartCount : session.cart ? session.cart.total : '0',
                cartPrice : session.cart ? session.cart.total_price : '0'
            });
        } else {
            return res.render('index.ejs', {
                isLoggedIn : false,
                products : products,
                cartCount : session.cart ? session.cart.total : '0',
                cartPrice : session.cart ? session.cart.total_price : '0'
            });
        }
    },
    /**
     * Controller when user logs in
     * @param req
     * @param res
     * @returns {String}
     */
    addUser : function(req, res){
        var user = req.body['username'];
        if (user === 'admin') {
            req.session.user = user;
            req.session.isLoggedIn = true;
            return res.redirect('/');
        } else {
            return res.render('index.ejs', {
                isLoggedIn : false,
                error : "Not a valid user"
            });
        }
    },
    /**
     * Controller when User logs out
     * @param req
     * @param res
     */
    logout : function(req, res) {
        req.session.user = null;
        req.session.isLoggedIn = null;
        delete req.session.user;
        delete req.session.isLoggedIn;
        return res.redirect('/');
    }
};