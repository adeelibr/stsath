import React, {Component} from 'react';

import Snackbar from 'material-ui/Snackbar';

import SignupForm from 'public/components/SignupForm';
import SignupAPI from 'SignupAPI';

class SignupPage extends Component {

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
      },
      snackbar: {
        autoHideDuration: 4000,
        message: 'Account Succesfully Created',
        open: false,
      }
    };
  }

  processForm = (e) => {
    let {user} = this.state;
    e.preventDefault();
    // console.log('user: ', user);

    SignupAPI(user)
    .then((res) =>{
      if (!res.success) {
        const errors = res.errors ? res.errors : {};
        errors.summary = res.message;
        this.setState({ errors });
      } else {
        // console.log('Form is valid, Account Has Been Created');
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

  handleActionTouchTap = () => {
    this.setState({ open: false });
    this.props.router.push('/login');
  };

  handleRequestClose = (e) => {
    this.setState({ open: false });
  };

  render () {
    let { errors, user } = this.state;
    let { open, message, autoHideDuration } = this.state.snackbar;
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <SignupForm
            onSubmit={this.processForm}
            onChange={this.changeUser}
            errors={errors}
            user={user}
          />
        </div>

        <Snackbar
          open={open}
          message={message}
          action="Login"
          autoHideDuration={autoHideDuration}
          onActionTouchTap={this.handleActionTouchTap}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }

};

export default SignupPage;
