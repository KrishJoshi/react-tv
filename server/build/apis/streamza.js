'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.getStreamzaTorrents = getStreamzaTorrents;
exports.getTorrent = getTorrent;
exports.instantSearch = instantSearch;
exports.addTorrent = addTorrent;
exports.removeAll = removeAll;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// set some defaults
var req = _request2.default.defaults({
  jar: true, // save cookies to jar
  rejectUnauthorized: false,
  followAllRedirects: true // allow redirections
}); // include the libraries we need


var urls = {
  base: 'https://streamza.com/dashboard.php',
  login: 'https://streamza.com/gettingstarted.php?action=signin',
  torrent: 'https://streamza.com/torrents.php',
  addTorrent: 'https://streamza.com/torrent_add.php',
  instant: 'https://streamza.com/search_instant.php',
  deleteTorrent: 'https://streamza.com/torrent_delete.php'
};

var userdata = {
  name: 'tuffleo',
  password: '1q2w3e',
  'login_btn': 'Log+In'
};

function login() {
  return new _promise2.default(function (resolve) {
    req.post({
      url: urls.login,
      form: userdata
    }, function (err, resp, body) {
      resolve(body);
    });
  });
}

function getDashboard() {
  return login().then(function () {
    return new _promise2.default(function (resolve) {
      req.get({ url: urls.base }, function (err, resp, body) {
        var $ = _cheerio2.default.load(body);
        resolve($);
      });
    });
  });
}

function getStreamzaTorrents() {
  return getDashboard().then(function ($) {
    var torrents = $('#torrent_list').find('a span');
    return _lodash2.default.chain(torrents).map(function (torrent) {
      return $(torrent);
    }).filter(function (torrent) {
      return torrent[0].attribs.id;
    }).map(function (torrent) {
      var $torrent = $(torrent);
      return { name: $torrent.text(), id: $torrent[0].attribs.id.replace('data1_', '') };
    }).value();
  });
}

function JSONize(str) {
  return str
  // wrap keys without quote with valid double quote
  .replace(/([\$\w]+)\s*:/g, function (_, $1) {
    return '"' + $1 + '":';
  })
  // replacing single quote wrapped ones to double quote
  .replace(/'([^']+)'/g, function (_, $1) {
    return '"' + $1 + '"';
  }).replace(new RegExp('""https":/', 'g'), '"https:/');
}

function getTorrent(torrentId) {
  return login().then(function () {
    return new _promise2.default(function (resolve) {
      req.post({ url: urls.torrent, form: { 'torrent_id': torrentId } }, function (err, resp, body) {
        var $ = _cheerio2.default.load(body);

        var script = $('script')[2].children[0].data;
        script = script.substring(0, script.lastIndexOf('aspectratio'));
        script = script.substring(script.lastIndexOf('playlist') + 9, script.length);
        script = script.trim();
        script = script.substring(0, script.length - 1);
        script = JSONize(script);

        var fileList = JSON.parse(script);

        var files = _lodash2.default.map(fileList, function (file) {
          return { title: file.title, source: 'https://streamza.com/' + file.sources[1].file };
        });

        resolve(files);
      });
    });
  });
}

function instantSearch(query) {
  return login().then(function () {
    return new _promise2.default(function (resolve) {
      req.post({ url: urls.instant, form: { 'search': query, length: 100 } }, function (err, resp, body) {
        var $ = _cheerio2.default.load(JSON.parse(body).html, {
          ignoreWhitespace: true,
          xmlMode: true
        });
        var files = $('li');

        var list = _lodash2.default.map(files, function (file) {
          var $file = $(file);

          var name = $file.find('p').text();
          var button = $file.find('.btn_cont button');
          var exists = button.text().trim() === 'View File';

          var torrentId = button[0].attribs.id.replace('torrentitem_', '').replace('torrent_', '');
          var url = button[0].attribs.url;

          if (exists === false) {
            addTorrent(url);
          }

          return { id: torrentId, title: name };
        });

        resolve(list);
      });
    });
  });
}

function addTorrent(torrentUrl) {
  return login().then(function () {
    return new _promise2.default(function (resolve) {
      req.post({ url: urls.addTorrent, form: { 'value': torrentUrl } }, function (err, resp, body) {
        resolve(body);
      });
    });
  });
}

function removeAll() {
  return getStreamzaTorrents().then(function (torrents) {
    _lodash2.default.each(torrents, function (torrent) {
      return req.post({
        url: urls.deleteTorrent,
        form: { 'value': torrent.id }
      }, console.log(torrent.id, 'deleted'));
    });
  });
}