import React from 'react';
import {Link} from 'react-router-dom';

export class Sidebar extends React.Component {
  render() {
    return(
      <div className="container">
        <div className="row">
          <a href="#">Dashboard</a>
        </div>
        <div className="row">
          <Link to="/settings">Settings</Link>
        </div>
        <div className="row">
          Your Data
          <div className="container">
            <div className="row">
              <Link to="/personality">Personality Profile</Link>
            </div>
            <div className="row">
              <Link to="/moods">Moods</Link>
            </div>
            </div>
        </div>
        <div className="row">
          Diary
          <div className="container">
            <div className="row">
              <Link to="/newentry">New Diary Entry</Link>
            </div>
            <div className="row">
              <Link to="/diary">Your Diary</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {

};