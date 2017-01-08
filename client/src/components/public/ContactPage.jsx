import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

import ContactForm from 'public/components/ContactForm';
import ContactAPI from 'ContactAPI';

export default class ContactPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      errors: {},
      user: { person_name: '', email: '', message: '' },
      snackbar: { autoHideDuration: 4000, message: 'Message Sent, Thankyou', open: false },
      loader: false,
    };
  }

  onSubmit = (e) => {
    let { user } = this.state;
    e.preventDefault();

    this.setState({ loader: true });

    ContactAPI(user)
    .then((res) =>{
      if (!res.success) {
        const errors = res.errors ? res.errors : {};
        errors.summary = res.message;
        this.setState({ errors, loader: false });
      } else {
        let snackbar = this.state.snackbar;
        snackbar.open = true;
        this.setState({ errors: {}, snackbar, loader: false });
      }
    });
  }

  onChangeFieldValue = (e) => {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;
    this.setState({ user });
  }

  handleActionTouchTap = () => {
    let snackbar = this.state.snackbar;
    snackbar.open = false;
    this.setState({ snackbar });
  }

  render () {
    let { user, errors, loader } = this.state;
    let { message, open, autoHideDuration } = this.state.snackbar;
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <ContactForm
            onSubmit={this.onSubmit}
            onChange={this.onChangeFieldValue}
            showProgress={loader}
            errors={errors}
            user={user}
          />
          <Snackbar
            open={open}
            message={message}
            action="Okay"
            autoHideDuration={autoHideDuration}
            onActionTouchTap={this.handleActionTouchTap}
            onRequestClose={this.handleActionTouchTap}
          />
        </div>
      </div>
    );
  }

};

// export default ContactPage;
