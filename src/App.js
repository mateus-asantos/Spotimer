import React, { Component } from 'react';
import './App.css';
import { Login } from './components/login';
import Playlists from './components/Playlists';

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
