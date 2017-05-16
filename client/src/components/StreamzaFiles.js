import React, {Component} from 'react';
import {Layout, Button, Table, Icon, Menu, Spin} from 'antd';
const {Header, Content} = Layout;
import {Link} from 'react-router-dom';
import {getFile} from '../util/streamza-api'


class Tpb extends Component {
  constructor() {
    super();
    this.state = {
      results: []
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.setState({id: id});
    getFile(id).then(results => this.setState({results: results}))
  }


  getTorrentTable() {
    const columns = [{
      title: 'Name',
      dataIndex: 'title',
      key: 'title'
    }, {
      title: 'Actions',
      dataIndex: 'source',
      key: 'source',
      render: (text, record) => (
        <a href={record.source}><Button type='primary' shape='circle'><Icon type='play-circle-o'/></Button></a>
      )
    }];

    return <Table columns={columns} dataSource={this.state.results}/>

  }

  render() {
    if (this.state.results)
      return (
        <Layout style={{height: '100vh'}}>
          <Layout>
            <Header>
              <Menu
                theme="dark"
                mode="horizontal"
                style={{lineHeight: '64px'}}>
                <Menu.Item key="1"><Link to="/">Shows</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/torrent/">Custom Search</Link></Menu.Item>
              </Menu>
            </Header>
            <Content>
              {this.getTorrentTable()}
            </Content>
          </Layout>
        </Layout>
      )
    else
      return (
        <Layout style={{height: '100vh'}}>
          <Layout>
            <Header>
              <Menu
                theme="dark"
                mode="horizontal"
                style={{lineHeight: '64px'}}>
                <Menu.Item key="1"><Link to="/">Shows</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/torrent/">Custom Search</Link></Menu.Item>
              </Menu>
            </Header>
            <Content>
              <div className="loading">
                <Spin size="large"/>
              </div>
            </Content>
          </Layout>
        </Layout>
      )
  }
}

export default(Tpb);
