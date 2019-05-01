import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBarComponent from './Components/Navigation/NavBarComponent';
import HomeScreen from './Screens/HomeScreen';
import AboutScreen from './Screens/AboutScreen';
import MyPageScreen from './Screens/MyPageScreen';
import RecentScreen from './Screens/RecentScreen';
import TripPlannerScreen from './Screens/TripPlannerScreen';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <NavBarComponent/>
      </div>

        <Route exact path="/" component={ HomeScreen } />
        <Route exact path="/home" component={ HomeScreen } />
        <Route exact path="/about" component={ AboutScreen } />
        <Route exact path="/mypage" component={ MyPageScreen } />
        <Route exact path="/recent" component={ RecentScreen } />
        <Route exact path="/planner" component={ TripPlannerScreen } />
      </Router>
    );
  }
}

export default App;
