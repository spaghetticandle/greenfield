import React from 'react';
import { render } from 'react-dom';

import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Settings } from './components/Settings';
import { Personality } from './components/Personality';
import { Moods } from './components/Moods';
import { NewEntry } from './components/NewEntry';
import { Diary } from './components/Diary';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="main" className="col-8">
            Main
          </div>
          <div className="sidebar" className="col-4">
            <Sidebar />
          </div>
        </div>
      </div>
    );
  }
}

render(<App/>, window.document.getElementById('app'));