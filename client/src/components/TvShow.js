import React, {Component} from 'react';

import {ListItem,List, Subheader} from 'material-ui';

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
    const show = this.state.show;

    function episodesList(season) {
      return (
        season.episodes.map(episode => {
          return <ListItem
            key={episode.number}
            primaryText={episode.title}
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
                  primaryText={'Season '+ season.number}
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
        <ul className='app'>
          {
            seasonShowList(show)
          }
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
