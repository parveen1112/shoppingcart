var ProductData = require('../../data');

module.exports = {
    add : function(req, res) {
        var session = req.session;
        session.cart = session.cart || {
                total : 0,
                total_price : 0
            };
        var productId = req.body['id'],
            product = session.cart[productId];

        session.cart[productId] = {
            count : product && product.count ? parseInt(product.count, 10) + 1 : 1,
            pricePerUnit : ProductData[productId].price
        };
        session.cart.total = session.cart.total + 1;
        session.cart.total_price = session.cart.total_price + parseInt(ProductData[productId].price, 10);
        return res.json({
            success : true,
            message : ["Product Added to cart"],
            data : session.cart
        })

    },
    get : function(req, res){
        var session = req.session, cart = session.cart, products = [], totalItems, totalPrice;
        for (var i in cart){
            var productData = ProductData[i];
            if (productData) {
                var quantity = cart[i].count, price = parseInt(productData.price, 10) * quantity;
                products.push({
                    id : i,
                    item : productData.heading,
                    quantity : quantity,
                    price : price
                })
            }
        }

        if (req.session.isLoggedIn) {
            return res.render('cart.ejs', {
                isLoggedIn : true,
                user : session.user,
                products : products,
                cartCount : session.cart ? session.cart.total : '0',
                cartPrice : session.cart ? session.cart.total_price : '0'
            });
        } else {
            return res.render('cart.ejs', {
                isLoggedIn : false,
                products:products,
                cartCount : session.cart ? session.cart.total : '0',
                cartPrice : session.cart ? session.cart.total_price : '0'
            });
        }
    },
    delete : function(req, res){
        var session = req.session;
        session.cart = session.cart || {
                total : 0,
                total_price : 0
            };
        var productId = req.params['id'],
            product = session.cart[productId];
        if (product && product.count) {
            var productCount = product.count;
            var productPrice = parseInt(ProductData[productId].price, 10);

            if (productCount === 1) {
                delete session.cart[productId];
            } else {
                session.cart[productId]['count'] = productCount - 1;
            }

            session.cart.total = session.cart.total > 1 ? session.cart.total - 1 : 0;
            session.cart.total_price = session.cart.total_price > productPrice ? session.cart.total_price - productPrice : 0;
            return res.json({
                success : true,
                message : ["Product Deleted from cart"],
                data : session.cart
            })
        } else {
            return res.json({
                success : true,
                message : ["Product Not in cart"],
                data : session.cart
            })
        }
    },
    remove : function(req, res) {
        var session = req.session;
        session.cart = session.cart || {
                total : 0,
                total_price : 0
            };
        var productId = req.params['id'],
            product = session.cart[productId];
        if (product && product.count) {
            var productCount  = product.count;
            var productPrice = parseInt(ProductData[productId].price, 10) * productCount;
            delete session.cart[productId];
            session.cart.total = session.cart.total > productCount ? session.cart.total - productCount : 0;
            session.cart.total_price = session.cart.total_price > productPrice ? session.cart.total_price - productPrice : 0;
        }
        res.redirect('/cart');
    },
    clear : function(req, res) {
        delete req.session.cart;
        res.redirect('/cart');
    }
}