import express from "express";
import {getTvShow, getTopTvShows, getSearchShows} from '../apis/trakt';
import {getTorrents} from '../apis/tpb'
import {instantSearch, getStreamzaTorrents, getTorrent} from '../apis/streamza'

const router = express.Router();

/* TPB Shows */
router.get('/tpb/:text', function(req, res, next) {
  getTorrents(req.params.text).then(torrents => res.send(torrents))
});


/* TV Shows */
router.get('/tvshow/:traktId', function(req, res, next) {
  getTvShow(req.params.traktId).then(shows => res.send(shows))
});

router.get('/tvshows/', function(req, res, next) {
  getTopTvShows().then(showPromises => Promise.all(showPromises).then(shows => res.send(shows)))
});

router.get('/tvshows/:text', function(req, res, next) {
  getSearchShows(req.params.text).then(showPromises => Promise.all(showPromises).then(shows => res.send(shows)))
})


router.get('/login/', function(req, res, next) {
  login(req.params.text).then(data => {
    res.send(data.data)
  });
})

router.get('/streamza/', function(req, res, next) {
  getStreamzaTorrents().then(data => {
    res.send(data)
  });
})

router.get('/streamza/torrent/:torrentId', function(req, res, next) {
  getTorrent(req.params.torrentId).then(data => {
    res.send(data)
  });
})

router.get('/streamza/torrent/add/:magnet', function(req, res, next) {
  addTorrent(req.params.magnet).then(data => {
    res.send(data.torrent_id)
  });
})

router.get('/streamza/:query', function(req, res, next) {
  instantSearch(req.params.query).then(data => {
    res.send(data)
  });
})




module.exports = router
