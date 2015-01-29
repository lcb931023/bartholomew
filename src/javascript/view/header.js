var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = Backbone.View.extend({
  template: require('../template/header'),
  initialize: function() {
    return this.render();
  },
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
