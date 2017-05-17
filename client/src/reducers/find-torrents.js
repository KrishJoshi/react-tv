import {getTpb} from '../util/tpb-api'
import {instantSearch} from '../util/streamza-api'
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

function instantItem(resultDto) {
  return {
    title: resultDto.title,
    id: resultDto.id,
    type: 'instant'
  }
}

export function search(query) {
  return new Promise((resolve) => {
    const search = [];
    search.push(getTpb(query));
    search.push(instantSearch(query));

    Promise.all(search).then(responses => {
      let tpbResults = responses[0];
      let streamzaResults = responses[1];

      let results = _.map(streamzaResults, instantItem);
      results = results.concat(_.chain(tpbResults).sortBy('seeds').map(tpbItem).value().reverse());

      resolve(results);
    })
  });
}
