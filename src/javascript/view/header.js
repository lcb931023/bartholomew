var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = Backbone.View.extend({
  template: require('../template/header'),
  initialize: function(options) {
    this.EVI = options.EVI;
    /*** Event Subscribing & Handling ***/
    // Make sure event handlers execute in the right context
    _.bindAll(this, 'changeWorkSlideHandler');
    // When you need to subscribe to some events
    this.EVI.bind('changeWorkSlide', this.changeWorkSlideHandler);

    return this.render();
  },
  render: function() {
    this.$el.html(this.template());
    return this;
  },

  // Event handler
  changeWorkSlideHandler: function(pData) {
    var lastSliderClass = this.getSliderClass();
    var nextSliderClass = 's' + pData.nextIndex;
    // remove all classes with 's'
    this.$el.removeClass(lastSliderClass).addClass(nextSliderClass);
  },

  // helper
  // get class with prefix 's'
  getSliderClass: function (){
    //console.log(this);
    var classes = this.$el.attr('class').split(' ');
    for (var i = 0; i < classes.length; i++) {
      var matches = /^s(.+)/.exec(classes[i]);
      //console.log(matches);
      if (matches != null) {
        return matches[0];
        break;
      }
    }
  }
});
