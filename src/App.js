import React, { Component } from 'react';
import './App.css';
import LogInComponent from './Components/LogInComponent';
import TripPlannerComponent from './Components/TripPlannerComponent';
import HomeScreen from './Screens/HomeScreen';


class App extends Component {
  render() {
    return (
      <div>
        <LogInComponent/>
        <TripPlannerComponent/>
        <HomeScreen/>
      </div>
    );
  }
}

export default App;
