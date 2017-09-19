import React from 'react';
import ToneAnalyzerV3 from 'watson-developer-cloud/tone-analyzer/v3';

/*
const tone_analyzer = new ToneAnalyzerV3({
  username: '{username}',
  password: '{password}',
  version_date: '{version}'
  headers: {
    'X-Watson-Learning-Opt-Out': 'true'
  }
});

const params = {
  body: (input);
}

tone_analyzer.tone(params, function(error, response) {
  if (error)
    console.log('error:', error);
  else
    console.log(JSON.stringify(response, null, 2));
  }
);
*/

// Use the POST endpoint with plain text
// Params needed: Body Body, Header Content-Type (text/plain)
// URL: https://gateway.watsonplatform.net/tone-analyzer/api/v3/

/*
fetch("https://watson-api-explorer.mybluemix.net/tone-analyzer/api/v3/tone?sentences=false&version=2016-05-19", {
  body: (input),
  headers: {
    Accept: 'application/json',
    "Content-Type": 'text/plain'
  },
  method: 'POST'
});
*/

export class NewEntry extends React.Component {
  render() {
    return (
      <div className="mainContainer">
        <div className="header">
          <h1>New Diary Entry</h1>
        </div>
        <div className="mainBody">
          <form>
            <label for="newDiaryEntry">Your New Diary Entry:</label>
            <textarea className="form-control" id="newDiaryEntry"></textarea>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}