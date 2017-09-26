import React from 'react';
import axios from 'axios';
const PieChart = require('react-d3-components').PieChart;

export class Moods extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chartData: null }
  }
  componentDidMount() {
    axios.get('api/diary').then(result => {
      let moodCount = {};
      result.data.map(entry => {
        const moodData = entry.mood.document_tone.tone_categories[0].tones;
        const mood = moodData.reduce((seed, current) => {
          if (current.score > seed.score) {
            return current;
          } else {
            return seed;
          }
        });
        if (moodCount[mood.tone_name]) {
          moodCount[mood.tone_name] += 1;
        } else {
          moodCount[mood.tone_name] = 1;
        }
      });
      let chartData = {
        label: 'Overall Moods',
        values: []
      };
      for (let key in moodCount) {
        let value = {};
        value.x = key;
        value.y = moodCount[key];
        chartData.values.push(value);
      }
      this.setState({ chartData });
    }).catch(error => {
      console.log(error);
    });
  }
  render() {
    return (
      <div className="mainContainer">
        <div className="header">
          <h1>Moods</h1>
        </div>
        <div className="mainBody">
          <div className="moodChart">
            {this.state.chartData && <PieChart
              data={this.state.chartData}
              width={600}
              height={400}
              margin={{ top: 10, bottom: 10, left: 100, right: 100 }}
            />}
          </div>
        </div>
      </div>
    );
  }
}