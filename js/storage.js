var ProductStorage =  {
    _prefix: 'product-',
    getItem: function(id) {
        return localStorage.getItem(this._prefix+id);
    },

    setItem: function(id, count) {
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