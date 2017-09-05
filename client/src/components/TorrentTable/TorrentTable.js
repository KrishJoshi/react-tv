import React, {Component} from 'react';
import {Button, Table} from 'antd';
import Loading from '../Loading/Loading';

class TorrentTable extends Component {

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
      title: 'Leechers',
      dataIndex: 'leechers',
      key: 'leechers'
    }, {
      title: 'Actions',
      key: 'action',
      render: (text, record) => {
        return <a href={record.magnet}><Button type="primary" shape="circle" icon="download"/></a>
      }
    }];

    return <Table columns={columns} locale={{emptyText: 'No items found'}} dataSource={this.props.results}/>
  }

  render() {
    if (this.props.results)
      return this.getTorrentTable()
    else
      return <Loading />
  }
}

export default(TorrentTable);
