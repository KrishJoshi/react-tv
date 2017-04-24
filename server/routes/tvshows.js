import {getTvShow, getTopTvShows, getSearchShows} from '../apis/trakt';

module.exports = function(app, config) {

  /* GET home page. */
  app.get('/api/tvshow/:traktId', function(req, res, next) {
    getTvShow(req.params.traktId).then(shows => res.send(shows))
  });

  app.get('/api/tvshows/', function(req, res, next) {
    getTopTvShows().then(showPromises => Promise.all(showPromises).then(shows => res.send(shows)))
  });

  app.get('/api/tvshows/:text', function(req, res, next) {
    getSearchShows(req.params.text).then(showPromises => Promise.all(showPromises).then(shows => res.send(shows)))
  });

}
