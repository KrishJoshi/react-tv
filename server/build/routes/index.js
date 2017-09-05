'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _trakt = require('../apis/trakt');

var _tpb = require('../apis/tpb');

var _streamza = require('../apis/streamza');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* TPB Shows */
router.get('/tpb/:text', function (req, res, next) {
  (0, _tpb.getTorrents)(req.params.text).then(function (torrents) {
    return res.send(torrents);
  });
});

/* TV Shows */
router.get('/tvshow/:traktId', function (req, res, next) {
  (0, _trakt.getTvShow)(req.params.traktId).then(function (shows) {
    return res.send(shows);
  });
});

router.get('/tvshows/', function (req, res, next) {
  (0, _trakt.getTopTvShows)().then(function (showPromises) {
    return _promise2.default.all(showPromises).then(function (shows) {
      return res.send(shows);
    });
  });
});

router.get('/tvshows/:text', function (req, res, next) {
  (0, _trakt.getSearchShows)(req.params.text).then(function (showPromises) {
    return _promise2.default.all(showPromises).then(function (shows) {
      return res.send(shows);
    });
  });
});

router.get('/login/', function (req, res, next) {
  login(req.params.text).then(function (data) {
    res.send(data.data);
  });
});

router.get('/streamza/', function (req, res, next) {
  (0, _streamza.getStreamzaTorrents)().then(function (data) {
    res.send(data);
  });
});

router.get('/streamza/clear', function (req, res, next) {
  (0, _streamza.removeAll)().then(res.send(true));
});

router.get('/streamza/torrent/:torrentId', function (req, res, next) {
  (0, _streamza.getTorrent)(req.params.torrentId).then(function (data) {
    res.send(data);
  });
});

router.get('/streamza/torrent/add/:magnet', function (req, res, next) {
  addTorrent(req.params.magnet).then(function (data) {
    res.send(data.torrent_id);
  });
});

router.get('/streamza/:query', function (req, res, next) {
  (0, _streamza.instantSearch)(req.params.query).then(function (data) {
    res.send(data);
  });
});

module.exports = router;