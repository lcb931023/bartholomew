var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = Backbone.View.extend({

  isPresent: false,

  template: require('../template/detail'),
  initialize: function(options) {
    this.EVI = options.EVI;
    return this.render();
  },
  render: function() {
    this.$el.html(this.template());
    return this;
  },

  transitIn: function() {
    console.log('Detail In');
    this.$el.removeClass('out');
    this.isPresent = true;
  },

  transitOut: function() {
    console.log('Detail Out');
    // TODO possibly a callback to remove() this view?
    this.$el.addClass('out');
    this.isPresent = false;
  }

});