import React, { Component } from 'react';

class Signout extends Component {

  constructor (props) {
    super(props);
  }

  componentWillMount () {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    this.props.router.push('/');
  }

  render () {
    return (
      <div className="">
        <h4>Signing Out</h4>
      </div>
    );
  }
}

export default Signout;
