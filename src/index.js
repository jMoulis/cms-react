import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { ErrorBoundary } from './components/ErrorBoundary';
import './styles/main.css';

ReactDOM.render(
  <Router>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Router>,
  document.getElementById('root'),
);

serviceWorker.unregister();
