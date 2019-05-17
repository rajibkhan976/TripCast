import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import style from '../Components/CSS/mypage.module.css';

//This component screen renders the trip planner
class TripPlannerScreen extends Component {
    render () {
        return (
            <div className={style.text}>
            <h2>You have not selected a weather location.<br/>
            Please go back to the home page.</h2>
            <Link to="/home">
              <button className={style.loginButton}>Back to Home</button>
            </Link>
        </div> 
        )
    }
}

export default TripPlannerScreen;