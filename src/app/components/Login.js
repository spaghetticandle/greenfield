import React from 'react';

export class Login extends React.Component {
  render() {
    return (
      <div className="loginContainer container">
        <div className="row">
          <div className="login col-6">
            <h1>Login</h1>
            <div className="loginForm">
              <form>
                <div className="form-group">
                  <input type="loginUsername" className="form-control" id="loginUsername" placeholder="username" />
                </div>
                <div className="form-group">
                  <input type="loginPassword" className="form-control" id="loginPassword" placeholder="password" />
                </div>
                <button type="submit" className="btn btn-primary">Log In</button>
              </form>
            </div>
          </div>
          <div className="signup col-6">
            <h1>Sign Up</h1>
            <div className="signupForm">
              <form>
                <div className="form-group">
                  <input type="signupUsername" className="form-control" id="signupUsername" placeholder="username" />
                </div>
                <div className="form-group">
                  <input type="signupPassword" className="form-control" id="signupPassword" placeholder="password" />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}