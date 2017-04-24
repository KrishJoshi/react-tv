import React, {Component} from 'react';
import { connect } from 'react-redux';

import {TextField} from 'material-ui';
import TvShowCard from './tv-show-card';

import {getTopTvShows, getSearchShows} from '../util/trakt-api'
import { search } from '../actions'
import './App.css';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: '80%'
  }
};

function debounce(fn, delay) {
  let timer = null;
  return function () {
    const context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      shows: []
    };
    this.handleSearch = debounce(this.handleSearch, 250);
  }

  handleSearch = (event, value) => {
    console.log('action creator', search)
    this.props.history.push(`/search/${value}`)
    search(value)
    getSearchShows(value).then(shows => this.setState({shows: shows}))
  };

  componentDidMount() {
    if (this.props.match.path === '/search/:name' && this.props.match.params.name) {
      this.handleSearch({}, this.props.match.params.name)
    } else {
      getTopTvShows().then(data => this.setState({shows: data}))
    }
  }

  render() {
    return (
      <div className='app' style={styles.root}>
        <TextField hintText="Type a show's name" onChange={this.handleSearch}/>
        <div style={styles.gridList}>
          {this
            .state
            .shows
            .map(show => {
              return <TvShowCard key={Math.random()} show={show}/>
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { term: state.term }
}

export default connect(mapStateToProps, dispatch => {
  return { search: () => dispatch(search) }
})(App);
