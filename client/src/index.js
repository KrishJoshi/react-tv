import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, browserHistory, Switch} from 'react-router-dom';

import App from './components/App';
import TvShow from './components/TvShow';
import Tpb from './components/Tpb';
import reducers from './reducers';
import './index.css';


const store = createStore(reducers);

const page = <Provider store={store}>
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/search/:name?" component={App}/>
      <Route path="/show/:traktId?" component={TvShow}/>
      <Route path="/tpb/:query?" component={Tpb}/>
      <Route component={App}/>
    </Switch>
  </Router>
</Provider>;


ReactDOM.render(
  page,
  document.getElementById('root'))
