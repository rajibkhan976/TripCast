import React, { Component } from 'react';
import './App.css';
import HomeScreen from './Screens/HomeScreen';
import LogInComponent from './Components/LogInComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HomeScreen/>
        <LogInComponent/>
      </div>
      
    );
  }
}

export default App;
