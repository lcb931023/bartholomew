var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = require('jquery');

var DetailView  = require('./detail');

module.exports = DetailView.extend({

  template: require('../template/detailHeadphone'),

  initialize: function(options) {
    DetailView.prototype.initialize.apply(this, arguments);
  }
});
