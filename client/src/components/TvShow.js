import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {Layout, Menu, Spin} from 'antd';
const {Header, Content, Sider} = Layout;
const SubMenu = Menu.SubMenu;

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
      open: item.state.open,
    });
  };

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
          return (<Menu.Item
            key={episode.number}>
            <Link to={episodeSearchTitle(season, episode)}> {episode.title} </Link>
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
                    <Link to={seasonSearchTitle(season)}>Season {season.number} </Link>
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
              <Menu.Item key="3"><Link to="/tpb/"> ustom Search</Link></Menu.Item>
            </Menu>
          </Header>
          <Layout>
            {
              seasonShowList(show, this)
            }

            <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
              Content
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
