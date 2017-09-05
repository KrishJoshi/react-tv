import React, {Component} from 'react';
import {Layout, Input} from 'antd';
import {debounce} from 'throttle-debounce';
import {search} from '../../reducers/find-torrents'
import Body from '../Body/Body';
import TorrentTable from '../TorrentTable/TorrentTable';

const {Header} = Layout;
const Search = Input.Search;

class Tpb extends Component {
  constructor() {
    super();
    this.state = {
      results: []
    };
    this.handleSearch = debounce(500, this.handleSearch);
  }

  componentDidMount() {
    const query = this.props.match.params.query;
    this.setState({value: query});
    search(query).then(results => this.setState({results: results}))
  }

  handleChange = (event) => {
    event.persist();

    const value = event.target.value;
    this.props.history.push(`/torrent/${value}`)

    this.setState({value: value});
    this.handleSearch(value)
  };

  handleSearch = (value) => {
    this.setState({results: false});

    search(value).then(results => this.setState({results: results}))
  };

  search() {
    return <Header mode="inline">
      <Search placeholder="Type a show's name" value={this.state.value}
              onChange={this.handleChange.bind(this)}/> </Header>
  }

  render() {
    return (
      <Body isLoaded={true} search={this.search()}>
      <TorrentTable results={this.state.results}/>
      </Body>
    )
  }
}

export default(Tpb);
