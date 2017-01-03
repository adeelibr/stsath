import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import ReportGenerateTweets from './Report.GenerateTweets';
import ReportGenerateInfographic from './Report.GenerateInfographic';

const Report = ({ show, data }) => {

  var style = {
    display: show ? 'block' : 'none'
  };

  let SentimentData = show ? data.data.map(function(a) { return a.sentiment; }) : [];

  let renderReport = () => {
    return (
      <Card style={style} className="report">
        <CardHeader
          title="Report"
          subtitle="Detailed Anaylysis"
          />
        <CardText>
          <b>Disclaimer:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardText><b>Word Typed:</b> {data.word} <b>Average Score:</b> {data.avgerageScore}</CardText>

        {data.success && <ReportGenerateInfographic tweets={data.data} SentimentData={SentimentData} infographic={data.infographic} />}
        {data.success && <ReportGenerateTweets tweets={data.data} />}

        <CardActions>
          <FlatButton label="Let's Start Over" />
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
