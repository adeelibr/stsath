import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

// import TodoApp from 'TodoApp';

// $(document).foundation();
// require('style!css!sass!./styles/app.scss');

let App = React.createClass({
  render: function () {
    return (
      <div>
        <p>Hello</p>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
