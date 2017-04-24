import axios from 'axios';


export function getTpb(query) {
  return axios
    .get('/api//tpb/' + query)
    .then(shows => shows.data)
}
