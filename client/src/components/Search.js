import React, {Component} from 'react';
import {Layout, Button, Table, Icon, Input, Menu} from 'antd';
import {debounce} from 'throttle-debounce';
const {Header, Content} = Layout;
const Search = Input.Search;
import {Link} from 'react-router-dom';

import {search} from '../reducers/find-torrents'


class Tpb extends Component {
  constructor() {
    super();
    this.state = {
      results: []
    };
  }

  componentDidMount() {
    const query = this.props.match.params.query;
    this.setState({value: query});
    search(query).then(results => this.setState({results: results}))
  }

  handleChange = (event) => {
    event.persist();
    const value = event.target.value;

    this.setState({value: value});
    debounce(300, this.handleSearch(value))();
  };

  handleSearch = (value) => {
    search(value).then(results => this.setState({results: results}))
  };

  getTorrentTable() {
    const columns = [{
      title: 'Name',
      dataIndex: 'title',
      key: 'title'
    }, {
      title: 'Seeders',
      dataIndex: 'seeders',
      key: 'seeders'
    }, {
      title: 'Seechers',
      dataIndex: 'leechers',
      key: 'leechers'
    }, {
      title: 'Actions',
      key: 'action',
      render: (text, record) => {
        if (record.type === 'tpb')
          return <a href={record.magnet}><Button type="primary" shape="circle" icon="download"/></a>
        else
          return <a href={'/stz/' + record.id}><Button type='primary' shape='circle'><Icon
            type='play-circle-o'/></Button></a>
      }
    }];

    return <Table columns={columns} dataSource={this.state.results}/>
  }

  render() {
    return (
      <Layout style={{height: '100vh'}}>
        <Layout>
          <Header mode="inline">
            <Menu
              theme="dark"
              mode="horizontal"
              style={{lineHeight: '64px'}}>
              <Menu.Item key="1"><Link to="/">Shows</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/torrent/">Custom Search</Link></Menu.Item>
            </Menu>
          </Header>
          <Header mode="inline">
            <Search placeholder="Type a show's name" value={this.state.value} onChange={this.handleChange}/>
          </Header>


          <Content>
            {this.getTorrentTable()}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default(Tpb);