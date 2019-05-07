import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import style from './CSS/navbar.module.css';
import Navbar from 'react-bootstrap/Navbar';
import SettingsIcon from '../Images/round_perm_identity_white_24dp.png';

import LogInComponent from '../Components/LogInComponent';

class NavBarComponent extends Component {
    constructor(props)
    {
        super(props);
        this.loginModal = React.createRef();
    }

    icon = SettingsIcon;

    showDialog = () =>  {
        // visa dialog
        this.loginModal.current.handleShow();
    }

    render() {
      /**
      let loggedinUser = localStorage.getItem('users');
      let loggedinUserId, loginStatus;
      JSON.parse(loggedinUser).forEach((element) => {
        loggedinUserId = element.email;
        if (loggedinUserId !== undefined) {
          localStorage.setItem('loginStatus', 'true');
          loginStatus = localStorage.getItem('loginStatus');
        } else {
          localStorage.setItem('loginStatus', 'false');
          loginStatus = localStorage.getItem('loginStatus');
        }
      });**/
        return (
            <div>
                <div id="google_translate_element" className={style.google}/>
                <Navbar className={style.navigationContainer} expand="lg">
                    <Navbar.Brand>
                        <NavLink className={style.logoClick} to="/home">
                            <h1 className={style.logo}>TripCast</h1>
                        </NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <NavLink className={style.navLinks} activeClassName={style.activeLink} to="/home">Home</NavLink>
                        <NavLink className={style.navLinks} activeClassName={style.activeLink} to="/mypage">Profile</NavLink><br/>
                        <NavLink className={style.navLinks} activeClassName={style.activeLink} to="/planner">Trip Planner</NavLink><br/>
                        <NavLink className={style.navLinks} activeClassName={style.activeLink} to="/about">About</NavLink>
                    </Navbar.Collapse>
                    <button className={style.loginIconPosition} onClick={this.showDialog}><img className={style.loginIcon} src={this.icon}/></button>
                </Navbar>
                <LogInComponent ref={this.loginModal} showButton={false}/>
            </div>
        )
    }
}

export default NavBarComponent;
