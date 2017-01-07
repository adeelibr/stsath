import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';

import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

const FeedbackForm = ({
  onSubmit,
  onChange,
  onChangeRating,
  errors,
  feedback
}) => (
  <Card className="form">
    <form action="/" onSubmit={onSubmit}>
      <h2>Feedback</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Your Name"
          type="text"
          name="person_name"
          errorText={errors.person_name}
          onChange={onChange}
          value={feedback.person_name}
          fullWidth={true}
        />
      </div>
      <div className="field-line">
        <TextField
          hintText="Your Valuable Review"
          floatingLabelText="Review"
          multiLine={true}
          rows={2}
          type="text"
          name="review"
          errorText={errors.review}
          onChange={onChange}
          value={feedback.review}
          fullWidth={true}
        />
      </div>
      <div className="row field-line slider-no-bottom-extra-space">
        <div className="col-md-2 col-sm-2 col-xs-4">
          <p className="input-field-name">Rate Us Out Of {'10'}!</p>
        </div>
        <div className="col-md-9 col-sm-9 col-xs-7">
          <Slider
            min={1}
            max={10}
            step={1}
            defaultValue={2}
            value={feedback.rating}
            onChange={onChangeRating}
            style={{ marginBottom: 0, paddingBottom: 0 }}
          />
        </div>
        <div className="col-md-1 col-sm-1 col-xs-1">
          <p className="input-field-name">[{feedback.rating}]</p>
        </div>
      </div>
      <div className="field-line">
        <p className="input-field-name">Were you able to find the information you were looking for on our website{'?'}</p>
        <RadioButtonGroup name="siteUseful" defaultSelected="not_much" onChange={onChange}>
          <RadioButton
            value="no"
            label="No"
            style={styles.radioButton}
          />
          <RadioButton
            value="not_much"
            label="Not Much"
            style={styles.radioButton}
          />
          <RadioButton
            value="yes"
            label="Yes"
            style={styles.radioButton}
          />
          <RadioButton
            value="very_much"
            label="Very Much"
            checkedIcon={<ActionFavorite />}
            uncheckedIcon={<ActionFavoriteBorder />}
            style={styles.radioButton}
          />
        </RadioButtonGroup>
      </div>
      <div className="field-line">
        <p className="input-field-name">How visually appealing is our website{'?'}</p>
          <RadioButtonGroup name="siteDesign" defaultSelected="not_much" onChange={onChange}>
            <RadioButton
              value="not_much"
              label="Not Much"
              style={styles.radioButton}
            />
            <RadioButton
              value="just_okay"
              label="Just Okay"
              style={styles.radioButton}
            />
            <RadioButton
              value="very_much"
              label="I Like It Very Much"
              checkedIcon={<ActionFavorite />}
              uncheckedIcon={<ActionFavoriteBorder />}
              style={styles.radioButton}
            />
          </RadioButtonGroup>
      </div>
      <div className="field-line">
        <p className="input-field-name">How likely is it that you would recommend
          this company to a friend or colleague{'?'}</p>
        <RadioButtonGroup name="siteRecommend" defaultSelected="not_much" onChange={onChange}>
            <RadioButton
              value="not_much"
              label="Not Much"
              style={styles.radioButton}
            />
            <RadioButton
              value="a_bit"
              label="A Bit"
              style={styles.radioButton}
            />
            <RadioButton
              value="very_much"
              label="I Will Tell It To The Whole World"
              checkedIcon={<ActionFavorite />}
              uncheckedIcon={<ActionFavoriteBorder />}
              style={styles.radioButton}
            />
          </RadioButtonGroup>
      </div>
      <div className="field-line">
        <TextField
          hintText={"Who can we learn from? (Any Competition)"}
          floatingLabelText="Any Competitors Of Our"
          type="text"
          name="competitors"
          errorText={errors.competitors}
          onChange={onChange}
          value={feedback.competitors}
          fullWidth={true}
        />
      </div>
      <div className="button-line">
        <RaisedButton type="submit" label="Submit Feedback"/>
      </div>
    </form>
  </Card>
);

FeedbackForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  feedback: PropTypes.object.isRequired
};

export default FeedbackForm;
