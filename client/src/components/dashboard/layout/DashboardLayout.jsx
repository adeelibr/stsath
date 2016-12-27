import React, { Component } from 'react';

import DashboardSidebar from 'dashboard/common/DashboardSidebar';
import DashboardHeader from 'dashboard/common/DashboardHeader';

class DashboardLayout extends Component {

  constructor (props) {
    super(props);
  }

  componentWillMount () {
    let token = localStorage.getItem('token');
    if (!token) {
      this.props.router.push('/');
    }
  }

  render () {
    let {children} = this.props;
    return (
      <div className="container-fluid">

        <div className="row">
          <div className="col-md-2 col-sm-2">
            <DashboardSidebar />
          </div>
          <div className="col-md-10 col-sm-10">
            <DashboardHeader />
            {children}
          </div>
        </div>

      </div>
    );
  }
}

export default DashboardLayout;
