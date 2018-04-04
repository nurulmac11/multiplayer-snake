import React, { Component } from 'react';
import {MyProvider} from './Context'
import Card from './components/Card'
import Header from './components/Header'

import './App.css';




class App extends Component {
  render() {
    return (
      <MyProvider>
      <div className="App">
      <h1>The Game</h1>
        <Header />
        <Card />
      </div>
      </MyProvider>
    );
  }
}

export default App;
