import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

import UserAPI from 'UserAPI';
import FeedbackAPI from 'FeedbackAPI';
import { RemoveToken } from 'Auth';
import FeedbackForm from './components/FeedbackForm';

class DashboardUserFeedback extends Component {

  constructor (props) {
    super(props);
    this.state = {
      errors: {},
      user: {},
      feedback: {
        person_name: '',
        review: '',
        rating: 1,
        siteUseful: 'not_much',
        siteDesign: 'not_much',
        siteRecommend: 'not_much',
        competitors: ''
      },
      snackbar: { autoHideDuration: 4000, message: 'Feedback Provided, Thankyou', open: false }
    }
  }

  componentDidMount () {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      this.setState({ user: userInfo.user });
    } else {
      RemoveToken();
      router.push('/login');
    }
  }

  onSubmitForm = (e) => {
    let { feedback, user, errors } = this.state;
    e.preventDefault();

    FeedbackAPI
      .addFeedback(user.id, feedback)
      .then((res) =>{
        if (!res.success) {
          const errors = res.errors ? res.errors : {};
          errors.summary = res.message;
          this.setState({ errors });
        } else {
          let snackbar = this.state.snackbar;
          snackbar.open = true;
          this.setState({ errors: {}, snackbar });
        }
      });
  }

  changeFeedbackInputField = (e) => {
    const field = e.target.name;
    const feedback = this.state.feedback;
    feedback[field] = e.target.value;
    this.setState({ feedback });
  }

  onChangeRatingSlider = (e, value) => {
    const feedback = this.state.feedback;
    feedback.rating = value;
    this.setState({ feedback });
  }

  handleActionTouchTap = () => {
    let snackbar = this.state.snackbar;
    snackbar.open = false;
    this.setState({ snackbar });
  }

  render () {
    let { errors, feedback } = this.state;
    let { open, message, autoHideDuration } = this.state.snackbar;

    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <FeedbackForm
            onSubmit={this.onSubmitForm}
            onChange={this.changeFeedbackInputField}
            onChangeRating={this.onChangeRatingSlider}
            errors={errors}
            feedback={feedback}
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

export default DashboardUserFeedback;
