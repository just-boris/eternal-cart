var CartProductView = Backbone.View.extend({
    tagName: 'li',
    className: 'cart-item',
    events: {
        'click .increase': 'increase',
        'click .decrease': 'decrease',
        'click .remove'  : 'resetCount'
    },
    template: _.template($('#product-cart-template').html()),
    initialize: function() {
        this.model.on('change', this.render, this);
        this.render();
    },
    increase: function() {
        this.model.increaseCount();
    },
    decrease: function() {
        this.model.decreaseCount();
    },
    resetCount: function() {
        this.model.set('count', 0);
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});
var CartView = Backbone.View.extend({
    el: '.cart',
    events: {
        'click .btn.submit': 'submitCart'
    },
    initialize: function() {
        this.products = this.options.products;
        this.products.on('change:count', this.onProductChange, this);
        this.cartProductsViews = [];
        this.productsInCart = new ProductCartList();
        this.$list = this.$('.products');
        this.render();
    },

    onProductChange: function(productModel) {
        if(productModel.previous('count') === 0 && productModel.get('count') !== 0) {
            this.putProduct(productModel);
        }
        if (productModel.previous('count') !== 0 && productModel.get('count') === 0) {
            this.removeProduct(productModel);
        }
    },

    putProduct: function(productModel) {
        var itemView = new CartProductView({
            model: productModel
        });
        this.cartProductsViews[productModel.id] = itemView;
        this.$list.append(itemView.el);
        this.productsInCart.add(productModel);
    },

    removeProduct: function(productModel) {
        this.cartProductsViews[productModel.id].remove();
        delete this.cartProductsViews[productModel.id];
        this.productsInCart.remove(productModel);
    },

    submitCart: function() {
        this.productsInCart.submit();
    }
});
