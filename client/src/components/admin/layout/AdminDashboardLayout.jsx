import React, { Component } from 'react';

import { AuthToken } from 'Auth';
import AdminTitlebar from 'admin/common/AdminTitlebar';

class DashboardLayout extends Component {

  constructor (props) {
    super(props);
  }

  componentWillMount () {
    let {router} = this.props;
    let token = localStorage.getItem('admintoken');
    if (!token) { router.push('/admin/login'); }
    else { AuthToken(token); }
  }

  render () {
    let {children} = this.props;

    return (
      <div>
        <AdminTitlebar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardLayout;
