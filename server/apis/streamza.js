// include the libraries we need
import request from 'request'
import cheerio from 'cheerio'
import _ from 'lodash'

// set some defaults
const req = request.defaults({
                               jar: true,                 // save cookies to jar
                               rejectUnauthorized: false,
                               followAllRedirects: true   // allow redirections
                             });

const urls = {
  base: 'https://streamza.com/dashboard.php',
  login: 'https://streamza.com/gettingstarted.php?action=signin',
  torrent: 'https://streamza.com/torrents.php',
  addTorrent: 'https://streamza.com/torrent_add.php',
  instant: 'https://streamza.com/search_instant.php',
  deleteTorrent: 'https://streamza.com/torrent_delete.php'
}

const userdata = {
  name: 'tuffleo',
  password: '1q2w3e',
  'login_btn': 'Log+In'
};


function login() {
  return new Promise((resolve) => {
    req.post({
               url: urls.login,
               form: userdata
             }, function(err, resp, body) {
      resolve(body);
    });
  })
}

function getDashboard() {
  return login().then(() => {
    return new Promise((resolve) => {
                         req.get({url: urls.base}, (err, resp, body) => {
                           const $ = cheerio.load(body);
                           resolve($);
                         })
                       }
    )
  })
}

export function getStreamzaTorrents() {
  return getDashboard().then($ => {
    const torrents = $('#torrent_list').find('a span');
    return _.chain(torrents)
            .map(torrent => $(torrent))
            .filter(torrent => {
              return torrent[0].attribs.id
            })
            .map(torrent => {
              const $torrent = $(torrent);
              return {name: $torrent.text(), id: $torrent[0].attribs.id.replace('data1_', '')}
            })
            .value()
  })
}

function JSONize(str) {
  return str
  // wrap keys without quote with valid double quote
    .replace(/([\$\w]+)\s*:/g, function(_, $1) {
      return '"' + $1 + '":'
    })
    // replacing single quote wrapped ones to double quote
    .replace(/'([^']+)'/g, function(_, $1) {
      return '"' + $1 + '"'
    }).replace(new RegExp('""https":/', 'g'), '"https:/')
}

export function getTorrent(torrentId) {
  return login().then(() => {
    return new Promise(
      (resolve) => {
        req.post({url: urls.torrent, form: {'torrent_id': torrentId}}, (err, resp, body) => {
          const $ = cheerio.load(body);

          let script = $('script')[2].children[0].data;
          script = script.substring(0, script.lastIndexOf('aspectratio'))
          script = script.substring(script.lastIndexOf('playlist') + 9, script.length)
          script = script.trim();
          script = script.substring(0, script.length - 1);
          script = JSONize(script);

          let fileList = JSON.parse(script);

          let files = _.map(fileList, function(file) {
            return {title: file.title, source: 'https://streamza.com/' + file.sources[1].file}
          });

          resolve(files);
        })
      }
    )
  });
}

export function instantSearch(query) {
  return login().then(() => {
    return new Promise((resolve) => {
      req.post({url: urls.instant, form: {'search': query, length: 100}}, (err, resp, body) => {
        const $ = cheerio.load(JSON.parse(body).html, {
          ignoreWhitespace: true,
          xmlMode: true
        });
        const files = $('li');

        const list = _.map(files, (file) => {
          const $file = $(file);

          const name = $file.find('p').text();
          const button = $file.find('.btn_cont button');
          const exists = button.text().trim() === 'View File';

          let torrentId = button[0].attribs.id.replace('torrentitem_', '').replace('torrent_', '');
          let url = button[0].attribs.url;

          if (exists === false) {
            addTorrent(url);
          }

          return {id: torrentId, title: name}
        });

        resolve(list);
      })
    })
  })
}

export function addTorrent(torrentUrl) {
  return login().then(() => {
    return new Promise((resolve) => {
      req.post({url: urls.addTorrent, form: {'value': torrentUrl}}, (err, resp, body) => {
        resolve(body);
      })
    })
  })
}

export function removeAll() {
  return getStreamzaTorrents().then(torrents => {
    _.each(torrents, (torrent) => req.post({
                                             url: urls.deleteTorrent,
                                             form: {'value': torrent.id}
                                           }, console.log(torrent.id, 'deleted'))
    );
  })
}
