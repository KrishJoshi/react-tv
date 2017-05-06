import React, {Component} from 'react';
import {Layout, Input, Button, Table} from 'antd';
const {Header, Content} = Layout;
const Search = Input.Search;

import {getTpb} from '../util/tpb-api'


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
    getTpb(query).then(results => this.setState({results: results}))
  }


  getTorrentTable() {
    const columns = [{
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: 'Seeders',
      dataIndex: 'seeders',
      key: 'seeders',
    }, {
      title: 'Seechers',
      dataIndex: 'leechers',
      key: 'leechers',
    }, {
      title: 'Actions',
      dataIndex: 'magnet',
      key: 'magnet',
      render: (text, record) => (
        <a href={record.magnet}><Button type="primary" shape="circle" icon="download"/></a>
      )
    }];


    const results = this.state.results.sort((result1, result2) => {
      return result1.seeders - result2.seeders
    }).reverse()

    return <Table columns={columns} dataSource={results}/>

  }

  render() {
    return (
      <Layout style={{height: '100vh'}}>
        <Layout>
          <Header mode="inline">
            <Search placeholder="Type a show's name" value={this.state.value} onChange={this.handleClickEvent}/>
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
