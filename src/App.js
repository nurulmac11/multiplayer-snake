import React, { Component } from 'react';
import Mario from './components/Mario';
import Snake from './components/Snake';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css';


class App extends Component {
  render() {
    return (
        <Router basename={'/games'}>
        <div className="container">
        <div className="App row">
        <ul>
        <li>
          <Link to="/">Snake</Link>
        </li>
        <li>
          <Link to="/mario">Mario</Link>
        </li>
      </ul>
      <hr />
      <Route exact path="/" component={Snake} />
      <Route path="/mario" component={Mario} />

        </div>
        </div>
        </Router>
    );
  }
}

export default App;
