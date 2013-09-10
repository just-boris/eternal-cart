var Product = Backbone.Model.extend({
    defaults: {
        "id": "",
        "title": "",
        "description": "",
        "count": 0
    },
    initialize: function() {
        this.on('change:count', this.onChangeCount, this)
    },
    increaseCount: function() {
        this.set('count', this.get('count')+1);
    },

    decreaseCount: function() {
        this.set('count', this.get('count')-1);
    },

    onChangeCount: function() {
        ProductStorage.setItem(this.get('id'), this.get('count'));
    }

});
var ProductList = Backbone.Collection.extend({
    model: Product,
    url: 'json/products.json'
}), ProductCartList = ProductList.extend({
    submit: function() {
        Backbone.sync('create', this, {
            url: 'json/success.json'
        })
    }
});