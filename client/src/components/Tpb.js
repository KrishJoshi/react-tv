import React, {Component} from 'react';

import {getTpb} from '../util/tpb-api'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui";

import IconButton from 'material-ui/IconButton';
import CloudDownload from 'material-ui/svg-icons/file/cloud-download';

class Tpb extends Component {
  constructor() {
    super();
    this.state = {
      results: []
    };
  }

  componentDidMount() {
    getTpb(this.props.match.params.query).then(results => this.setState({results: results}))
  }

  render() {
    const results = this.state.results.sort((result1, result2) => {
      return result1.seeders - result2.seeders
    }).reverse()

    if (results.length) {
      return (
        <div className='app'>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Title</TableHeaderColumn>
                <TableHeaderColumn>Seeds</TableHeaderColumn>
                <TableHeaderColumn>Leechers</TableHeaderColumn>
                <TableHeaderColumn> </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                results.map(result =>
                  <TableRow key={result.title}>
                    <TableRowColumn>{result.title}</TableRowColumn>
                    <TableRowColumn>{result.seeders}</TableRowColumn>
                    <TableRowColumn>{result.leechers}</TableRowColumn>
                    <TableRowColumn> <a
                      href={result.magnet}>
                      <IconButton>
                        <CloudDownload />
                      </IconButton>
                    </a>
                    </TableRowColumn>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>


        </div>
      )
    } else {
      return null
    }

  }
}

export default(Tpb);
