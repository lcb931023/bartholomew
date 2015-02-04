console.log('app.js loaded!');

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var PagePiling  = require('pagepiling');

var HeaderView  = require('./view/header');
var WorkView    = require('./view/work');

// Instantiate event aggregator
var EVI = _.extend({}, Backbone.Events);

var headerView  = new HeaderView({ el: '#header', EVI: EVI });
var workView    = new WorkView({ el: '#work', EVI: EVI });
