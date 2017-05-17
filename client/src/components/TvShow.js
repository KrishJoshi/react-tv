import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {Layout, Menu, Spin, Button, Table, Icon} from 'antd';
const {Header, Content, Sider} = Layout;
const SubMenu = Menu.SubMenu;

import {search} from '../reducers/find-torrents'
import {getTvShow} from '../util/trakt-api'

class TvShow extends Component {

  constructor() {
    super();
    this.state = {
      show: [],
      open: false
    };
  }

  handleNestedListToggle = (item) => {
    this.setState({
                    open: item.state.open
                  });
  };

  componentDidMount() {
    getTvShow(this.props.match.params.traktId).then(show => this.setState({show: show}))
  }

  getTorrent(query) {
    search(query).then(results => this.setState({results: results}))
  }

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
    const show = this.state.show;
    const self = this;

    function seasonSearchTitle(season) {
      const seasonNum = season.number > 9 ? season.number : '0' + season.number;
      return show.title + ' ' + 'S' + seasonNum;
    }

    function episodeSearchTitle(season, episode) {
      const seasonNum = season.number > 9 ? season.number : '0' + season.number;
      const episodeNum = episode.number > 9 ? episode.number : '0' + episode.number;
      return show.title + ' ' + 'S' + seasonNum + 'E' + episodeNum;
    }

    function episodesList(season) {
      if (season.episodes)
        return (
          season.episodes.map(episode => {
            return (<Menu.Item
              key={episode.number}>
              <a onClick={(e) => self.getTorrent(episodeSearchTitle(season, episode))}>
                <Button type="primary"
                        shape="circle"
                        icon="download"/> {episode.title}
              </a>

            </Menu.Item>)
          })
        )
    }

    function seasonShowList(show) {
      return (
        <Sider style={{backgroundColor: '#fff'}}>
          <Menu mode="inline">
            {
              show.seasons.map(season =>
                                 <SubMenu
                                   key={season.number}
                                   title={
                                     <a onClick={(e) => self.getTorrent(seasonSearchTitle(season))}>
                                       <Button
                                         type="primary"
                                         shape="circle"
                                         icon="download"/>
                                       Season {season.number} </a>
                                   }>
                                   {episodesList(season)}
                                 </SubMenu>
              )
            }
          </Menu>
        </Sider>
      )
    }

    if (show.seasons) {
      return (
        <Layout>
          <Header>
            <div className="logo"/>
            <Menu
              theme="dark"
              mode="horizontal"
              style={{lineHeight: '64px'}}>
              <Menu.Item key="1"><Link to="/">Shows</Link></Menu.Item>
              <Menu.Item key="2">Results</Menu.Item>
              <Menu.Item key="3"><Link to="/torrent/"> Custom Search</Link></Menu.Item>
            </Menu>
          </Header>
          <Layout>
            {
              seasonShowList(show, this)
            }

            <Content style={{background: '#fff', padding: 24, minHeight: 280}}>
              <h1>{show.title}</h1>


              {this.getTorrentTable()}
            </Content>
          </Layout>
        </Layout>
      )
    } else {
      return (
        <div className="loading">
          <Spin size="large"/>
        </div>
      )
    }
  }
}

export default(TvShow);
