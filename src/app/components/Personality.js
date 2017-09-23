import React from 'react';
import axios from 'axios';

export class Personality extends React.Component {
  constructor(props) {
    super(props);
    this.state = { params: {},
  personality: {} };
  }
  componentDidMount() {
    axios.get('api/diary').then(result => {
      const entries = result.data.map(entry => {
        return entry.post;
      }).join(' ');
      const params = {
        text: entries,
        consumption_preferences: true,
        raw_scores: true,
        headers: {
          'accept-language': 'en',
          'accept': 'application/json'
        }
      }
      this.setState({params: params});
      axios.post('api/personality', this.state.params).
        then(response => {
          this.setState({personality: response.data});
          console.log(this.state.personality);
        }).catch(error => {
          console.log(error);
        });
    });
  }
  render() {
    return (
      <div className="mainContainer">
        <div className="header">
          <h1>Personality Profile</h1>
        </div>
        <div className="mainBody">
          {JSON.stringify(this.state.personality)}
        </div>
      </div>
    );
  }
}