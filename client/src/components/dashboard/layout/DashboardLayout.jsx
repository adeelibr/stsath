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
      this.props.router.push('/login');
    }
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  render () {
    let {children} = this.props;
    let {open} = this.state;

    var divStyle = {
      background: "#eee",
      padding: "20px",
      marginLeft: this.state.open ? "320px" : "0px"
    };

    return (
      <div className="container-fluid">
        <DashboardSidebar open={open} handleToggle={this.handleToggle} />
        <DashboardHeader handleToggle={this.handleToggle} />
        <div style={divStyle}>
          {children}
        </div>
      </div>
    );
  }
}

export default DashboardLayout;
