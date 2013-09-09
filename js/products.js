var Product = Backbone.Model.extend({
    defaults: {
        "id": "",
        "title": "",
        "description": "",
        "count": 1
    },
    increaseCount: function() {
        this.set('count', this.get('count')+1);
    },
    putToCart: function() {
        this.trigger("putToCart", this);
    }
});
var ProductList = Backbone.Collection.extend({
    model: Product,
    submit: function() {
        Backbone.sync('create', this)
    }
});