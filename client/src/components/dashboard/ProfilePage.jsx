import React, { Component } from 'react';

import ProfileUpdateForm from './components/ProfileUpdateForm';

class ProfilePage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      errors: {},
      user: {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  }

  processForm = (e) => {
    let {user} = this.state;
    e.preventDefault();
    // console.log('user: ', user);

    // SignupAPI(user)
    // .then((res) =>{
    //   if (!res.success) {
    //     const errors = res.errors ? res.errors : {};
    //     errors.summary = res.message;
    //     this.setState({ errors });
    //   } else {
    //     // console.log('Form is valid, Account Has Been Created');
    //     let snackbar = this.state.snackbar;
    //     snackbar.open = true;
    //     this.setState({ errors: {}, snackbar });
    //   }
    // });
  }

  changeUser = (e) => {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;
    this.setState({ user });
  }

  render () {
    let {errors, user} = this.state;

    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <ProfileUpdateForm
            onSubmit={this.processForm}
            onChange={this.changeUser}
            errors={errors}
            user={user}
            />
        </div>
      </div>
    );
  }

};

export default ProfilePage;
