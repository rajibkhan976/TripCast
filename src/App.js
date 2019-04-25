import React, { Component } from 'react';
import './App.css';
import HomeScreen from './Screens/HomeScreen';
import LogInComponent from './Components/LogInComponent';
import TripPlannerComponent from './Components/TripPlannerComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HomeScreen />
        <LogInComponent />
        <TripPlannerComponent />
      </div>
    );
  }
}

export default App;
