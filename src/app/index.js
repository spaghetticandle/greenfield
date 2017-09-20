import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';

import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Settings } from './components/Settings';
import { Personality } from './components/Personality';
import { Moods } from './components/Moods';
import { NewEntry } from './components/NewEntry';
import { Diary } from './components/Diary';
import { Login } from './components/Login';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Route path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
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