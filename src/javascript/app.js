console.log('app.js loaded!');

var $ = require('jquery');
var _ = require('underscore');
var ViewHeader = require('./view/header');
var viewHeader = new ViewHeader({ el: '#header' });
$("#work").pagepiling({
  verticalCentered:false,
  navigation: {
    'textColor': '#000',
    'bulletsColor': '#000',
    'position': 'right',
  },
});
