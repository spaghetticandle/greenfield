import React from 'react';

export class Dashboard extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="main" className="col-xl-10 col-lg-10 col-md-9 col-sm-9">
          <Route path="/login" component={Login} />
          <Route path="/settings" component={Settings} />
          <Route path="/personality" component={Personality} />
          <Route path="/moods" component={Moods} />
          <Route path="/newentry" component={NewEntry} />
          <Route path="/diary" component={Diary} />
        </div>
        <div className="sidebar" className="col-xl-2 col-lg-2 col-md-3 col-sm-3">
          <Sidebar />
        </div>
      </div>
    );
  }
}