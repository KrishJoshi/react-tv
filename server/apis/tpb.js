import tortuga from 'tortuga';

export function getTorrents(title) {
  let search = new Promise(function (resolve, rej) {
    tortuga
      .search(title, function (results) {
        resolve(results);
      })
  })
  return search;
}
