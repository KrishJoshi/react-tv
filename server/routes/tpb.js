import {getTorrents} from '../apis/tpb'

module.exports = function(app, config) {

  app.get('/api/tpb/:text', function(req, res, next) {
    getTorrents(req.params.text).then(torrents => res.send(torrents))
  });

}
