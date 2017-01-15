import React, {Component} from 'react';

import LoginForm from 'public/components/LoginForm';
import AdminLoginAPI from 'AdminLoginAPI';

class AdminLoginPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      errors: {},
      admin: {
        username: '',
        password: '',
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm (e) {
    let {admin} = this.state;
    e.preventDefault();
    // console.log('adminname: ', this.state.admin.adminname);
    // console.log('password: ', this.state.admin.password);

    AdminLoginAPI(admin)
    .then((res) =>{
      if (!res.success) {
        const errors = res.errors ? res.errors : {};
        errors.summary = res.message;
        this.setState({ errors });
      } else {
        this.setState({ errors: {} });
        localStorage.setItem('admintoken', res.token);
        this.props.router.push('/admin');
      }
    });
  }

  changeUser (e) {
    const field = e.target.name;
    const admin = this.state.admin;
    admin[field] = e.target.value;
    this.setState({ admin });
  }

  render () {
    let {errors, admin} = this.state;

    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <LoginForm
            onSubmit={this.processForm}
            onChange={this.changeUser}
            errors={errors}
            user={admin}
          />
        </div>
      </div>
    );
  }

};

export default AdminLoginPage;
