var ProductData = require('../../data');
module.exports = {
    get : function(req, res){
        if (req.params && req.params.product){
            var product = ProductData[req.params.product], session = req.session;
            if (product) {
                var inCart = session.cart && session.cart[req.params.product] ? true : false;
                if (session.isLoggedIn) {
                    return res.render('pdp.ejs', {
                        isLoggedIn : true,
                        user : session.user,
                        product : product,
                        inCart : inCart,
                        cartCount : session.cart ? session.cart.total : '0',
                        cartPrice : session.cart ? session.cart.total_price : '0'
                    });
                } else {
                    return res.render('pdp.ejs', {
                        isLoggedIn : false,
                        product : product,
                        inCart : inCart,
                        cartCount : session.cart ? session.cart.total : '0',
                        cartPrice : session.cart ? session.cart.total_price : '0'
                    });
                }
            }
            return res.render('404');
        }
    }
}