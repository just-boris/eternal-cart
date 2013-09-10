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
        this.$blankLabel = this.$('.cart-empty');
        this.$submitButton = this.$('.btn.submit');
        this.$list = this.$('.products');
        this.render();
    },

    render: function() {
        this.checkBlankCart();
    },

    onProductChange: function(productModel) {
        if(productModel.previous('count') === 0 && productModel.get('count') !== 0) {
            this.putProduct(productModel);
        }
        if (productModel.previous('count') !== 0 && productModel.get('count') === 0) {
            this.removeProduct(productModel);
        }
        this.checkBlankCart();
    },

    checkBlankCart: function() {
        var emptyCart = _.compact(this.cartProductsViews).length === 0;
        this.$submitButton.attr('disabled', emptyCart);
        this.$blankLabel.toggle(emptyCart);
    },

    putProduct: function(productModel) {
        var itemView = new CartProductView({
            model: productModel
        });
        this.cartProductsViews[productModel.id] = itemView;
        this.$list.append(itemView.el);
    },

    removeProduct: function(productModel) {
        this.cartProductsViews[productModel.id].remove();
        delete this.cartProductsViews[productModel.id];
    },

    submitCart: function() {
        this.products.submit();
    }
});
