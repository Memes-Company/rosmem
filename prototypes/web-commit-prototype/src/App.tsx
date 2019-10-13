import './App.css';

import React from 'react';
import { GithubService } from './github-service';

const authLink = GithubService.getAuthLink();
const handlers = {
  authorize: () => window.location.href = authLink,
}
const App: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  if (code) {
    GithubService.setToken(code);
  }
  return (
    <div className="App">
      <header className="App-header">
        <button type="button" className="nes-btn is-primary" onClick={handlers.authorize}>Authorize {
          code && "✔️"
        }</button>
        <button type="button" className="nes-btn is-primary" onClick={() => GithubService.createFork('kosachemoto', 'test-readme-repo')}>Create a fork</button>
      </header>
    </div>
  );
}

export default App;
