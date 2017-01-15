import React, { Component } from 'react';

export default class AdminSignout extends Component {

  constructor (props) {
    super(props);
  }

  componentWillMount () {
    localStorage.removeItem('admintoken');
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
