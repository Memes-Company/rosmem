import './App.css';

import React from 'react';
import { GithubService } from './github-service';

const App: React.FC = () => {
  const authLink = "https://github.com/login/oauth/authorize?client_id=ba97c6160162014cccdc&scope=user%20repo";
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  //TODO: need to save it into Context or any another place but NOT into the localstorage
  return (
    <div className="App">
      <header className="App-header">
        {code ? (
          <>
            <p> Yor Github code is {code}</p>
            <button onClick={() => GithubService.createFork(code, 'kosachemoto', 'test-readme-repo')}>Create a fork</button>
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
