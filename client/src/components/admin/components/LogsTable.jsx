import React, { PropTypes } from 'react';
import moment from 'moment'

import {Toggle, IconButton, Dialog, FlatButton} from 'material-ui/';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

let styles = {
  icon: {
    marginTop: -24, marginBottom: -24, marginLeft: 2, marginRight: 2,
    padding: 0,
    heigth: 24,
    width: 24,
  },
}

let LogsTable = ({ logs, deleteDialog, deleteDialogClose, deleteDialogOpen, deleteLog }) => {

  let renderEmptyRow = () => {
    return (
      <tr className="active text-center">
        <td colSpan="6">No Logs Exist. :(</td>
      </tr>
    );
  };

  let renderLogsList = () => {
    let single = () => (<span className="label label-info">Single Word</span>);
    let double = () => (<span className="label label-warning">Compare Words</span>);
    return logs.map((log, i) => {
      return (
        <tr key={i}>
          <td>{log.id}</td>
          <td>{log.detail}</td>
          <td>{log.detail.charAt(26) !== 's' ? single() : double()}</td>
          <td>{log.user.username}</td>
          <td>{log.user.first_name} {log.user.last_name}</td>
          <td>{moment(logs.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
          <td>
            <IconButton touch={true} style={styles.icon} onClick={() => deleteDialogOpen(log.id)} >
              <DeleteIcon />
            </IconButton>
          </td>
        </tr>
      );
    });
  };

  let renderDeleteDialog = () => {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={deleteDialogClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onTouchTap={deleteLog}
      />,
    ];
    return (
      <Dialog
          title="Delete"
          actions={actions}
          modal={true}
          open={deleteDialog}
        >
          Are You Sure You Want To Remove This Record From The Logs?
      </Dialog>
    );
  };

  return (
    <section>
      <h2>Details Logs</h2>
      <div className="table-responsive">
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Details</th>
              <th>Type</th>
              <th>Issued By User</th>
              <th>Person Name</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? renderEmptyRow() : renderLogsList()}
          </tbody>
        </table>
      </div>
      {renderDeleteDialog()}
    </section>
  );
}

LogsTable.propTypes = {
  logs: PropTypes.array.isRequired,
};

export default LogsTable;
