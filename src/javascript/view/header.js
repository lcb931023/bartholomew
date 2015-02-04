var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = Backbone.View.extend({
  template: require('../template/header'),
  initialize: function(options) {

    /*** Event Subscribing & Handling ***/
    // Make sure event handlers execute in the right context
    _.bindAll(this, "changeWorkSlideHandler");
    // When you need to subscribe to some events
    options.EVI.bind("changeWorkSlide", this.changeWorkSlideHandler);

    return this.render();
  },
  render: function() {
    this.$el.html(this.template());
    return this;
  },

  // Event handler
  changeWorkSlideHandler: function(pData){
    var indexClass = "s"+pData.index;
    var nextIndexClass = "s"+pData.nextIndex;
    this.$el.removeClass( indexClass ).addClass( nextIndexClass );
  }
});
