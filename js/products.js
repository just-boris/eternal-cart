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
    url: 'json/products.json',

    resetAllCount: function() {
        this.each(function(model) {model.set('count', 0)});
    },

    submit: function() {
        var self = this;

        Backbone.sync('create', this, {
            //раскомментить строчку, чтобы проверить успешную отправку
//            method: 'GET',
            url: 'json/success.json',
            success: function() {
                self.trigger("submitSuccess");
                self.resetAllCount();
            },
            error: function() {
                self.trigger("submitFailure")
            }
        })
    }
});