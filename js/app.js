var AppView = Backbone.View.extend({

    initialize: function() {
        this.render();
    },
    render: function() {
        this.cartView = new CartView();
        this.shopView = new ShopView();
        this.shopView.on('putToCart', _.bind(this.putToCart, this))
    },

    putToCart: function(productModel) {
        this.cartView.putProduct(productModel);
    }
});
$(document).ready(function() {
    new AppView({el: '.container'});
});