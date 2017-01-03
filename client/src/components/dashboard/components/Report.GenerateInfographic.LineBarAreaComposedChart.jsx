import React, { PropTypes } from 'react';

import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
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

const LineBarAreaComposedChart = ({ data }) => {

  return (
    <div className="line-bar-area-composed-chart">
      <ComposedChart width={550} height={400} data={data} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
        <XAxis />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend/>
        <CartesianGrid stroke='#f5f5f5'/>
        <Area type='monotone' dataKey='wordsCount' fill='#8884d8' stroke='#8884d8'/>
        <Bar dataKey='positiveWordsCount' barSize={20} fill='#413ea0'/>
        <Line type='monotone' dataKey='negativeWordsCount' stroke='#ff7300'/>
      </ComposedChart>
    </div>
  );
}

LineBarAreaComposedChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default LineBarAreaComposedChart;
