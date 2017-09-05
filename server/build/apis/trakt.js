'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.getTopTvShows = getTopTvShows;
exports.getSearchShows = getSearchShows;
exports.getSeasons = getSeasons;
exports.getTvShow = getTvShow;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _fanart = require('./fanart');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  headers: {
    'trakt-api-key': '90b2bb1a8203e81a0272fb8717fa8b19ec635d8568632e41d1fcf872a2a2d9d0',
    'trakt-api-version': 2
  }
};

function getTopTvShows() {
  return _axios2.default.get('http://api.trakt.tv/shows/popular', config).then(function (shows) {
    return getShows(shows.data);
  });
}

function getSearchShows(text) {
  return _axios2.default.get('http://api.trakt.tv/search/show?extended=full&limit=50&query=' + text, config).then(function (showItems) {
    return getShows(showItems.data);
  });
}

function getSeasons(traktId) {
  return _axios2.default.get('https://api.trakt.tv/shows/' + traktId + '/seasons?extended=episodes', config).then(function (seasons) {
    return seasons.data;
  });
}

function getTvShow(text) {
  return _axios2.default.get('http://api.trakt.tv/search/trakt/' + text + '?id_type=show&extended=full', config).then(function (showsDto) {
    var show = showsDto.data[0].show;

    var promises = [];
    var imagePromise = (0, _fanart.getImage)(show.ids.tvdb).catch(function (error) {
      return show;
    });
    var seasonPromise = getSeasons(show.ids.trakt).catch(function (error) {
      return show;
    });
    promises.push(imagePromise);
    promises.push(seasonPromise);

    return _promise2.default.all(promises).then(function (results) {
      show.fanart = results[0];
      show.seasons = results[1];
      return show;
    });
  });
}

function getShows(result) {
  return result.map(function (item) {
    var show = item.show ? item.show : item;

    return (0, _fanart.getImage)(show.ids.tvdb).then(function (fanart) {
      show.fanart = fanart;
      return show;
    }).catch(function (error) {
      return show;
    });
  });
}