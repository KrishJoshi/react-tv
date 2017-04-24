import axios from 'axios'
import {getImage} from './fanart'

const config = {
  headers: {
    'trakt-api-key': '90b2bb1a8203e81a0272fb8717fa8b19ec635d8568632e41d1fcf872a2a2d9d0',
    'trakt-api-version': 2
  }
};

export function getTopTvShows() {
  return axios
    .get('http://api.trakt.tv/shows/popular', config)
    .then(shows => getShows(shows.data))
}


export function getSearchShows(text) {
  return axios
    .get('http://api.trakt.tv/search/show?extended=full&limit=50&query=' + text, config)
    .then(showItems => getShows(showItems.data))
}

export function getSeasons(traktId) {
  return axios
    .get('https://api.trakt.tv/shows/' + traktId + '/seasons?extended=episodes', config)
    .then(seasons => seasons.data)
}

export function getTvShow(text) {
  return axios
    .get('http://api.trakt.tv/search/trakt/' + text + '?id_type=show&extended=full', config)
    .then(function (showsDto) {
      const show = showsDto.data[0].show;

      let promises = [];
      const imagePromise = getImage(show.ids.tvdb).catch(error => show);
      const seasonPromise = getSeasons(show.ids.trakt);
      promises.push(imagePromise);
      promises.push(seasonPromise);

      return Promise
        .all(promises)
        .then(function (results) {
          show.fanart = results[0];
          show.seasons = results[1];
          return show;
        });
    })
}



function getShows(result) {
  return result.map(function(item) {
    const show = item.show
      ? item.show
      : item;

    return getImage(show.ids.tvdb).then(function(fanart) {
      show.fanart = fanart;
      return show;
    }).catch(error => show);
  });
}
