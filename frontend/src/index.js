import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './components/App';
import configureStore from './store/store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { checkLoggedIn } from "./util/session";
// import * as serviceWorker from '../../../serviceWorker';

let preloadedState = {};
const store = configureStore(preloadedState);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
   document.getElementById('root')
);

const renderApp = preloadedState => {
  const store = configureStore(preloadedState);
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
     document.getElementById('root')
  );
  
};

window.getState = store.getState;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
