import React, { PropTypes } from 'react';
import moment from 'moment'

let UsersTable = ({ users }) => {

  let renderEmptyRow = () => {
    return (
      <tr className="active text-center">
        <td colSpan="7">No Users Exist. :(</td>
      </tr>
    );
  };

  let renderUsersList = () => {
    return users.map((user, i) => {
      return (
        <tr key={i}>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.first_name}</td>
          <td>{user.last_name}</td>
          <td>{moment(user.createdAt).format('MM-DD-YYYY')}</td>
          <td>{moment(user.updatedAt).format('MM-DD-YYYY')}</td>
          <td>Deactive User</td>
        </tr>
      );
    });
  };

  return (
    <section>
      <h1>Users Information</h1>
      <div className="table-responsive">
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>User Name</th>
              <th>Person Name</th>
              <th>Email</th>
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
};

export default UsersTable;
