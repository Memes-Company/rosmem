import './App.css';

import React from 'react';
import { GithubService } from './github-service';

const App: React.FC = () => {
  const authLink = GithubService.getAuthLink();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  if (code) {
    GithubService.setToken(code);
  }
  return (
    <div className="App">
      <header className="App-header">
        {code ? (
          <>
            <p> Yor Github code is {code}</p>
            <button onClick={() => GithubService.createFork('kosachemoto', 'test-readme-repo')}>Create a fork</button>
          </>
        ) :
          (
            <p>You have no Github code. Click <a href={authLink}>Authorize</a> to get one</p>
          )
        }
      </header>
    </div>
  );
}

export default App;
