var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = require('jquery');
var DetailView  = require('./detail');
var DetailViewFactory = require('./DetailViewFactory');

module.exports = Backbone.View.extend({

  detailView: {},

  template: require('../template/work'),
  initialize: function(options) {
    this.EVI = options.EVI;
    /*** Event Publishing ***/
    // To ensure correct execution in pagePiling
    _.bindAll(this, 'changeWorkSlide');

    return this.render();
  },
  render: function() {
    this.$el.html(this.template());
    // Get Tooltip Names
    var arrTooltip = [];
    _.each(this.$('.section .title'), function getHTML (element) {
      arrTooltip.push($(element).html());
    });
    // Start PagePiling
    this.$('#pagepiling').pagepiling({
      verticalCentered:false,
      // TODO: Fix pagepiling's multiple event handling bug
      keyboardScrolling: false,
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
  // in-view events
  events: {
    //'click .button.details': 'gotoDetails' // [OBSOLETE]
  },

  // Event Trigger
  // HACK: This function's parameters are structured this way to
  // get data from pagepiling's onLeave.
  changeWorkSlide: function(index, nextIndex, direction) {
    this.EVI.trigger('changeWorkSlide', {
      nextIndex: nextIndex,
    });
  },

  /**
   * Create detailView and transit to it
   */
  enterDetail: function (pType) {
    console.log("[work]enterDetail");
    if ( !this.detailView.isPresent ) {
      console.log('HAA');
      this.transitOut();
    }
    this.detailView = DetailViewFactory.create({
      type: pType,
      el: '#detail',
      EVI: this.EVI
    });
    this.detailView.transitIn();
  },

  /**
   * if detailView exists, delete and transit back to work
   */
  leaveDetail: function () {
    // if detailView doesn't exist, it'll be undefined
    // if it does exist but is out, it'll be false
    if ( this.detailView.isPresent ) {
      console.log("[work]leaveDetail");
      this.detailView.transitOut();
      this.render();
      // TODO: Get detailView's slider index and go to that one
      this.changeWorkSlide(null, 1, null);
      this.transitIn();
    }
  },

  transitOut: function() {
    console.log('Work Out');
    // also transit out pagepiling's Tooltip
    this.$el.addClass('out');
    if ( this.$('#pagepiling').pagepiling ) {
      $('#pp-nav').addClass('out');
    }
    // remove after out
    function outCallback() {
      console.log("**** work just chopped off his nuts");
      $(this).empty();
    }
    var poop = _.once(outCallback);
    this.$el.one('transitionend', poop);
  },

  transitIn: function () {
    console.log('Walk In');
    this.$el.removeClass('out');
    if ( this.$('#pagepiling').pagepiling ) {
      $('#pp-nav').removeClass('out');
    }
  },

});
