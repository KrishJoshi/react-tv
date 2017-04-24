import axios from 'axios';

var config = {
    headers: {
        'trakt-api-key': '90b2bb1a8203e81a0272fb8717fa8b19ec635d8568632e41d1fcf872a2a2d9d0',
        'trakt-api-version': 2
    }
};

export function getImage(tvdbId) {
    return axios
        .get('tvshows/fanart/' + tvdbId)
        .then(item => item.data)
}

export function getTopTvShows() {
    return axios
        .get('/tvshows', config)
        .then(shows => shows.data)
}

export function getSearchShows(text) {
    return axios
        .get('/tvshows/' + text, config)
        .then(shows => shows.data);
}

export function getTvShow(traktId) {
    return axios
        .get('/tvshow/' + traktId, config)
        .then(show => show.data);
}