/**
 * DetailViewFactory.js
 * Looks up and return different detailView subclasses
 * @param type
 * @return a subclass of detailView
 */

var DetailView = require('./detail');
var DetailViewGoggle = require('./detailGoggle');
var DetailViewTAW = require('./detailTAW');
// Less detailed views
var DetailViewOhana = require('./detailOhana');
var DetailViewOnestep = require('./detailOnestep');
var DetailViewStapler = require('./detailStapler');

module.exports = {
  create: function (options) {
    var ViewType = null;
    switch (options.type) {
      case 'goggle':
        ViewType = DetailViewGoggle;
        break;
      case 'taw':
        ViewType = DetailViewTAW;
        break;
      case 'ohana':
        ViewType = DetailViewOhana;
        break;
      case 'onestep':
        ViewType = DetailViewOnestep;
        break;
      case 'stapler':
        ViewType = DetailViewStapler;
        break;
      default:
        ViewType = DetailView;
    }

    var detailView = new ViewType({
      el: '#detail',
      EVI: options.EVI
    });
    return detailView;
  },
};
