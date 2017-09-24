import React from 'react';
import axios from 'axios';
const BarChart = require('react-d3-components').BarChart;
export class Personality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personality: null,
      chartData: null
      // params: {}
      // personality: {} 
    };
  }
  componentDidMount() {
    axios.get('api/personality_analysis').then(result => {
      const personality = result.data;
      debugger;
      this.setState({ personality });
      const graphMap = this.state.personality.personality.map(trait => {
        return { x: trait.name, y: trait.percentile * 100 };
      });
      const chartData = [{
        label: 'Personality Profile',
        values: []
      }]
      chartData[0].values = graphMap;
      this.setState({ chartData });
    }).catch(error => {
      console.log(error);
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
  // componentDidUpdate() {
  //   console.log(this.state);
  //   this.renderGraph();
  // }
  // renderGraph() {
  //   return (
  //     <div>
  //     <p>test</p>
  //     {this.state.chatData && <BarChart data={this.state.chartData} width={900} height={400} margin={{ top: 10, bottom: 50, left: 50, right: 10 }} />}
  //     </div>
  //   )
  // }
  render() {
    return (
      <div className="mainContainer">
        <div className="header">
          <h1>Personality Profile</h1>
        </div>
        <div className="mainBody">
          <div className="personalityChart">
            {this.state.chartData && <BarChart data={this.state.chartData} width={900} height={400} margin={{ top: 10, bottom: 50, left: 50, right: 10 }} />}
          </div>
        </div>
      </div>
    );
  }
}