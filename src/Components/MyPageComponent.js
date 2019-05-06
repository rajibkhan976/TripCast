import React, { Component } from 'react';
import myPageStyle from './CSS/mypage.module.css';
import Dropdown from 'react-bootstrap/Dropdown';

// import LogInComponent from '../LogInComponent'
import WeatherDisplay from '../Components/WeatherDisplayComponent';

class MyPageComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggleSettings: true,
            loggedIn: localStorage.getItem('loginStatus')
        }
    }

    render () {
        return (
            <div>

            </div>
        )
    }
}

export default MyPageComponent;