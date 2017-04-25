import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {BrowserRouter as Router, Route, browserHistory, Switch} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App';
import TvShow from './components/TvShow';
import Tpb from './components/Tpb';
import reducers from './reducers';
import './index.css';


const store = createStore(reducers);
injectTapEventPlugin();

const page = <Provider store={store}>
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Router history={browserHistory}>
      <Switch>

        <Route exact path="/search/:name?" component={App}/>
        <Route path="/show/:traktId?" component={TvShow}/>
        <Route path="/tpb/:query?" component={Tpb}/>
        <Route component={App}/>
      </Switch>
    </Router>
  </MuiThemeProvider>
</Provider>;


ReactDOM.render(
  page,
  document.getElementById('root'))
