import React, { Component } from 'react';
import moment from 'moment'

import FeedbackAPI from 'FeedbackAPI';

export default  class AdminViewFeedbackPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      feedbacks: {}
    };
  }

  componentDidMount () {
    FeedbackAPI.getAllFeedbacks()
      .then((res) => {
        if (res.success) { this.setState({ feedbacks: res.feedbacks }); }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render () {
    let {feedbacks} = this.state;

    let renderEmptyRow = () => {
      return (
        <tr className="active text-center">
          <td colSpan="10">No Feedbacks Added By Users. :(</td>
        </tr>
      );
    };

    let renderFeedbacks = () => {
      return feedbacks.map((feedback, i) => {
        return (
          <tr key={i}>
            <td>{feedback.id}</td>
            <td>{feedback.person_name}</td>
            <td>{feedback.rating}</td>
            <td>{feedback.review}</td>
            <td>{feedback.siteUseful}</td>
            <td>{feedback.siteDesign}</td>
            <td>{feedback.siteRecommend}</td>
            <td>{feedback.competitors ? feedback.competitors : 'None'}</td>
            <td>{moment(feedback.createdAt).format('MM/DD/YYYY')}</td>
            <td>[More Details] [Archive] [Delete]</td>
          </tr>
        )
      });
    };

    return (
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Person Name</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Site Usefulness</th>
              <th>Site Design</th>
              <th>Site Recommend</th>
              <th>Any Competitors</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length > 0 ? renderFeedbacks() : renderEmptyRow() }
          </tbody>
        </table>
      </div>
    );
  }

};
