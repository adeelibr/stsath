import React, { PropTypes } from 'react';

import {
  BarChart,
  Bar, Brush,
  ReferenceLine,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip, Legend
} from 'recharts';

const CustomTooltip = React.createClass({
  propTypes: { payload: PropTypes.array, },
  render() {
    const { active } = this.props;
    if (active) {
      const { payload } = this.props;
      console.log(payload);
      return (
        <div className="custom-tooltip">
          <p className="label">{`Words Matched : ${payload[0].payload.wordsCount}`}</p>
          <p className="intro">{`Tweet : ${payload[0].payload.text}`}</p>
          <p className="desc">{`Score : ${payload[0].payload.score}`}</p>
          <p className="desc">{`Comparative : ${payload[0].payload.comparative}`}</p>
          <p className="desc">{`Total Positive Words : ${payload[0].payload.positiveWordsCount}`}</p>
          <p className="desc">{`Total Negative Words : ${payload[0].payload.negativeWordsCount}`}</p>
        </div>
      );
    }
    return null;
  }
});

const ReportGenerateInfographicMainChart = ({ data }) => {

  return (
    <div className="center-block">
        <BarChart width={900} height={300} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis/>
         <YAxis/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip content={<CustomTooltip />}/>
         <Legend verticalAlign="top" wrapperStyle={{lineHeight: '40px'}}/>
         <ReferenceLine y={0} stroke='#000'/>
         <Brush dataKey='id' height={30} stroke="#8884d8"/>
         <Bar dataKey="score" fill="#8884d8" />
         <Bar dataKey="comparative" fill="#82ca9d" />
         <Bar dataKey="positiveWordsCount" fill="#8e2485" />
         <Bar dataKey="negativeWordsCount" fill="#d42c10" />
        </BarChart>
      </div>
  );
}

ReportGenerateInfographicMainChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ReportGenerateInfographicMainChart;
