import './App.css';

import React from 'react';

import { GithubService } from './github/github-service';
import { Fork } from './github/types';

const store: any = {}
const authLink = GithubService.getAuthLink();
const handlers = {
  authorize: () => window.location.href = authLink,
  createFork: async () => {
    GithubService.createFork('kosachemoto/test-readme-repo')
      .then(fork => store.fork = fork)
  },

  createTextBlob: async () => {
    const input = document.getElementById('text_blob') as HTMLInputElement
    if (input) {
      GithubService.addTextToIndex((store.fork as Fork).full_name, input.value, 'textfile.txt');
    }
  },

  openDialog: () => {
    const input = document.getElementById('file_blob') as HTMLInputElement
    if (input) {
      input.click();
    }
  },

  createFileBlob: async () => {
    const input = document.getElementById('file_blob') as HTMLInputElement
    if (input && input.files) {
      GithubService.addFileToIndex((store.fork as Fork).full_name, input.files[0]);
    }
  },

  createCommit: async () => {
    GithubService.commitIndex('Test commit', (store.fork as Fork).full_name).then(commit => {
      const link = window.open(commit.html_url, '_blank');
      link && link.focus()
    }
    )
  }
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
        <button type="button" className="nes-btn is-primary" onClick={handlers.createFork}>Create a fork</button>
        <div>
          <div className="nes-field">
            <input id="text_blob" type="text" className="nes-input" placeholder="Text blob" />
          </div>
          <button type="button" className="nes-btn is-primary" onClick={handlers.createTextBlob}>Create text blob</button>
        </div>
        <input id="file_blob" type="file" onChange={handlers.createFileBlob} />
        <button type="button" className="nes-btn is-primary" onClick={(handlers.openDialog)}>Create file blob</button>
        <button type="button" className="nes-btn is-primary" onClick={(handlers.createCommit)}>Create commit with two files</button>
      </header>
    </div>
  );
}

export default App;
