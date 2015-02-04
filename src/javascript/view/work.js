var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = Backbone.View.extend({
  template: require('../template/work'),
  initialize: function(options) {

    /*** Event Publishing ***/
    // When you need to trigger(publish) some events within here
    this.EVI = options.EVI;
    // To ensure correct execution in pagePiling
    _.bindAll(this, "changeWorkSlide");
    return this.render();
  },
  render: function() {
    this.$el.html(this.template());
    // Get Tooltip Names
    var arrTooltip = [];
    _.each(this.$(".section .title"), function getHTML (element) {
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
      onLeave: this.changeWorkSlide
    });

    return this;
  },
  // Event Trigger
  changeWorkSlide: function(index, nextIndex, direction){
    this.EVI.trigger("changeWorkSlide", {
      index: index,
      nextIndex: nextIndex,
      direction: direction
    });
  }

});
