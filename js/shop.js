/**
 * @name ShopProductView
 * @type {Backbone.View}
 * @description представление одного товара в списке магазина
 */
var ShopProductView = Backbone.View.extend({
    events: {
        'click button.add': 'putToCart'
    },
    template: _.template($('#product-shop-template').html()),
    initialize: function () {
        this.render();
    },
    render: function () {
        this.setElement(this.template(this.model.toJSON()));
        return this;
    },
    putToCart: function () {
        this.model.increaseCount();
    }
});
/**
 * @name ShopView
 * @type {Backbone.View}
 * @description представление магазина со списком всех товаров в нем
 */
var ShopView = Backbone.View.extend({
    el: '.shop',
    initialize: function () {
        this.products = this.options.products;
        this.products.on('add', this.addProduct, this);
    },

    addProduct: function (productModel) {
        this.$el.append(new ShopProductView({
            model: productModel
        }).el)
    }
});