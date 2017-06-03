import tortuga from 'tortuga';

export function getTorrents(title) {
  return new Promise((resolve, rej) => {
    tortuga.search(title, function(results) {
      console.log('got results', results.length);
      resolve(results);
    })
  });
}


//const {Website} = require('extratorrent-api');
//const extraTorrentAPI = new Website();
//
//export function getTorrents(title) {
//  return extraTorrentAPI.search(title).then(res => {
//    return res.results
//  });
//}
