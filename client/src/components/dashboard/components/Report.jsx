import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import ReportGenerateTweets from './Report.GenerateTweets';

const Report = ({ show, data }) => {

  var style = {
    display: show ? 'block' : 'none'
  };

  let renderReport = () => {
    return (
      <Card style={style} className="report">
        <CardHeader
          title="Report"
          subtitle="Detailed Anaylysis"
          />
        <CardTitle title="Report" subtitle="Detailed Anaylysis" />
        <CardText>
          Disclaimer: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardText><b>Word Typed:</b> {data.word} <b>Average Score:</b> {data.avgerageScore}</CardText>
        {data.success && <ReportGenerateTweets tweets={data.data} />}
        <CardActions>
          <FlatButton label="Export As PDF" />
        </CardActions>
      </Card>
    );
  }

  return show ? renderReport() : <div></div>;
}

Report.propTypes = {
  show: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired
};

export default Report;
