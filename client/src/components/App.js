import React, {Component} from 'react';
import {connect} from 'react-redux';
import {debounce} from 'throttle-debounce';

import {Layout, Input, Row, Col} from 'antd';
const {Header, Content} = Layout;
const Search = Input.Search;

import TvShowCard from './TvShowCard';

import {getTopTvShows, getSearchShows} from '../util/trakt-api'
import {search} from '../actions'


class App extends Component {
  constructor() {
    super();
    this.state = {
      shows: []
    };
  }

  handleClickEvent = (event) => {
    event.persist();
    const value = event.target.value;
    debounce(300, this.handleSearch(value))();
  };

  handleSearch = (value) => {
    this.props.history.push(`/search/${value}`)
    search(value)
    this.setState({value: value});
    getSearchShows(value).then(shows => this.setState({shows: shows}))
  };

  componentDidMount() {
    if (this.props.match.path === '/search/:name?' && this.props.match.params.name) {
      this.handleSearch(this.props.match.params.name)
    } else {
      getTopTvShows().then(data => this.setState({shows: data}))
    }
  }

  createTvShowCardCol(show) {
    return <Col key={Math.random()} span={8} style={{padding: 10}}> <TvShowCard key={Math.random()}
                                                                                show={show}/></Col>
  }

  render() {
    return (
      <Layout style={{height: '100vh'}}>
        <Layout>
          <Header mode="inline">
            <Search placeholder="Type a show's name" value={this.state.value} onChange={this.handleClickEvent}/>
          </Header>
          <Content>
            <Row>
              {this
                .state
                .shows
                .map(show => {
                  return this.createTvShowCardCol(show)
                })}
            </Row>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {term: state.term}
}

export default connect(mapStateToProps, dispatch => {
  return {search: () => dispatch(search)}
})(App);
