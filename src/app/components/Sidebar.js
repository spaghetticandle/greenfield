import React from 'react';
import { NavLink } from 'react-router-dom';

export class Sidebar extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <NavLink to="/dashboard">Dashboard</NavLink>
        </div>
        <div className="row">
          <NavLink to="/settings">Settings</NavLink>
        </div>
        <div className="row">
          Your Data
          <div className="container">
            <div className="row">
              <NavLink to="/personality">Personality Profile</NavLink>
            </div>
            <div className="row">
              <NavLink to="/moods">Moods</NavLink>
            </div>
          </div>
        </div>
        <div className="row">
          Diary
          <div className="container">
            <div className="row">
              <NavLink to="/newentry">New Diary Entry</NavLink>
            </div>
            <div className="row">
              <NavLink to="/diary">Your Diary</NavLink>
            </div>
            <div className="row">
              <NavLink to="/login">Login</NavLink>
            </div>
            <div className="row">
              <NavLink to="/signup">Sign Up</NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {

};