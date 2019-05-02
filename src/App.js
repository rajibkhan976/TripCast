import React, { Component } from 'react';
import './App.css';
import TripPlannerComponent from './Components/TripPlannerComponent';
import HomeScreen from './Screens/HomeScreen';


class App extends Component {
  render() {
    return (
      <div className="App">
        <TripPlannerComponent/>
      </div>
    );
  }
}

export default App;
