/**
 * Artchitecture
 * App keeps hold of navigation and work
 * all detail pages are created on-the-spot and destroyed afterwards
 */

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var PagePiling  = require('pagepiling');

var HeaderView  = require('./view/header');
var WorkView    = require('./view/work');

// Instantiate event aggregator
var EVI = _.extend({}, Backbone.Events);

var headerView = new HeaderView({
  el: '#header',
  EVI: EVI
});
var workView = new WorkView({
  el: '#work',
  EVI: EVI
});

var CustomRouter = Backbone.Router.extend({

  routes: {
    '': 'home',
    'work/:type': 'gotoDetail',
    '*else': 'goto404'
  },

  /**
   * Root URL route handler
   */
  home: function () {
    // TODO: Goes back to work view
    workView.leaveDetail();
  },

  /**
   * Load and transit to detail pages
   */
  gotoDetail: function (type) {
    console.log('gotoDetail ' + type);
    workView.enterDetail(type);
  },

});

var router = new CustomRouter();

// Start Routing
Backbone.history.start();
