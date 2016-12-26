import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory'

require('style!css!sass!./styles/app.sass');

import Main from 'MainLayout';
import HomePage from 'HomePage';
import AboutPage from 'AboutPage';
import FaqPage from 'FaqPage';
import ContactPage from 'ContactPage';
import LoginPage from 'LoginPage';
import SignupPage from 'SignupPage';

// useRouterHistory creates a composable higher-order function
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

class App extends React.Component {
  render () {
    return (
      <Router history={appHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/faq" component={FaqPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
        </Route>
      </Router>
    );
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
