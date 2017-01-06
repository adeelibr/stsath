import React, { Component } from 'react';

import Snackbar from 'material-ui/Snackbar';

import UserAPI from 'UserAPI';
import { RemoveToken } from 'Auth';
import ProfileUpdateForm from './components/ProfileUpdateForm';
import ProfileUpdatePasswordForm from './components/ProfileUpdatePasswordForm';

class ProfilePage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      errors: {}, passworderrors: {},
      user: { username: '', first_name: '', last_name: '', email: '' },
      password: { password: '', newPassword: '', newPasswordRepeat: '' },
      snackbar: { autoHideDuration: 4000, message: 'Account Updated', open: false }
    };
  }

  componentDidMount () {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    UserAPI.getUserById(userInfo.user.id)
    .then((data) => {
      if (!data.success) {
        if (data.errors.token) {
          RemoveToken();
          router.push('/login');
        }
      }
      this.setState({ user: data.user });
    })
    .catch((error) => {
      console.log('Error In dashboard > ProfilePage.jsx', error);
    });
  }

  processUpdateInfoForm = (e) => {
    let {user} = this.state;
    e.preventDefault();

    UserAPI.updateUserById(user.id, user)
    .then((res) =>{
      if (!res.success) {
        const errors = res.errors ? res.errors : {};
        errors.summary = res.message;
        this.setState({ errors });
      } else {
        // console.log('user: ', user);
        let snackbar = this.state.snackbar;
        snackbar.open = true;
        this.setState({ errors: {}, snackbar });
      }
    });
  }

  changeUser = (e) => {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;
    this.setState({ user });
  }

  changePasswordFields = (e) => {
    const field = e.target.name;
    const password = this.state.password;
    password[field] = e.target.value;
    this.setState({ password });
  }

  processUpdatePasswordForm = (e) => {
    let {password} = this.state;
    let {user} = this.state;
    e.preventDefault();

    UserAPI.updateUserPasswordById(user.id, password)
    .then((res) => {
      if (!res.success) {
        const passworderrors = res.errors ? res.errors : {};
        passworderrors.summary = res.message;
        this.setState({ passworderrors });
      } else {
        // console.log('Success: ', res);
        let snackbar = this.state.snackbar;
        snackbar.open = true;
        this.setState({ password: {}, passworderrors: {}, snackbar });
      }
    });
  }

  handleActionTouchTap = () => {
    let snackbar = this.state.snackbar;
    snackbar.open = false;
    this.setState({ snackbar });
  }

  render () {
    let {errors, user, passworderrors, password} = this.state;
    let { open, message, autoHideDuration } = this.state.snackbar;

    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <ProfileUpdateForm
            onSubmit={this.processUpdateInfoForm}
            onChange={this.changeUser}
            errors={errors}
            user={user}
            />
          <ProfileUpdatePasswordForm
            onSubmit={this.processUpdatePasswordForm}
            onChange={this.changePasswordFields}
            errors={passworderrors}
            password={password}
            />
        </div>
        <br/>
        <Snackbar
          open={open}
          message={message}
          action="Okay"
          autoHideDuration={autoHideDuration}
          onActionTouchTap={this.handleActionTouchTap}
          onRequestClose={this.handleActionTouchTap}
        />
      </div>
    );
  }

};

export default ProfilePage;
