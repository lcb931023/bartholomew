var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = Backbone.View.extend({
  template: require('../template/work'),
  initialize: function() {
    return this.render();
  },
  render: function() {
    this.$el.html(this.template());
    // Get Tooltip Names
    var arrTooltip = [];
    _.each(this.$(".section > .title"), function getHTML (element) {
      arrTooltip.push($(element).html());
    });
    // Start PagePiling
    this.$("#pagepiling").pagepiling({
      verticalCentered:false,
      navigation: {
        'textColor': '#000',
        'bulletsColor': '#000',
        'position': 'right',
        'tooltips': arrTooltip
      },
    });

    return this;
  }

});
