# Shopping Cart System

Application to shop items.

# Custom Framework

I have created a custom framework over #express for this application. This framework is somewhat similar to sails.

api folder contains middlewares, controllers, models, services.
assets folder contains the static files.
logs folder will contain the generated log files. I am using winston for logging <lib/logger>.
configs contains the configuration files.
configs/env contains the environment configurations.
Grunt jobs to be define in Gruntfile.js


# Shopping Cart System

api folder contains the routes.js which contains the routes and their controllers and middlewares. using this file, we initialize our custom router <lib/router>.

We are using ejs templating. All the views exists in views folder.

configs/bootstrap.js initializes our router.

Mantaining Sessions in Memory Store


# Steps to start the application
1. npm install
2. grunt
3. node server.js

# How to use

1. Catalog Page - Search Items and Add to cart. shipping icon the takes you to the cart
2. PDP Page - Display Item already in cart, Add to Cart, remove from cart, back to store, shipping icon the takes you to the cart
3. Cart Page - Item Quantity Spinner, Remove the Item, Clear Cart, back to Store.
4. Shop and Enjoy

If you are still not able to run it or wish to contribute. Then mail me
    Parveen Arora - <a href="mailto:parveen1112@gmail.com">parveen1112@gmail.com</a>