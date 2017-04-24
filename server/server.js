import bodyParser from 'body-parser'
import express from 'express'
import axios from 'axios';
import tortuga from 'tortuga';
const app = express()
// add the path module
import path from 'path'
// get reference to the client build directory
const staticFiles = express.static(path.join(__dirname, '../../client/build'))
// pass the static files (react app) to the express app.
app.use(staticFiles)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
const router = express.Router()

router.get('/tvshow/:traktId', function (req, res, next) {
  getTvShow(req.params.traktId).then(shows => res.send(shows))
});

router.get('/tvshows/', function (req, res, next) {
  getTopTvShows().then(showPromises => Promise.all(showPromises).then(shows => res.send(shows)))
});

router.get('/tvshows/:text', function (req, res, next) {
  getSearchShows(req.params.text).then(showPromises => Promise.all(showPromises).then(shows => res.send(shows)))
});

router.get('/torrent/:text', function (req, res, next) {
  console.log(req);
  getTorrents(req.params.text).then(torrents => res.send(torrents))
});

var config = {
  headers: {
    'trakt-api-key': '90b2bb1a8203e81a0272fb8717fa8b19ec635d8568632e41d1fcf872a2a2d9d0',
    'trakt-api-version': 2
  }
};

function getTorrents(title) {
  let search = new Promise(function (resolve, rej) {
    tortuga
      .search(title, function (results) {
        resolve(results);
      })
  })
  return search;
}

function getImage(tvdbId) {
  return axios
    .get('http://webservice.fanart.tv/v3/tv/' + tvdbId + '?api_key=bea26258e1e07e9032e99742bc051f3f')
    .then(item => item.data)
}

function getShows(result) {
  return result.map(function (item) {
    var show = item.show
      ? item.show
      : item;
    return getImage(show.ids.tvdb).then(function (fanart) {
      show.fanart = fanart;
      return show;
    }).catch(error => show);
  });
}

function getTopTvShows() {
  return axios
    .get('http://api.trakt.tv/shows/popular', config)
    .then(shows => getShows(shows.data))
}

function getSearchShows(text) {
  return axios
    .get('http://api.trakt.tv/search/show?extended=full&limit=50&query=' + text, config)
    .then(showItems => getShows(showItems.data))
}

function getSeasons(traktId) {
  return axios
    .get('https://api.trakt.tv/shows/' + traktId + '/seasons?extended=episodes', config)
    .then(seasons => seasons.data)
}

function getTvShow(text) {
  return axios
    .get('http://api.trakt.tv/search/trakt/' + text + '?id_type=show&extended=full', config)
    .then(function (showsDto) {
      var show = showsDto.data[0].show;

      var promises = []
      var imagePromise = getImage(show.ids.tvdb).catch(error => show);
      var seasonPromise = getSeasons(show.ids.trakt)
      promises.push(imagePromise);
      promises.push(seasonPromise);

      return Promise
        .all(promises)
        .then(function (results) {
          show.fanart = results[0];
          show.seasons = results[1];
          console.log(show.seasons)
          return show;
        });
    })
}

app.use(router)
app.set('port', (process.env.PORT || 3001))

app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})