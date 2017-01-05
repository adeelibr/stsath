import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const ProfileUpdatePasswordForm = ({ onSubmit, onChange, errors, password }) => (
  <Card className="form">
    <form action="/" onSubmit={onSubmit}>
      <h2>Change Password</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Current Password"
          type="password"
          name="confirmPassword"
          errorText={errors.currentPassword}
          onChange={onChange}
          value={password.currentPassword}
          fullWidth={true}
        />
      </div>
      <div className="field-line">
        <TextField
          floatingLabelText="New Password"
          type="password"
          name="newPassword"
          errorText={errors.newPassword}
          onChange={onChange}
          value={password.newPassword}
          fullWidth={true}
        />
      </div>
      <div className="field-line">
        <TextField
          floatingLabelText="Repeat Password"
          type="password"
          name="confirmNewPassword"
          errorText={errors.confirmNewPassword}
          onChange={onChange}
          value={password.confirmNewPassword}
          fullWidth={true}
        />
      </div>

      <div className="button-line pull-right">
        <RaisedButton type="submit" label="Change Password"/>
      </div>

      <CardText>*New Password Must Be Atleast {'6'} Characters Long.</CardText>
    </form>
  </Card>
);

ProfileUpdatePasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
};

export default ProfileUpdatePasswordForm;
