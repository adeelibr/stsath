import React, { PropTypes } from 'react';
// import { Link } from 'react-router';

import SearchIcon from 'material-ui/svg-icons/action/youtube-searched-for';

import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const SearchForm = ({ onSubmit, onChange, errors, word }) => (
  <Card className="form">
    <form action="/" onSubmit={onSubmit}>
      <h3><SearchIcon /> Search</h3>
      <div className="row">
        <div className="col-md-10 col-sm-8">
          <TextField
            floatingLabelText="Search Tweets & Hashtags"
            name="search"
            onChange={onChange}
            errorText={errors.word}
            value={word}
            fullWidth={true}
          />
        </div>
        <div className="col-md-2 col-sm-4">
          <RaisedButton
            type="submit"
            label="Perform Sentiment"
            className="inline-form-button"
            primary={true}
            fullWidth={true}
          />
        </div>
      </div>
    </form>
  </Card>
);

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  word: PropTypes.string.isRequired
};

export default SearchForm;
