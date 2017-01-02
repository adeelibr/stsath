import React, { PropTypes } from 'react';

const ReportGenerateTweets = ({ tweets }) => {
  console.log(tweets);
  return (
    <div className="reports-tweets-container">
      <p>Loading Reports..</p>
    </div>
  );
}

ReportGenerateTweets.propTypes = {
  data: PropTypes.object
};

export default ReportGenerateTweets;
