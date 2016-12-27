import React from 'react';
import { IndexLink, Link } from 'react-router';

let Navigation = (props) => {
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        {/* Brand and toggle get grouped for better mobile display */}
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <IndexLink to='/' className="navbar-brand">STSATH</IndexLink>
        </div>

        {/* Collect the nav links, forms, and other content for toggling */}
        <div className="collapse navbar-collapse" id="navbar-collapse">
          <ul className="nav navbar-nav">
            <li><IndexLink to='/' activeClassName="active">Home</IndexLink></li>
            <li><Link to='/about' activeClassName="active">About</Link></li>
            <li><Link to='/faq' activeClassName="active">FAQ</Link></li>
            <li><Link to='/contact' activeClassName="active">Get In Touch</Link></li>
          </ul>

          <ul className="nav navbar-nav navbar-right">
            <li><Link to='/login' activeClassName="active">Login</Link></li>
            <li><Link to='/signup' activeClassName="active">Create An Account</Link></li>
          </ul>
        </div> {/* end of .navbar-collapse */}
      </div> {/* end of .container-fluid */}
    </nav>
  );
}

export default Navigation;
