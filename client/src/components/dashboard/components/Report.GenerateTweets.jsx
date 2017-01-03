import React, { PropTypes } from 'react';

import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

const ReportGenerateTweets = ({ tweets }) => {
  // console.log(tweets);

  let renderArray = (list) => {
    if (list.length === 0) {
      return (<span> -- </span>);
    }
    return list.map((item, i) => {
      if (i !== "") {
        return (<span key={i}>{item} ,</span>);
      } else if (i === list.length) {
        return (<span key={i}>{item}</span>);
      }
    });
  };

  let renderTweetList = () => {
    return tweets.map((obj, i) => {
      return (
        <div className="row" key={i}>
          <div className="col-md-6 col-sm-6">
            <h4>Tweet:</h4>
            <List>
              <ListItem
                leftAvatar={<Avatar src={obj.tweet.user.profile_image_url} />}
                primaryText={obj.tweet.user.name}
              />
            </List>
            <p><b>Tweet:</b> {obj.tweet.text}</p>
            <p><b>Status Posted At:</b> {obj.tweet.created_at}</p>
            <p><b>User Since:</b> {obj.tweet.user.created_at}</p>
          </div>
          <div className="col-md-6 col-sm-6">
            <h4>Analyze:</h4>
            <table className="table table-hover">
              <tbody>
                <tr>
                  <td scope="row">Score</td>
                  <td>{obj.sentiment.score}</td>
                </tr>
                <tr>
                  <td scope="row">Comparative</td>
                  <td>{obj.sentiment.comparative}</td>
                </tr>
                <tr>
                  <td scope="row">Tokens</td>
                  <td>{renderArray(obj.sentiment.tokens)}</td>
                </tr>
                <tr>
                  <td scope="row">Words</td>
                  <td>{renderArray(obj.sentiment.words)}</td>
                </tr>
                <tr>
                  <td scope="row">Negative Words</td>
                  <td>{renderArray(obj.sentiment.negative)}</td>
                </tr>
                <tr>
                  <td scope="row">Positive Words</td>
                  <td>{renderArray(obj.sentiment.positive)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Divider inset={true} />
        </div>
      );
    });
  };

  return (
    <div className="reports-tweets-container">
      {renderTweetList()}
    </div>
  );
}

ReportGenerateTweets.propTypes = {
  data: PropTypes.object
};

export default ReportGenerateTweets;
