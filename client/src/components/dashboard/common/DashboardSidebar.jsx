import React from 'react';
import { Link } from 'react-router';

import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import WhatshotIcon from 'material-ui/svg-icons/social/whatshot';
import QAIcon from 'material-ui/svg-icons/action/question-answer';
import HomeIcon from 'material-ui/svg-icons/action/home';

import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import ContactIcon from 'material-ui/svg-icons/communication/contacts';

import FontIcon from 'material-ui/FontIcon';

const iconStyles = {
  marginRight: 0,
};

let Sidebar = (props) => {
  return (
    <nav className="nav-side-menu">

      <div className="navbar-header">
        <button
          type="button" className="navbar-toggle collapsed" data-toggle="collapse"
          data-target="#menu-content" aria-expanded="false"
        >
          <span className="sr-only">Toggle navigation</span>
          <MenuIcon color={'#fff'} />
        </button>
      </div>

      <div className="menu-list">
        <ul id="menu-content" className="menu-content collapse out">
          <li>
            <Link to='/dashboard/'>
              <i><WhatshotIcon style={iconStyles} color={'#fff'} /></i>
              <span className="nav-menu-name">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to='/dashboard/search'>
              <i><WhatshotIcon style={iconStyles} color={'#fff'} /></i>
              <span className="nav-menu-name">Search</span>
            </Link>
          </li>
          <li>
            <Link to='/dashboard/compare'>
              <i><QAIcon style={iconStyles} color={'#fff'} /></i>
              <span className="nav-menu-name">Compare</span>
            </Link>
          </li>

          <li>
            <Link to='/dashboard/feedback'>
              <i><WhatshotIcon style={iconStyles} color={'#fff'} /></i>
              <span className="nav-menu-name">Feedback</span>
            </Link>
          </li>
          <li>
            <Link to='/dashboard/profile'>
              <i><QAIcon style={iconStyles} color={'#fff'} /></i>
              <span className="nav-menu-name">Edit Profile</span>
            </Link>
          </li>
          <li>
            <Link to='/signout'>
              <i><QAIcon style={iconStyles} color={'#fff'} /></i>
              <span className="nav-menu-name">Signout</span>
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  );
}

export default Sidebar;

// <li data-toggle="collapse" data-target="#collection" className="collapsed">
//   <a><i><QAIcon /></i> Collection <span><CloseIcon /></span></a>
// </li>
// <ul className="sub-menu collapse" id="collection">
//   <li>
//     <Link to='/dashboard/collection'>
//       <i><QAIcon /></i>
//       <span>Search Collections</span>
//     </Link>
//   </li>
//   <li>
//     <Link to='/dashboard/collection'>
//       <i><QAIcon /></i>
//       <span>Compare Collections</span>
//     </Link>
//   </li>
// </ul>
