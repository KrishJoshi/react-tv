import axios from 'axios';


export function getTopTvShows() {
  return axios
    .get('/api//tvshows')
    .then(shows => shows.data)
}

export function getSearchShows(text) {
  return axios
    .get('/api//tvshows/' + text)
    .then(shows => shows.data);
}

export function getTvShow(traktId) {
  return axios
    .get('/api//tvshow/' + traktId)
    .then(show => show.data);
}
