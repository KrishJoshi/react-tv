//import tortuga from 'tortuga';
//
//
//export function getTorrents(title) {
//  let search = new Promise(function(resolve, rej) {
//    tortuga
//      .search(title, function(results) {
//        resolve(results);
//      })
//  })
//  return search;
//}


const {Website} = require('extratorrent-api');
const extraTorrentAPI = new Website();

export function getTorrents(title) {
  return extraTorrentAPI.search(title).then(res => {
    return res.results
  });
}
