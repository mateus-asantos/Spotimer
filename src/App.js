import React, { Component } from 'react';
import './App.css';
import { Login } from './components/Login';
import Playlists from './components/Playlists/Playlists';

class App extends Component {

  render() {
    console.log(window.location.hash)
    return (
      <div className="App">
        {window.location.hash?<Playlists access_token={window.location.hash} />:<Login />}
      </div>
    );
  }
}

export default App;
