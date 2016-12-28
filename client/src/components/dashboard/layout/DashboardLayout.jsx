import React, { Component } from 'react';

import DashboardSidebar from 'dashboard/common/DashboardSidebar';
import DashboardHeader from 'dashboard/common/DashboardHeader';

class DashboardLayout extends Component {

  constructor (props) {
    super(props);
    this.state = { open: false };
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentWillMount () {
    let token = localStorage.getItem('token');
    if (!token) {
      this.props.router.push('/');
    }
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  render () {
    let {children} = this.props;
    let {open} = this.state;
    return (
      <div className="container-fluid">
        <DashboardSidebar open={open} handleToggle={this.handleToggle} />
        <DashboardHeader handleToggle={this.handleToggle} />
        {children}
      </div>
    );
  }
}

export default DashboardLayout;
