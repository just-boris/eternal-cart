var CartProductView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#product-cart-template').html()),
    initialize: function() {
        this.model.on('change', this.render, this);
        this.render();
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
        this.products = new ProductList([], {
            url: function() {
                return 'json/success.json'
            }
        });
        this.$list = this.$('.products');
        this.products.on('add', this.addProduct, this);
        this.render();
    },
    addProduct: function(productModel) {
        this.$list.append(new CartProductView({
            model: productModel
        }).el)
    },
    putProduct: function(productModel) {
        if(this.products.get(productModel)) {
            productModel.increaseCount();
        }
        this.products.add(productModel);
    },
    submitCart: function() {
        this.products.submit();
    }
});
