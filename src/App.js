import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Nav from './Nav';
import Landing from './Landing';
import Home from './Home';
import Game from './Game';


class App extends Component {
  render() {
    return (
      <Router>
            <div className="App">
                <Nav />
                <Route exact path="/" component={Landing} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/game" component={Game} />


            </div>
      </Router>
    );
  }
}

export default App;
