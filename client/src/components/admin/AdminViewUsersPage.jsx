import React, { Component } from 'react';

import UserAPI from 'UserAPI';
import UsersTable from './components/UsersTable';

export default class AdminViewUsersPage extends Component {

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

  handleOnChangeUserStatus = (id) => {
    // console.log('@@@@@@@@ id', id);
    UserAPI.toggleUserStatus(id)
      .then((res) => {
        if (res.success) { return UserAPI.getAllUsers(); }
        else { throw Error(res); }
      })
      .then((data) => {
        if (data.success) { this.setState({ users: data.users }); }
        else { throw Error(res); }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render () {
    let {users} = this.state;
    return (
      <div className="">
        <UsersTable users={users} onChange={this.handleOnChangeUserStatus} />
      </div>
    );
  }
};
