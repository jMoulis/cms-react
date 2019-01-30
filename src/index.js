import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import store from 'store';
import AppContainer from 'containers/App/AppContainer';
import { ErrorBoundary } from 'components/ErrorBoundary';
import mainStyle from 'styles/main';
import * as serviceWorker from './serviceWorker';
import { theme } from './styles/theme';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Global styles={mainStyle} />
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <AppContainer />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  </Router>,
  document.getElementById('root'),
);

serviceWorker.unregister();
