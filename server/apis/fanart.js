import axios from 'axios';

export function getImage(tvdbId) {
  return axios
    .get('http://webservice.fanart.tv/v3/tv/' + tvdbId + '?api_key=bea26258e1e07e9032e99742bc051f3f')
    .then(item => item.data)
}
