import React from 'react';

export class NewEntry extends React.Component {
  render() {
    return (
      <div className="mainContainer">
        <div className="header">
          <h1>New Diary Entry</h1>
        </div>
        <div className="mainBody">
          <form>
            <label for="newDiaryEntry">Your New Diary Entry:</label>
            <textarea className="form-control" id="newDiaryEntry"></textarea>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}