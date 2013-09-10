var MessageView = Backbone.View.extend({
    el: '.message',
    ajaxErrorTemplate: $('#error-message-template').html(),
    successSubmitTemplate: $('#success-submit-template').html(),
    initialize: function() {
        this.products = this.options.products;
        this.products.on("submitSuccess", this.onSuccessSubmit, this);
        this.products.on("submitFailure", this.onErrorSubmit, this);
    },

    showMessage: function(template) {
        var message = $(template);
        this.$el.append(message);
        window.setTimeout(function() {
            message.remove();
        }, 3000);
    },

    onSuccessSubmit: function() {
        this.showMessage(this.successSubmitTemplate);
    },

    onErrorSubmit: function() {
        this.showMessage(this.ajaxErrorTemplate);
    }
});