import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Game from './components/game';
import Auth from './components/auth';
import RequireAuth from './components/require_auth';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if(token) {
  store.dispatch({ type: AUTH_USER });
  browserHistory.push('/game');
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Auth} />
        <Route path="game" component={RequireAuth(Game)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.main'));
