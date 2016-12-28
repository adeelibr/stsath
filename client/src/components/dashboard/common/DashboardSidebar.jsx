import React, {Component} from 'react';
import { IndexLink, Link } from 'react-router';
import { Drawer, MenuItem } from 'material-ui';

import HomeIcon from 'material-ui/svg-icons/action/home';
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';
import CLoseIcon from 'material-ui/svg-icons/navigation/close';
import WhatshotIcon from 'material-ui/svg-icons/social/whatshot';
import QAIcon from 'material-ui/svg-icons/action/question-answer';
import ContactIcon from 'material-ui/svg-icons/communication/contacts';

class Sidebar extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    let {open, handleToggle} = this.props;

    return (
      <Drawer
        docked={false}
        width={300}
        open={open}
        onRequestChange={handleToggle}
      >
        <Link to='/dashboard' className="">
          <MenuItem
            primaryText="Dashboard"
            onTouchTap={handleToggle}
            style={{backgroundColor: '#1E88E5', color: 'white'}}
          />
        </Link>
        <Link to='/dashboard/search'>
          <MenuItem primaryText="Search" leftIcon={<WhatshotIcon />} onTouchTap={handleToggle} />
        </Link>
        <Link to='/dashboard/compare'>
          <MenuItem primaryText="Compare" leftIcon={<QAIcon />} onTouchTap={handleToggle} />
        </Link>
        <Link to='/dashboard/collection'>
          <MenuItem primaryText="Collections" leftIcon={<QAIcon />} onTouchTap={handleToggle} />
        </Link>
        <Link to='/dashboard/profile'>
          <MenuItem primaryText="Edit Profile" leftIcon={<QAIcon />} onTouchTap={handleToggle} />
        </Link>
        <Link to='/signout'>
          <MenuItem primaryText="Signout" leftIcon={<QAIcon />} onTouchTap={handleToggle} />
        </Link>
      </Drawer>
    );
  }

}

export default Sidebar;
