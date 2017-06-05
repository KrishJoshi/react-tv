import axios from 'axios';


export function getIndex() {
  return axios
    .get('/api//streamza/')
    .then(shows => shows.data);
}


export function instantSearch(text) {
  return axios
    .get('/api/streamza/' + text)
    .then(shows => shows.data);
}

export function getFile(id) {
  return axios
    .get('/api/streamza/torrent/' + id)
    .then(file => file.data);
}

export function addTorrent(magnet) {
  return axios
    .get('/api/streamza/add/' + magnet)
    .then(matadata => matadata.data);
}
