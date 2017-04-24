import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {ListItem, List, Subheader, RaisedButton} from 'material-ui';

import {getTvShow} from '../util/trakt-api'
import {ActionFindInPage} from "material-ui/svg-icons/index";

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
    const show = this.state.show;

    function seasonSearchTitle(season) {
      const seasonNum = season.number > 9 ? season.number : '0' + season.number;
      return '/tpb/' + show.title + ' ' + 'S' + seasonNum;
    }

    function episodeSearchTitle(season, episode) {
      const seasonNum = season.number > 9 ? season.number : '0' + season.number;
      const episodeNum = episode.number > 9 ? episode.number : '0' + episode.number;
      return '/tpb/' + show.title + ' ' + 'S' + seasonNum + 'E' + episodeNum;
    }

    function episodesList(season) {
      return (
        season.episodes.map(episode => {
          return <ListItem
            key={episode.number}
            primaryText={
              <RaisedButton
                label={<Link to={episodeSearchTitle(season, episode)}> {episode.title} </Link>}
                labelPosition="before"
                icon={<ActionFindInPage />}
              />
              }
          />
        })
      )
    }

    function seasonShowList(show) {
      return (
        <List>
          <Subheader>{show.title}</Subheader>

          {
            show.seasons.map(season =>
              <ListItem
                key={season.number}
                primaryText={
                  <RaisedButton
                  label={<Link to={seasonSearchTitle(season)}>Season {season.number} </Link>}
                  labelPosition="before"
                  icon={<ActionFindInPage />}
                />
                }
                initiallyOpen={true}
                primaryTogglesNestedList={true}
                nestedItems={episodesList(season)}
              />
            )
          }
        </List>
      )
    }

    if (show.seasons) {
      return (
        <div className='app'>
          {
            seasonShowList(show)
          }
        </div>
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
