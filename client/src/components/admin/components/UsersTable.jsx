import React, { PropTypes } from 'react';
import moment from 'moment'

import {Toggle} from 'material-ui/';

let UsersTable = ({ users, onChange }) => {

  let renderEmptyRow = () => {
    return (
      <tr className="active text-center">
        <td colSpan="7">No Users Exist. :(</td>
      </tr>
    );
  };

  let renderUsersList = () => {
    let active = () => (<span className="label label-success">Active</span>);
    let deactive = () => (<span className="label label-danger">Deactive</span>);
    return users.map((user, i) => {
      return (
        <tr key={i}>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.first_name} {user.last_name}</td>
          <td>{user.email}</td>
          <td>{user.status ? active() : deactive()}</td>
          <td>{moment(user.createdAt).format('MM-DD-YYYY')}</td>
          <td>{moment(user.updatedAt).format('MM-DD-YYYY')}</td>
          <td>
            <Toggle
              label=""
              defaultToggled={user.status}
              onToggle={() => { onChange(user.id); }}
            />
          </td>
        </tr>
      );
    });
  };

  return (
    <section>
      <h2>Manage Users</h2>
      <div className="table-responsive">
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>User Name</th>
              <th>Person Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Last Updated Information</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? renderEmptyRow() : renderUsersList()}
          </tbody>
        </table>
      </div>
    </section>
  );
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default UsersTable;
