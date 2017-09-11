import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import Loading from '../Loading/Loading';

const {Header, Content, Sider} = Layout;

class Body extends Component {

  static getHeader() {
    return <Header>
      <div className="logo"/>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{lineHeight: '64px'}}>
        <Menu.Item key="1"><Link to="/">Shows</Link></Menu.Item>
        <Menu.Item key="2">Results</Menu.Item>
        <Menu.Item key="3"><Link to="/torrent/">Custom Search</Link></Menu.Item>
      </Menu>
    </Header>
  }

  getMenu() {
    if (this.props.menu)
      return <Sider breakpoint="md"
                    collapsedWidth="0"
                    onCollapse={(collapsed, type) => {
                      console.log(collapsed, type);
                    }}>
        {this.props.menu}
      </Sider>
    else
      return null;
  }


  getContent() {
    if (this.props.isLoaded)
      return (
        <Layout>
          {this.getMenu()}
          <Content style={{background: '#fff', padding: 24, minHeight: 280}}>
            <h1>{this.props.title}</h1>
            {this.props.children}
          </Content>
        </Layout>)
    else
      return <Loading />
  }

  getSearch() {
    return this.props.search ? this.props.search : null
  }

  render() {
    return <Layout>
      {Body.getHeader()}
      {this.getSearch()}
      {this.getContent()}
    </Layout>
  }
}

export

default(Body);
