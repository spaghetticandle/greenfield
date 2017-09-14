import React from 'react';

export class Sidebar extends React.Component {
  render() {
    return(
      <div className="container">
        <div className="row">
          <a href="#">Dashboard</a>
        </div>
        <div className="row">
          <a href="#">Settings</a>
        </div>
        <div className="row">
          Your Data
          <div className="container">
            <div className="row">
              <a href="#">Personality Profile</a>
            </div>
            <div className="row">
              <a href="#">Moods</a>
            </div>
            </div>
        </div>
        <div className="row">
          Diary
          <div className="container">
            <div className="row">
              <a href="#">New Diary Entry</a>
            </div>
            <div className="row">
              <a href="#">Your Diary</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {

};