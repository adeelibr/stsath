import React, { Component } from 'react';

import { AuthToken } from 'Auth';

// import DashboardSidebar from 'dashboard/common/DashboardSidebar';
// import DashboardHeader from 'dashboard/common/DashboardHeader';

class DashboardLayout extends Component {

  constructor (props) {
    super(props);
  }

  // componentWillMount () {
  //   let {router} = this.props;
  //   let token = localStorage.getItem('token');
  //   if (!token) {
  //     router.push('/login');
  //   }
  //   else {
  //     AuthToken(token);
  //   }
  // }

  render () {
    let {children} = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
            <div className="col-md-12">
              {children}
            </div>
        </div>
      </div>
    );
  }
}

export default DashboardLayout;
