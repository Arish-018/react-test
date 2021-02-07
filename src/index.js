import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createStore } from './lib/Store.js';
import App from './App';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={createStore()}>
      <Router>
        <App />
      </Router>
    </Provider>,
    document.body.appendChild(document.createElement('div'))
  );
});

