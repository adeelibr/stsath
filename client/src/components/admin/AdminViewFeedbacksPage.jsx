import React, { Component } from 'react';
import moment from 'moment'

import FeedbackAPI from 'FeedbackAPI';

import {Dialog, FlatButton, IconButton} from 'material-ui';

import FingerprintIcon from 'material-ui/svg-icons/action/fingerprint';
import ArchiveIcon from 'material-ui/svg-icons/content/archive';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

let styles = {
  icon: {
    // top: 0,
    marginTop: -24, marginBottom: -24, marginLeft: 2, marginRight: 2,
    padding: 0,
    heigth: 24,
    width: 24,
  }
}

export default  class AdminViewFeedbackPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      feedbacks: {},
      deleteDialogOpen: false,
    };
  }

  handleDeleteDialogOpen = () => { this.setState({deleteDialogOpen: true}); };

  handleDeleteDialogClose = () => { this.setState({deleteDialogOpen: false}); };

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
          <tr key={i} className="text-lowercase">
            <td>{feedback.id}</td>
            <td>{feedback.person_name}</td>
            <td>{feedback.rating}</td>
            <td>{feedback.review}</td>
            <td>{feedback.siteUseful}</td>
            <td>{feedback.siteDesign}</td>
            <td>{feedback.siteRecommend}</td>
            <td>{feedback.competitors ? feedback.competitors : 'None'}</td>
            <td>{moment(feedback.createdAt).format('MM/DD/YYYY')}</td>
            <td>
              <IconButton touch={true} style={styles.icon}>
                <FingerprintIcon />
              </IconButton>
              <IconButton touch={true} style={styles.icon}>
                <ArchiveIcon />
              </IconButton>
              <IconButton touch={true} style={styles.icon} onClick={this.handleDeleteDialogOpen}>
                <DeleteIcon />
              </IconButton>
            </td>
          </tr>
        )
      });
    };

    let renderDeleteDialog = () => {
      const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleDeleteDialogClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onTouchTap={this.handleDeleteDialogClose}
      />,
    ];
      return (
        <Dialog
            title="Delete"
            actions={actions}
            modal={true}
            open={this.state.deleteDialogOpen}
          >
            Are You Sure You Want To Delete This Feedback ?
        </Dialog>
      );
    };

    return (
      <div>
        <div className="table-responsive">
          <table className="table table-hover table-striped">
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
        {renderDeleteDialog()}
      </div>
    );
  }

};
