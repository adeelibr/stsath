import React, { PropTypes } from 'react';
// import { Link } from 'react-router';

import SearchIcon from 'material-ui/svg-icons/action/youtube-searched-for';

import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const ChoiceForm = ({ onSubmit, onChange, errors, words }) => (
  <Card className="form">
    <form action="/" onSubmit={onSubmit}>
      <h3><SearchIcon /> Perfom Sentiment On Two Choices</h3>
      <div className="row">
        <div className="col-md-5 col-sm-4">
          <TextField
            floatingLabelText="Enter Word No# 1"
            name="word1"
            onChange={onChange}
            value={words.word1}
            errorText={errors.word1}
            fullWidth={true}
          />
        </div>
        <div className="col-md-5 col-sm-4">
          <TextField
            floatingLabelText="Enter Word No# 2"
            name="word2"
            onChange={onChange}
            value={words.word2}
            errorText={errors.word2}
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

ChoiceForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  words: PropTypes.object.isRequired
};

export default ChoiceForm;
