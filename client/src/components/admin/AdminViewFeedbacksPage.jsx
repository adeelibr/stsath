import React, { Component } from 'react';

export default  class AdminViewFeedbackPage extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Person Name</th>
              <th>Ratine</th>
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
            <tr>
              <td>Id</td>
              <td>Person Name</td>
              <td>Review</td>
              <td>Rating</td>
              <td>Site Usefulness</td>
              <td>Site Design</td>
              <td>Recommendation</td>
              <td>Any Competitors</td>
              <td>Created At</td>
              <td>[More Details] [Archive] [Delete]</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

};
