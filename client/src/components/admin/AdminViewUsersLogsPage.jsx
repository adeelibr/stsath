import React, { Component } from 'react';

import LogsAPI from 'LogsAPI';
import LogsTable from './components/LogsTable';

export default class AdminViewUsersLogsPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      logs: [],
      deleteDialog: false,
      logID: 0,
    };
  }

  componentDidMount () {
    LogsAPI.getLogs()
      .then((data) => {
        if (data.success) {
          this.setState({ logs: data.logs });
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteDialogClose = () => { this.setState({ deleteDialog: false }); }

  deleteDialogOpen = (logID) => {
    this.setState({ deleteDialog: true, logID: logID });
  }

  deleteLog = () => {
    let {logID} = this.state;

    LogsAPI.deleteLogById(logID)
      .then((res) => {
        if (res.success) {
          return LogsAPI.getLogs();
        } else {
          throw Error('Something went wrong');
        }
      })
      .then((res) => {
        if (res.success) {
          this.setState({ logs: res.logs, deleteDialog: false });
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render () {
    let {logs, deleteDialog} = this.state;
    return (
      <div className="">
        <LogsTable
          logs={logs}
          deleteDialog={deleteDialog}
          deleteDialogClose={this.deleteDialogClose}
          deleteDialogOpen={this.deleteDialogOpen}
          deleteLog={this.deleteLog}
        />
      </div>
    );
  }
};
