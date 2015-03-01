/**
 * DetailViewFactory.js
 * Looks up and return different detailView subclasses
 * @param type
 * @return a subclass of detailView
 */

var DetailView = require('./detail');
var DetailViewGoggle = require('./detailGoggle');
var DetailViewVehicle = require('./detailVehicle');
var DetailViewTAW = require('./detailTAW');
var DetailViewHeadphone = require('./detailHeadphone');

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
      case 'vehicle':
        ViewType = DetailViewVehicle;
        break;
      case 'headphone':
        ViewType = DetailViewHeadphone;
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
