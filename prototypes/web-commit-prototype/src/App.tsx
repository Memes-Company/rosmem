import './App.css';

import React from 'react';

const App: React.FC = () => {
  const authLink = "https://github.com/login/oauth/authorize?client_id=ba97c6160162014cccdc&scope=user%20repo";
  const urlParams = new URLSearchParams(window.location.search);
  const secret = urlParams.get('code');
  //TODO: need to save it into Context or any another place but NOT into the localstorage
  return (
    <div className="App">
      <header className="App-header">
        {secret ? (
          <p> Yor Github secret is {secret}</p>
        ) :
          (
            <p>You have no Github sАecret. Click <a href={authLink}>Authorize</a> to get one</p>
          )
        }
      </header>
    </div>
  );
}

export default App;
