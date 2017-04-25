import express from "express";
import {getTvShow, getTopTvShows, getSearchShows} from '../apis/trakt';
import {getTorrents} from '../apis/tpb'

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

module.exports = router
