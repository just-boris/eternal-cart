/**
 * @name Product
 * @type {Object}
 * @description Адаптер для обращения к localStorage для сохранения числа товаров в корзине
 */
var ProductStorage =  {
    _prefix: 'product-',
    getCount: function(id) {
        var count = localStorage.getItem(this._prefix+id);
        return count ? parseInt(count, 10) : 0;
    },

    setCount: function(id, count) {
        if(count !== 0) {
            localStorage.setItem(this._prefix+id, count);
        }
        else {
            this.removeItem(id);
        }
    },

    removeItem: function(id) {
        localStorage.removeItem(this._prefix+id);
    }
};