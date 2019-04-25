import React, { Component } from 'react';
import './App.css';
import LogInComponent from './Components/LogInComponent';
import HomeScreen from './Screens/HomeScreen';


class App extends Component {
  render() {
    return (
      <div>
        <HomeScreen/>
        <LogInComponent/>
      </div>
    );
  }
}

export default App;
