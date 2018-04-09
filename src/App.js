import React, { Component } from 'react';
import Snake from './pages/Snake';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';


class App extends Component {
  render() {
    return (
        <Router>
        <div className="container">
        <div className="App row">
      <hr />
      <Route exact path="/" component={Snake} />
        </div>
        </div>
        </Router>
    );
  }
}

export default App;
