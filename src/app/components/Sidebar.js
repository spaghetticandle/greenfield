import React from 'react';
import Auth from './Auth';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

export class Sidebar extends React.Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout(event){
    event.preventDefault();
    Auth.deauthenticateUser();
    this.context.transitionTo('/');
  }
  render() {
    return (
      <div className="container">
        {Auth.isUserAuthenticated() ? (
        <div className="authSidebar">
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
            </div>
          </div> 
        </div> ) : (' ')}
        <div className="row">
          {Auth.isUserAuthenticated() ? (<a href="#" onClick={this.handleLogout}>Log Out</a>) :
          (<NavLink to="/loginform">Login</NavLink>) }
        </div>
        <div className="row">
          {Auth.isUserAuthenticated() ? (' ') : (<NavLink to="/signup">Sign Up</NavLink>)}
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {

};