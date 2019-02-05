import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import {check, call, fold, raise} from './actions';

// console.log(store.getState());
// store.dispatch(check(0));
// store.dispatch(call(null, 0));
// store.dispatch(fold(0));
// store.dispatch(raise(5, 0));
// console.log(store.getState());
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
