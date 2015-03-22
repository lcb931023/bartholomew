// TODO: Break interactive modules into subviews
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = require('jquery');

var DetailView  = require('./detail');

module.exports = DetailView.extend({

  template: require('../template/detailGoggles'),
  
  events: {
    "click .slide": "switchSlide",
  },
  
  lastScrollPos: 0,
  scrollIndex: 0,
  // TODO: SERIOUSLY THESE NEED TO GO INTO ANOTHER SUBVIEW WITH MODEL
  scrollerText: [
    "Learning to model this part was an exploration into the capacity of the surfacing features in SolidWorks. I started with what I knew and oriented my scan with my print. From here I started to build the surfaces.",
    "Through trial and error I learned how to optimize the surfaces. I referenced my physical model to map out and visualize where these functions would start and end.",
    "I cost myself a lot of time and jeapordized the integrity of the final model by not thinking through every detail before going to CAD. This was one of the most valuable lessons I learned from this project and I now understand what it means to really think through a design.",
    "After converting the goggle’s body into a solid, I modeled all of the details to make it realistic. I then assembled the straps, screws, lens, and foam components and headed to KeyShot to render."
  ],
  
  initialize: function(options) {
    // werk
    DetailView.prototype.initialize.apply(this, arguments);
    // HACK: Manual binding of scroller D: pass in this as context
    this.$('.scroller-content').scroll( $.proxy(this.scrollerScrollHandler, this) );
  },
  
  // Click-switch module
  switchSlide: function(e) {
    $(".slide").css('z-index', 0);
    e.currentTarget.style.zIndex = 1;
  },
  // Scroll-change module
  
  scrollerScrollHandler: function(e) {
    var curScrollPos = $(e.currentTarget).scrollTop();
    var imgH = $(e.currentTarget).height();
    // if scrolling down, 
    if ( curScrollPos > this.lastScrollPos ) {
      // Whenever scrolled past 70% of image height + (imgH * scrollIndex), 
      if ( curScrollPos > (imgH * (this.scrollIndex + 0.7)) ) {
        // change text
        this.scrollIndex ++;
        this.$(".scroller-text").html( this.scrollerText[this.scrollIndex] );
      }
    } else {
      // if scrolling up,
      if ( curScrollPos < (imgH * (this.scrollIndex - 0.7)) ) {
        // change text
        this.scrollIndex --;
        this.$(".scroller-text").html( this.scrollerText[this.scrollIndex] );
      }
    }
    
    this.lastScrollPos = curScrollPos;
  }
});
