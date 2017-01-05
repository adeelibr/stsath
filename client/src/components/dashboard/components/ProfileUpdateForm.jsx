import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const ProfileUpdateForm = ({ onSubmit, onChange, errors, user }) => (
  <Card className="profile-update-form">
    <form action="/" onSubmit={onSubmit}>
      <h2>Update Profile</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Username"
          name="username"
          errorText={errors.username}
          onChange={onChange}
          value={user.username}
          fullWidth={true}
        />
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="field-line">
        <TextField
          floatingLabelText="First Name"
          name="first_name"
          errorText={errors.first_name}
          onChange={onChange}
          value={user.first_name}
          fullWidth={true}
        />
      </div>
        </div>
        <div className="col-md-6">
          <div className="field-line">
        <TextField
          floatingLabelText="Last Name"
          name="last_name"
          errorText={errors.last_name}
          onChange={onChange}
          value={user.last_name}
          fullWidth={true}
        />
      </div>
        </div>
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Email"
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
          fullWidth={true}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          errorText={errors.password}
          onChange={onChange}
          value={user.password}
          fullWidth={true}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Confirm Password"
          type="password"
          name="confirmPassword"
          errorText={errors.confirmPassword}
          onChange={onChange}
          value={user.confirmPassword}
          fullWidth={true}
        />
      </div>

      <div className="button-line pull-right">
        <RaisedButton type="submit" label="Create Account" />
      </div>

      <CardText>Have an account {'?'} <Link to={'/login'}>Sign In</Link>.</CardText>

    </form>
  </Card>
);

ProfileUpdateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default ProfileUpdateForm;
