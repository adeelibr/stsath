import React, { PropTypes } from 'react';

import {
  BarChart,
  Bar, Brush,
  ReferenceLine,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip, Legend
} from 'recharts';

import MainChart from './Report.GenerateInfographic.MainChart';
import LineBarAreaComposedChart from './Report.GenerateInfographic.LineBarAreaComposedChart';
import PieChart from './Report.GenerateInfographic.PieChart';

const ReportGenerateInfographic = ({ tweets, SentimentData, infographic }) => {

  let renderWords = (words) => {
    if (words.length !== 0) {
      return words.map((word, i) => <span key={i}>{word} ,</span>);
    } else {
      return (<span></span>);
    }
  };

  return (
    <div className="reports-tweets-container">
      <div className="row">
        <MainChart data={SentimentData} />
      </div>
      <div className="row">
        <div className="col-md-6">
          <LineBarAreaComposedChart data={SentimentData} />
        </div>
        <div className="col-md-6">
          <h3>Total Words Found: {infographic.wordsCount}</h3>
          <h3>Positive Words Found: {infographic.positiveWordsCount}</h3>
          <h3>Positive Words:</h3>
          <p>Positive Words: {renderWords(infographic.positiveWords)}</p>
          <h3>Negative Words Found: {infographic.negativeWordsCount}</h3>
          <p>Negative Words: {renderWords(infographic.negativeWords)}</p>

          <PieChart data={infographic} />
        </div>
      </div>
    </div>
  );
}

ReportGenerateInfographic.propTypes = {
  tweets: PropTypes.array.isRequired,
  SentimentData: PropTypes.array.isRequired,
  infographic: PropTypes.object.isRequired,
};

export default ReportGenerateInfographic;
