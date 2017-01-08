import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import ReportGenerateTweets from './Report.GenerateTweets';
// import ReportGenerateInfographic from './Report.GenerateInfographic';

var jsPDF = require('jspdf');
require('jspdf-autotable');


const Report = ({ show, data, clearForm, section }) => {

  let tweets = [];
  if (show && (section === 1)) { tweets = data.choiceOneTweets }
  else if (show && (section === 2)) { tweets = data.choiceTwoTweets }

  var style = {
    display: show ? 'block' : 'none'
  };

  var columns = [
    {title: "ID", dataKey: "id"},
    {title: "Tweet", dataKey: "text"},
    {title: "Score", dataKey: "score"},
    {title: "Comparative", dataKey: "comparative"},
    {title: "Words Matched", dataKey: "wordsCount"},
    {title: "Positive Words", dataKey: "positiveWordsCount"},
    {title: "Negative Words", dataKey: "negativeWordsCount"}
  ];
  let rows = [];
  if (show && (section === 1)) {
    rows = data.choiceOneTweets.map(function(a, index) {
      let sentimentObj = a.sentiment;
      let s = {
        'id': index,
        'text': sentimentObj.text,
        'score': sentimentObj.score,
        'comparative': sentimentObj.comparative,
        'wordsCount': sentimentObj.wordsCount,
        'positiveWordsCount': sentimentObj.positiveWordsCount,
        'negativeWordsCount': sentimentObj.negativeWordsCount
      };
      return s;
    });
  }
  if (show && (section === 2)) {
    rows = data.choiceOneTweets.map(function(a, index) {
      let sentimentObj = a.sentiment;
      let s = {
        'id': index,
        'text': sentimentObj.text,
        'score': sentimentObj.score,
        'comparative': sentimentObj.comparative,
        'wordsCount': sentimentObj.wordsCount,
        'positiveWordsCount': sentimentObj.positiveWordsCount,
        'negativeWordsCount': sentimentObj.negativeWordsCount
      };
      return s;
    });
  }

  let exportPDF = () => {
    console.log('Export PDF')
    var doc = new jsPDF('p', 'pt');
    doc.text("Sentiment Detailed Analysis", 10, 30);
    doc.autoTable(columns, rows, {
      startY: 40,
      margin: {horizontal: 10},
      styles: {overflow: 'linebreak', columnWidth: 'wrap'},
      columnStyles: {text: {columnWidth: 'auto'}}
    });
    doc.save("report.pdf");
  };

  let renderReport = () => {
    return (
      <Card style={style} className="report" id="report">
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
        {data.success && <ReportGenerateTweets tweets={tweets} />}
        <CardActions>
          <FlatButton label="Let's Start Over" onClick={clearForm} />
          <FlatButton label="Export Report As PDF" onClick={exportPDF} />
        </CardActions>
      </Card>
    );
  }

  return show ? renderReport() : <div></div>;
}

Report.propTypes = {
  show: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  section: PropTypes.number.isRequired,
  clearForm: PropTypes.func.isRequired
};

export default Report;
