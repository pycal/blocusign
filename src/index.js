import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router'
import { DrizzleProvider } from 'drizzle-react'
import openSocket from 'socket.io-client';
// Layouts
import { LoadingContainer } from 'drizzle-react-components'
import App from './App'

import { history, store } from './store'
import drizzleOptions from './drizzleOptions'

React.socket = openSocket('http://localhost:3000');

ReactDOM.render((
    <DrizzleProvider options={drizzleOptions} store={store}>
      <LoadingContainer>
        <Router history={history} store={store}>
          <Route path="/" component={App} />
        </Router>
      </LoadingContainer>
    </DrizzleProvider>
  ),
  document.getElementById('root')
);
