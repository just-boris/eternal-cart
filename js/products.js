/**
 * @name Product
 * @type {Backbone.Model}
 * @description Модель отдельного товара в магазине. Поле count - число товара в корзине
 */
var Product = Backbone.Model.extend({
    defaults: {
        "id": "",
        "title": "",
        "description": "",
        "count": 0
    },
    initialize: function() {
        this.on('change:count', this._onChangeCount, this)
    },
    increaseCount: function() {
        this.set('count', this.get('count')+1);
    },

    decreaseCount: function() {
        this.set('count', this.get('count')-1);
    },

    _onChangeCount: function() {
        ProductStorage.setCount(this.get('id'), this.get('count'));
    }
});
/**
 * @name ProductList
 * @type {Backbone.Model}
 * @description Коллекция, содержащая все товары в магазине. Загружает и отправляет их на сервер
 */
var ProductList = Backbone.Collection.extend({
    model: Product,

    resetAllCount: function() {
        this.each(function(model) {model.set('count', 0)});
    },
    load: function() {
        this.fetch({
            url: 'json/products.json',
            success: function(collection) {
                collection.each(function(model) {
                    model.set('count', ProductStorage.getCount(model.id));
                });
            }
        });
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