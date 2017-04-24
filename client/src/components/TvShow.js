import React, {Component} from 'react';
import {connect} from 'react-redux';

import {FlatButton} from 'material-ui';

import {getTvShow} from '../util/trakt-api'

class TvShow extends Component {
  constructor() {
    super();
    this.state = {
      show: []
    };
  }

  componentDidMount() {
    getTvShow(this.props.match.params.traktId).then(show => this.setState({show: show}))
  }

  render() {
    var show = this.state.show;

    function showSeasons(season) {
      return <li>
        <FlatButton label={"Season " + season.number} primary={true}/>
      </li>
    }

    function showEpisodes(season) {
      return <ul>
        {season
          .episodes
          .map(episode => {
            return <li>
              <FlatButton label={episode.title} primary ={true}/>
            </li>
          })}
      </ul>
    }

    if (show.seasons) {
      return (
        <ul className='app'>
          {show
            .seasons
            .map(season => {
              return ([showSeasons(season), showEpisodes(season)])
            })}
        </ul>
      )
    } else {
      return (
        <div>
          {JSON.stringify(this.state)}
        </div>
      )
    }
  }
}

export default(TvShow);