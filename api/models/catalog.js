var data = require('../../data');

function convertToCatalogData(data, query){
    var products = [];
    for(var i in data){
        if (query) {
            if (data[i].heading.toLowerCase().search(query) !== -1){
                products.push(data[i]);
            }
        } else {
            products.push(data[i]);
        }
    }
    return products;
}

module.exports = {
    get : function(){
        return convertToCatalogData(data);
    },
    search : function(query){
        var regex = new RegExp(query.toLowerCase());
        return convertToCatalogData(data, regex);
    }
}