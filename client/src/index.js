import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { BrowserRouter as Router, Route, Redirect, browserHistory } from 'react-router-dom';

import App from './components/App';
import TvShow from './components/TvShow';
import reducers from './reducers';
import './index.css';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <Router history={browserHistory}>
        <div>
          <Route exact path="/search/:name?" component={App} />
          <Route exact path="/torrent/:traktId?" component={TvShow} />
          {/*<Redirect from="*" to="/search" />*/}
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'));