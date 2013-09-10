var AppView = Backbone.View.extend({

    initialize: function() {
        this.products = new ProductList();
        this.messageView = new MessageView({
            products: this.products
        });
        this.cartView = new CartView({
            products: this.products
        });
        this.shopView = new ShopView({
            products: this.products
        });
        this.products.fetch({
            success: function(collection) {
                collection.each(function(model) {
                    var count = ProductStorage.getItem(model.id);
                    if(count) {
                        model.set('count', parseInt(count, 10));
                    }

                })
            }
        });

    }
});
$(document).ready(function() {
    new AppView({el: '.container'});
});