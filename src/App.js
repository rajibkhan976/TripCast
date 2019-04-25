import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LogInComponent from './Components/LogInComponent';
import TripPlannerComponent from './Components/TripPlannerComponent';

class App extends Component {
  render() {
    return (
      <div>
        <LogInComponent/>
        <TripPlannerComponent/>
      </div>
    );
  }
}

export default App;
