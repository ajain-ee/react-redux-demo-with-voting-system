import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import App from './components/app';
import {VotingContainer} from './components/voting';
import {ResultsContainer} from './components/results';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import {setState} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';




const socket = io(`${location.protocol}\/\/${location.hostname}:8090`);

socket.on('state', state =>
  {
  	console.log("starting state", state);
  	store.dispatch(setState(state))
  }
);

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);

const routes = <Route component={App}>
  <Route path="/results" component={ResultsContainer} />
  <Route path="/" component={VotingContainer} />
</Route>;


ReactDOM.render(
    <Provider store={store}>
    	<Router history={hashHistory}>{routes}</Router>
  	</Provider>,
  document.getElementById('app')
);