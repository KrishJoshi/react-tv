import React, {Component} from 'react';
import {search} from '../../reducers/find-torrents'
import {getTvShow} from '../../util/trakt-api'
import TorrentTable from '../TorrentTable/TorrentTable';
import Body from '../Body/Body';
import TvShowMenu from './TvShowMenu/TvShowMenu';

class TvShow extends Component {
  constructor() {
    super();
    this.state = {
      show: {},
      open: false,
      results: []
    };
  }

  componentDidMount() {
    getTvShow(this.props.match.params.traktId).then(show => this.setState({show: show}))
  }

  getTorrent(query) {
    this.setState({results: null});
    search(query).then(results => this.setState({results: results}))
  }

  render() {
    const show = this.state.show;
    const menu = (<TvShowMenu getTorrent={this.getTorrent.bind(this)} show={show}/>);
    return (
      <Body isLoaded={show.seasons} title={show.title} menu={menu}>
      <TorrentTable results={this.state.results}/>
      </Body>
    )
  }
}

export default(TvShow);
