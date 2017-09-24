import React from 'react';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      user: {
        username: '',
        password: ''
      }
    }
    this.processForm = this.processForm.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }
  changeUsername(event) {
    const user = this.state.user;
    user.username = event.target.value;
    this.setState({ user });
  }
  changePassword(event) {
    const user = this.state.user;
    user.password = event.target.value;
    this.setState({ user });
  }
  // Process the form
  processForm(event) {
    event.preventDefault();
    console.log('name', this.state.user.username);
    console.log('password', this.state.user.password);
  }
  render() {
    return (
      <div className="mainContainer">
        <div className="header">
          <h1>Log In</h1>
        </div>
        <div className="mainBody">
          <div className="loginForm">
            <form onSubmit={this.processForm}>
              <div className="form-group">
                <input type="loginUsername" className="form-control" id="loginUsername" placeholder="username" onChange={this.changeUsername}/>
              </div>
              <div className="form-group">
                <input type="loginPassword" className="form-control" id="loginPassword" placeholder="password" onChange={this.changePassword}/>
              </div>
              <button type="submit" className="btn btn-primary">Log In</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}