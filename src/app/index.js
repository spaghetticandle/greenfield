import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { Sidebar } from './components/Sidebar';
import { Settings } from './components/Settings';
import { Personality } from './components/Personality';
import { Moods } from './components/Moods';
import { NewEntry } from './components/NewEntry';
import { Diary } from './components/Diary';
import { SignUp } from './components/SignUp'

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="main" className="col-xl-10 col-lg-10 col-md-9 col-sm-9">
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/settings" component={Settings} />
              <Route path="/personality" component={Personality} />
              <Route path="/moods" component={Moods} />
              <Route path="/newentry" component={NewEntry} />
              <Route path="/diary" component={Diary} />
              <Route path="/loginform" component={Login} />
              <Route path="/signup" component={SignUp} />
            </Switch>
          </div>
          <div className="sidebar" className="col-xl-2 col-lg-2 col-md-3 col-sm-3">
            <Sidebar />
          </div>
        </div>
      </div>
    );
  }
}

render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'));

//render(<App/>, window.document.getElementById('app'));