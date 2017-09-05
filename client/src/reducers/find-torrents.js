import {getTpb} from '../util/tpb-api'
import _ from 'lodash'

function tpbItem(resultDto) {
  return {
    title: resultDto.title,
    seeders: resultDto.seeds,
    leechers: resultDto.leechers,
    magnet: resultDto.magnet,
    type: 'tpb'
  }
}

export function search(query) {
  return new Promise((resolve) => {
    const search = [];
    search.push(getTpb(query));

    Promise.all(search).then(responses => {
      let tpbResults = responses[0];

      let results = _.chain(tpbResults).sortBy('seeds').map(tpbItem).value().reverse();

      resolve(results);
    })
  });
}
