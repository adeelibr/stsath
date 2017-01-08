import React, { PropTypes } from 'react';

import { Link } from 'react-router';

import { Card, CardText } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const style = {
  progress: {
    display: 'block',
    margin: '0 auto',
  }
}

const ContactForm = ({ onSubmit, onChange, showProgress, errors, user }) => (
  <Card className="login-form">
    <form action="/" onSubmit={onSubmit}>
      <h2>Get In Touch With Us</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}
      {showProgress && <CircularProgress size={60} thickness={7} style={style.progress} />}

      <div className="field-line">
        <TextField
          floatingLabelText="Your Name"
          name="person_name"
          value={user.person_name}
          errorText={errors.person_name}
          onChange={onChange}
          fullWidth={true}
        />
      </div>
      <div className="field-line">
        <TextField
          floatingLabelText="Email Address"
          type="text"
          name="email"
          value={user.email}
          errorText={errors.email}
          onChange={onChange}
          fullWidth={true}
        />
      </div>
      <div className="field-line">
        <TextField
          hintText="What do you want to tell us?"
          floatingLabelText="Your Message"
          type="text"
          name="message"
          value={user.message}
          errorText={errors.message}
          multiLine={true}
          rows={5}
          onChange={onChange}
          fullWidth={true}
        />
      </div>

      <div className="button-line pull-right">
        <RaisedButton type="submit" label="Send A Message" primary={true} />
      </div>

      <CardText>Our team will get in touch with you withing 24 hours</CardText>

    </form>
  </Card>
);

// ContactForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
//   errors: PropTypes.object.isRequired,
//   user: PropTypes.object.isRequired
// };

export default ContactForm;
