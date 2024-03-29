import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, browserHistory, Switch} from 'react-router-dom';
import TvShowsList from './components/TvShows/TvShowsList';
import TvShow from './components/TvShow/TvShow';
import Search from './components/Search/Search';
import StreamzaFiles from './components/StreamzaFiles'
import reducers from './reducers';
import './index.css';

const store = createStore(reducers);

const page = <Provider store={store}>
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/search/:name?" component={TvShowsList}/>
      <Route path="/show/:traktId?" component={TvShow}/>
      <Route path="/torrent/:query?" component={Search}/>
      <Route path="/stz/:id?" component={StreamzaFiles}/>
      <Route component={TvShowsList}/>
    </Switch>
  </Router>
</Provider>;

ReactDOM.render(page, document.getElementById('root'))