/**
 * @name AppView
 * @type {Backbone.View}
 * @description Основной view приложения. Связывает все дочерние view с коллекцией products
 */
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
        this.products.load();

    }
});
$(document).ready(function() {
    new AppView({el: '.container'});
});