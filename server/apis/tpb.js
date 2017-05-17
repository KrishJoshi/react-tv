import tortuga from 'tortuga';


tortuga.config.baseUrl = 'https://unblocktpb.com/';


export function getTorrents(title) {
  let search = new Promise(function(resolve, rej) {
    tortuga
      .search(title, function(results) {
        resolve(results);
      })
  })
  return search;
}
