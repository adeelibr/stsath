import React, { Component } from 'react';
import { Link } from 'react-router';
import { AppBar, Drawer, MenuItem } from 'material-ui';

import CloseIcon from 'material-ui/svg-icons/navigation/close';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import FeedbackIcon from 'material-ui/svg-icons/action/feedback';
import ContactIcon from 'material-ui/svg-icons/communication/contacts';
import PowerIcon from 'material-ui/svg-icons/action/power-settings-new';

export default class AdminTitlebar extends Component {

  constructor (props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  render () {
    return (
      <nav>
        <AppBar
          title="Dashboard"
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={300}
          open={this.state.open}
          openSecondary={true}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onTouchTap={this.handleToggle} primaryText="" rightIcon={<CloseIcon />} />
          <Link to='/admin'>
            <MenuItem primaryText="Dashbaord" leftIcon={<DashboardIcon />} onTouchTap={this.handleToggle} />
          </Link>
          <Link to='/admin/view/feedbacks'>
            <MenuItem primaryText="Feedback" leftIcon={<FeedbackIcon />} onTouchTap={this.handleToggle} />
          </Link>
          <Link to='/login'>
            <MenuItem primaryText="Users" leftIcon={<ContactIcon />} onTouchTap={this.handleToggle} />
          </Link>
          <Link to='/admin/signout'>
            <MenuItem primaryText="Signout" leftIcon={<PowerIcon />} onTouchTap={this.handleToggle} />
          </Link>
        </Drawer>
      </nav>
    );
  }

}
