import React from 'react';
import { IndexLink, Link } from 'react-router';

let Sidebar = (props) => {
  return (
    <div id="mySidenav" className="sidenav">
      <Link to='/dashboard'>STSATH</Link>
      <Link to='/dashboard/search'>Search</Link>
      <Link to='/dashboard/compare'>Compare</Link>
      <Link to='/dashboard/collection'>Collection</Link>
      <Link to='/dashboard/profile'>Profile</Link>
      <Link to='/signout'>Signout</Link>
    </div>
  );
}

export default Sidebar;
