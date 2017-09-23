import React from 'react';
import axios from 'axios';

const BarChart = require('react-d3-components').BarChart;

export class Personality extends React.Component {
  constructor(props) {
    super(props);
    this.state = { personality: {}
    // params: {}
    // personality: {} 
    };
  }
  componentDidMount() {
    axios.get('api/personality_analysis').then(result => {
      this.setState({ personality: result.data });
    });

    // Actual request not using fake data
    // axios.get('api/diary').then(result => {
    //   const entries = result.data.map(entry => {
    //     return entry.post;
    //   }).join(' ');
    //   const params = {
    //     text: entries,
    //     consumption_preferences: true,
    //     raw_scores: true,
    //     headers: {
    //       'accept-language': 'en',
    //       'accept': 'application/json'
    //     }
    //   }
    //   this.setState({params: params});
    //   axios.post('api/personality', this.state.params).
    //     then(response => {
    //       this.setState({personality: response.data});
    //       console.log(this.state.personality);
    //     }).catch(error => {
    //       console.log(error);
    //     });
    // });
  }
  render() {
    const chartData = [{
      label: 'Personality Profile',
      values: [
        {x: 'Openness', y: 0.9665868393457593 * 100},
        {x: 'Conscientiousness', y: 0.027650414904379916 * 100},
        {x: 'Extraversion', y: 0.3273222739414172 * 100},
        {x: 'Agreeableness', y: 0.7287197035708 * 100},
        {x: 'Emotional Range', y: 0.14439533987606717 * 100}
      ]
    }]
    return (
      <div className="mainContainer">
        <div className="header">
          <h1>Personality Profile</h1>
        </div>
        <div className="mainBody">
          <div className="personalityChart">
            <BarChart data={chartData} width={900} height={400} margin={{ top: 10, bottom: 50, left: 50, right: 10 }} />
          </div>
        </div>
      </div>
    );
  }
}