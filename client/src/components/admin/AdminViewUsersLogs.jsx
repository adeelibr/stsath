import React, { Component } from 'react';

import UserAPI from 'UserAPI';
import UsersTable from './components/UsersTable';

export default class AdminViewUsersLogs extends Component {

  constructor (props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount () {
    UserAPI.getAllUsers()
      .then((data) => {
        if (data.success) {
          this.setState({ users: data.users });
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render () {
    let {users} = this.state;
    return (
      <div className="">
        <h2>Logs</h2>
      </div>
    );
  }
};
