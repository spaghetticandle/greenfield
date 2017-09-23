import React from 'react';
import axios from 'axios';

export class NewEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {entry: ''};
  }
  handleEntryChange(event) {
    this.setState({entry: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    const params = {text: this.state.entry};
    axios.post('api/newentry', params).
    then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }
  render() {
    return (
      <div className="mainContainer">
        <div className="header">
          <h1>New Diary Entry</h1>
        </div>
        <div className="mainBody">
          <form>
            <label htmlFor="newDiaryEntry">Your New Diary Entry:</label>
            <textarea className="form-control" id="newDiaryEntry" onChange={this.handleEntryChange.bind(this)}></textarea>
            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}