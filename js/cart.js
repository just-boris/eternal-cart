/**
 * @name CartProductView
 * @type {Backbone.View}
 * @description представление одной единицы товара в корзине
 */
var CartProductView = Backbone.View.extend({
    tagName: 'li',
    className: 'cart-item',
    events: {
        'click .increase': 'increase',
        'click .decrease': 'decrease',
        'click .remove': 'resetCount'
    },
    template: _.template($('#product-cart-template').html()),
    initialize: function () {
        this.model.on('change', this.render, this);
        this.render();
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    increase: function () {
        this.model.increaseCount();
    },
    decrease: function () {
        this.model.decreaseCount();
    },
    resetCount: function () {
        this.model.set('count', 0);
    }
});
/**
 * @name CartView
 * @type {Backbone.View}
 * @description представление корзины в целом. Рендерит список товаров в корзине, дает команду отправки данных на сервер
 */
var CartView = Backbone.View.extend({
    el: '.cart-content',
    events: {
        'click .btn.submit': 'submitCart'
    },
    initialize: function () {
        this.products = this.options.products;
        this.products.on('change:count', this._onProductCountChange, this);
        this.cartProductsViews = [];
        this.$blankLabel = this.$('.cart-empty');
        this.$submitButton = this.$('.btn.submit');
        this.$list = this.$('.products');
        this.render();
    },
    render: function () {
        this.checkBlankCart();
    },
    _onProductCountChange: function (productModel) {
        if (productModel.previous('count') === 0 && productModel.get('count') !== 0) {
            this.putProduct(productModel);
        }
        if (productModel.previous('count') !== 0 && productModel.get('count') === 0) {
            this.removeProduct(productModel);
        }
        this.checkBlankCart();
    },
    checkBlankCart: function () {
        var emptyCart = _.compact(this.cartProductsViews).length === 0;
        this.$submitButton.attr('disabled', emptyCart);
        this.$blankLabel.toggle(emptyCart);
    },
    putProduct: function (productModel) {
        var itemView = new CartProductView({
            model: productModel
        });
        this.cartProductsViews[productModel.id] = itemView;
        this.$list.append(itemView.el);
    },
    removeProduct: function (productModel) {
        this.cartProductsViews[productModel.id].remove();
        delete this.cartProductsViews[productModel.id];
    },
    submitCart: function () {
        this.products.submit();
    }
});
