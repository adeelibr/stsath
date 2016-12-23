import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

// import TodoApp from 'TodoApp';
require('style!css!sass!./styles/app.sass');

let App = React.createClass({
  render: function () {
    return (
      <div className="container">
        <p className="color-bg">Hello</p>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
