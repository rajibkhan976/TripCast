import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import style from './CSS/navbar.module.css';
import Navbar from 'react-bootstrap/Navbar';
import SettingsIcon from '../Images/round_perm_identity_white_24dp.png';

//This is the navbar component
class NavBarComponent extends Component {
    icon = SettingsIcon;

    render() {
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
                    <NavLink className={style.loginIconPosition} activeClassName={style.activeLink} to="/mypage">
                        <img className={style.loginIcon} src={this.icon} alt="profile page icon"/>
                    </NavLink>
                </Navbar>
            </div>
        )
    }
}

export default NavBarComponent;