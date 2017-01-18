import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment'

import FeedbackAPI from 'FeedbackAPI';

import {Dialog, RaisedButton, FlatButton, IconButton} from 'material-ui';

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
  },
  btn: {
    margin: 12,
  }
}

export default class AdminViewFeedbackPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      feedbacks: {},
      deleteDialogOpen: false,
      detailDialogOpen: false,
      activeButton: true,
      feedbackId: 0,
      user: {},
    };
  }

  componentDidMount () {
    let params = 'visible=1';
    FeedbackAPI.getAllFeedbacks(params)
      .then((res) => {
        if (res.success) { this.setState({ feedbacks: res.feedbacks }); }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDeleteDialogOpen = (id) => {
    this.setState({ feedbackId: id, deleteDialogOpen: true });
  };

  handleDeleteDialogClose = () => { this.setState({deleteDialogOpen: false}); };

  handleDetailDialogOpen = (user) => {
    this.setState({ user: user, detailDialogOpen: true });
  };

  handleDetailDialogClose = () => {
    this.setState({ detailDialogOpen: false });
  };

  archiveFeedbackById = () => {
    let {feedbackId} = this.state;
    let params = 'visible=1';

    FeedbackAPI.deleteFeedbackById(feedbackId)
      .then((res) => {
        if (res.success) {
          // console.log(res);
          return FeedbackAPI.getAllFeedbacks(params);
        } else {
          throw Error('No Such Id Exists');
        }
      })
      .then((res) => {
        if (res.success) {
          this.setState({ deleteDialogOpen: false, feedbacks: res.feedbacks });
        }
      })
      .catch((error) => {
      console.log(error);
    })
  }

  loadFeedbacks = (params) => {
    // let params = 'visible=0';
    FeedbackAPI.getAllFeedbacks(params)
      .then((res) => {
        if (res.success) { this.setState({ feedbacks: res.feedbacks }); }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render () {
    let {feedbacks, user, activeButton} = this.state;

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
              <IconButton
                touch={true} style={styles.icon}
                onClick={() => this.handleDetailDialogOpen(feedback.user)}
              >
                <FingerprintIcon />
              </IconButton>
              <IconButton
                touch={true} style={styles.icon}
                onClick={() => this.handleDeleteDialogOpen(feedback.id)}
              >
                <ArchiveIcon />
              </IconButton>
            </td>
          </tr>
        )
      });
    };

    let renderArchiveDialog = () => {
      const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.handleDeleteDialogClose}
        />,
        <FlatButton
          label="Archive"
          primary={true}
          onTouchTap={this.archiveFeedbackById}
        />,
      ];
      return (
        <Dialog
            title="Archive"
            actions={actions}
            modal={true}
            open={this.state.deleteDialogOpen}
          >
            Are You Sure You Want To Archive This Feedback ?
        </Dialog>
      );
    };

    let renderDetailDialog = () => {
      const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.handleDetailDialogClose}
        />,
      ];
      return (
        <Dialog
            title="Feedback Provided By"
            actions={actions}
            modal={false}
            open={this.state.detailDialogOpen}
            onRequestClose={this.handleDetailDialogClose}
          >
            <div>
              <p>Username: {user.username}</p>
              <p>Name: {user.first_name} {user.last_name}</p>
              <p>Email: {user.email}</p>
            </div>
        </Dialog>
      );
    };

    return (
      <div>
        <section>
          <RaisedButton
            label="Show Active" primary={true} style={styles.btn}
            disabled={activeButton}
            onClick={() => {
              this.setState({ activeButton: !this.state.activeButton })
              this.loadFeedbacks('visible=1')
            }}
          />
          <RaisedButton
            label="Show Archived" primary={true} style={styles.btn}
            disabled={!activeButton}
            onClick={() => {
              this.setState({ activeButton: !this.state.activeButton })
              this.loadFeedbacks('visible=0')
            }}
          />
        </section>
        <h2>{activeButton ? 'Active Feedbacks' : 'Archived Feedbacks'}</h2>
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
        {renderArchiveDialog()}
        {renderDetailDialog()}
      </div>
    );
  }

};
