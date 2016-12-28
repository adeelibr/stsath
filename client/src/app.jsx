import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin(); // Needed for onTouchTap

require('style!css!sass!./styles/app.sass');

import MainLayout from 'public/layout/MainLayout';
import HomePage from 'public/HomePage';
import AboutPage from 'public/AboutPage';
import FaqPage from 'public/FaqPage';
import ContactPage from 'public/ContactPage';
import LoginPage from 'public/LoginPage';
import SignupPage from 'public/SignupPage';

import DashboardLayout from 'dashboard/layout/DashboardLayout';
import DashboardMainPage from 'dashboard/DashboardMainPage';
import DashboardSearchPage from 'dashboard/DashboardSearchPage';
import DashboardComparePage from 'dashboard/DashboardComparePage';
import DashboardCollectionPage from 'dashboard/DashboardCollectionPage';
import ProfilePage from 'dashboard/ProfilePage';
import Signout from 'dashboard/Signout';

// useRouterHistory creates a composable higher-order function
const appHistory = useRouterHistory(createHashHistory)();

class App extends React.Component {
  render () {
    return (
      <Router history={appHistory}>
        <Route path="/" component={MainLayout}>
          <IndexRoute component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/faq" component={FaqPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
        </Route>
        <Route path="/dashboard" component={DashboardLayout}>
          <IndexRoute component={DashboardMainPage} />
          <Route path="/dashboard/search" component={DashboardSearchPage} />
          <Route path="/dashboard/compare" component={DashboardComparePage} />
          <Route path="/dashboard/collection" component={DashboardCollectionPage} />
          <Route path="/dashboard/profile" component={ProfilePage} />
          <Route path="/signout" component={Signout} />
        </Route>
      </Router>
    );
  }

}

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
  document.getElementById('app')
);
