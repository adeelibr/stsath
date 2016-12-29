import React, {Component} from 'react';

import LoginForm from 'public/components/LoginForm';
import LoginAPI from 'LoginAPI';

class LoginPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      errors: {},
      user: {
        username: '',
        password: '',
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm (e) {
    let {user} = this.state;
    e.preventDefault();
    // console.log('username: ', this.state.user.username);
    // console.log('password: ', this.state.user.password);

    LoginAPI(user)
    .then((res) =>{
      if (!res.success) {
        const errors = res.errors ? res.errors : {};
        errors.summary = res.message;
        this.setState({ errors });
      } else {
        // console.log('Form is valid');
        this.setState({ errors: {} });
        localStorage.setItem('token', res.token);
        this.props.router.push('/dashboard');
      }
    });
  }

  changeUser (e) {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;
    this.setState({ user });
  }

  render () {
    let {errors, user} = this.state;

    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <LoginForm
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

export default LoginPage;
