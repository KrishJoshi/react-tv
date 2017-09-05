'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImage = getImage;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getImage(tvdbId) {
  return _axios2.default.get('http://webservice.fanart.tv/v3/tv/' + tvdbId + '?api_key=bea26258e1e07e9032e99742bc051f3f').then(function (item) {
    return item.data;
  });
}