import React from 'react';
import axios from 'axios';

export class Diary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { diary: [] };
  }
  componentDidMount() {
    axios.get('api/diary').then(result => {
      this.setState({ diary: result.data });
      this.state.diary.map(entry => {
        const moodData = entry.mood.document_tone.tone_categories[0].tones;
        const mood = moodData.reduce((seed, current) => {
          if (current.score > seed.score) {
            return current;
          } else {
            return seed;
          }
        });
        entry.moodName = mood.tone_name;
        entry.moodClass = mood.tone_id;
      });
      this.setState({diary: this.state.diary});
    });
  }
  render() {
    return (
      <div className="mainContainer">
        <div className="header">
          <h1>Your Diary</h1>
        </div>
        <div className="body">
          {this.state.diary.map(entry => {
            return (
              <div key={entry.postid} className={`entry ${entry.moodClass}`}>
                <div className="entryDate">
                  <h5>{entry.date}</h5>
                </div>
                <div className="entryText">
                  {entry.post}
                </div>
                <div className="entryData">
                  <b>Mood</b>: {entry.moodName}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}