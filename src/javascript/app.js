console.log('app.js loaded!');

var $ = require('jquery');
var _ = require('underscore');
var PagePiling  = require('pagepiling');
var HeaderView  = require('./view/header');
var WorkView    = require('./view/work');

var headerView  = new HeaderView({ el: '#header' });
var workView    = new WorkView({ el: '#work' });
