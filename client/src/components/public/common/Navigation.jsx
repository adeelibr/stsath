import React, {Component} from 'react';
import { IndexLink, Link } from 'react-router';
import { AppBar, Drawer, MenuItem, RaisedButton } from 'material-ui';

import HomeIcon from 'material-ui/svg-icons/action/home';
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';
import CLoseIcon from 'material-ui/svg-icons/navigation/close';
import WhatshotIcon from 'material-ui/svg-icons/social/whatshot';
import QAIcon from 'material-ui/svg-icons/action/question-answer';
import ContactIcon from 'material-ui/svg-icons/communication/contacts';


class Navigation extends Component {

  constructor (props) {
    super(props);
    this.state = { open: false };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  render () {
    return (
      <nav>
        <AppBar
          title="Smart Twitter Sentiment Analysis On Tweets & Hashtags"
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem
            onTouchTap={this.handleToggle}
            primaryText=""
            rightIcon={<CLoseIcon />}
          />
          <IndexLink to='/'>
            <MenuItem primaryText="Home" leftIcon={<HomeIcon />} onTouchTap={this.handleToggle} />
          </IndexLink>
          <Link to='/about'>
            <MenuItem primaryText="About" leftIcon={<WhatshotIcon />} onTouchTap={this.handleToggle} />
          </Link>
          <Link to='/faq'>
            <MenuItem primaryText="FAQ" leftIcon={<QAIcon />} onTouchTap={this.handleToggle} />
          </Link>
          <Link to='/contact'>
            <MenuItem primaryText="Contact" leftIcon={<ContactIcon />} onTouchTap={this.handleToggle} />
          </Link>
          <Link to='/login'>
            <MenuItem primaryText="Login" leftIcon={<AccountCircleIcon />} onTouchTap={this.handleToggle} />
          </Link>
          <Link to='/signup'>
            <MenuItem primaryText="Create An Account" leftIcon={<AddCircleIcon />} onTouchTap={this.handleToggle} />
          </Link>
        </Drawer>
      </nav>
    );
  }
}

export default Navigation;
