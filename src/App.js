import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBarComponent from './Components/NavBarComponent';
import HomeScreen from './Screens/HomeScreen';
import AboutScreen from './Screens/AboutScreen';
import MyPageScreen from './Screens/MyPageScreen';
import TripPlannerScreen from './Screens/TripPlannerScreen';
import TripPlannerComponent from './Components/TripPlannerComponent';
import LogInComponent from './Components/LogInComponent';
import PageNotFoundScreen from './Screens/PageNotFoundScreen';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBarComponent/>
        </div>

        <Switch>
            <Route exact path="/" component={ HomeScreen } />
            <Route exact path="/home" component={ HomeScreen } />
            <Route exact path="/about" component={ AboutScreen } />
            <Route exact path="/mypage" component={ MyPageScreen } />
            <Route exact path="/planner" component={ TripPlannerScreen } />
            <Route exact path="/planner/:id" render={props => <TripPlannerComponent {...props}/>} />
            <Route exact path="/login" component={ LogInComponent } />
            <Route component={ PageNotFoundScreen } />
        </Switch>
      </Router>
    );
  }
}

export default App;
