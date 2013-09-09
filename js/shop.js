var ShopProductView = Backbone.View.extend({
        events: {
            'click button.add': 'putToCart'
        },
        template: _.template($('#product-shop-template').html()),
        initialize: function() {
            this.render();
        },
        render: function() {
            this.setElement(this.template(this.model.toJSON()));
            return this;
        },
        putToCart: function() {
            this.model.putToCart();
        }
    });
var ShopView = Backbone.View.extend({
    el: '.shop',
    initialize: function() {
        this.products = new ProductList([], {
            url: 'json/products.json'
        });
        this.products.fetch();
        this.products.on('add', this.addProduct, this);
        this.products.on('putToCart', this.onPutToCart, this);
    },

    addProduct: function(productModel) {
        this.$el.append(new ShopProductView({
            model: productModel
        }).el)
    },

    onPutToCart: function(productModel) {
        this.trigger('putToCart', productModel);
    }
});