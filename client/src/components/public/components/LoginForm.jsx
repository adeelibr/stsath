import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const LoginForm = ({ onSubmit, onChange, errors, user }) => (
  <Card className="login-form">
    <form action="/" onSubmit={onSubmit}>
      <h2>Login Form</h2>

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

      <div className="button-line pull-right">
        <RaisedButton type="submit" label="Log in" />
      </div>

      <CardText>Don't have an account {'?'} <Link to={'/signup'}>Create One</Link>.</CardText>

    </form>
  </Card>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
