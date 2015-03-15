/**
 * Artchitecture
 * App keeps hold of navigation and work
 * all detail pages are created on-the-spot and destroyed afterwards
 */

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var PagePiling  = require('pagepiling');
var Handlebars  = require('hbsfy/runtime');

Handlebars.registerPartial('footer', require("./template/partial/footer.hbs"));
var HeaderView  = require('./view/header');
var WorkView    = require('./view/work');
var AboutView   = require('./view/about');

// Instantiate event aggregator
var EVI = _.extend({}, Backbone.Events);
// Instantiate & Render Views
var headerView = new HeaderView({
  el: '#header',
  EVI: EVI
});
var workView = new WorkView({
  el: '#work',
  EVI: EVI
});
var aboutView = new AboutView({
  el: '#about',
  EVI: EVI
});

var CustomRouter = Backbone.Router.extend({
  
  routes: {
    '': 'home',
    'work': 'home',
    'about': 'about',
    'work/:type': 'gotoDetail',
    '*else': 'goto404'
  },
  
  // Router keeps track of prev pages
  // http://stackoverflow.com/a/18736567/2241194
  history: [],
  initialize: function() {
    this.listenTo(this, 'route', function (name, args) {
      this.history.push({
        name: name,
        args: args,
        fragment: Backbone.history.fragment
      });
      console.log(this.history);
    });
  },

  /**
   * Root URL route handler
   */
  home: function () {
    if (this.history.length > 0) {
      if ( this.history[ this.history.length - 1 ].fragment === "about")
      {
        // exit about to last page
        aboutView.transitOut();
        // update url to last page
        if (this.history.length > 1) {
          console.log(this.history[ this.history.length - 2 ].fragment);
          this.navigate( this.history[ this.history.length - 2 ].fragment );
        }
      } else {
        workView.leaveDetail();
      }
    }
  },

  /**
   * Brings down about page
   */
  about: function () {
    aboutView.transitIn();
  },
    
  /**
   * Load and transit to detail pages
   */
  gotoDetail: function (type) {
    console.log('gotoDetail ' + type);
    aboutView.transitOut();
    workView.enterDetail(type);
  },

});

var router = new CustomRouter();

// Start Routing
Backbone.history.start();
