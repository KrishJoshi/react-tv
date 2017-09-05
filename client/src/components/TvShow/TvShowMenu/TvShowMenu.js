import React, {Component} from 'react';
import {Menu, Button} from 'antd';
const SubMenu = Menu.SubMenu;

class TvShowMenu extends Component {
  render() {
    const show = this.props.show;
    const self = this;

    return seasonShowList(this.props.show)


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
              <a onClick={(e) => self.props.getTorrent(episodeSearchTitle(season, episode))}>
                <Button type="primary"
                        shape="circle"
                        icon="download"/> {episode.title}
              </a>

            </Menu.Item>)
          })
        )
    }

    function seasonShowList(show) {
      if (Object.keys(show).length)
        return (
          <Menu mode="inline">
            {
              show.seasons.map(season =>
                                 <SubMenu
                                   key={season.number}
                                   title={
                                     <a onClick={(e) => self.props.getTorrent(seasonSearchTitle(season))}>
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
        )
    }
  }
}

export default(TvShowMenu);
