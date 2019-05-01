import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import style from './navbar.module.css';
import Navbar from 'react-bootstrap/Navbar';

class NavBarComponent extends Component {

    render() {
        return (
            <div>
                <div id="google_translate_element" className={style.google}/>
                <Navbar className={style.navigationContainer} expand="lg">
                    <Navbar.Brand>
                        <h1 className={style.logo}>TripCast</h1>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <NavLink className={style.navLinks} activeClassName={style.activeLink} to="/home">Home</NavLink>
                        <NavLink className={style.navLinks} activeClassName={style.activeLink} to="/mypage">Profile</NavLink><br/>
                        <NavLink className={style.navLinks} activeClassName={style.activeLink} to="/planner">Trip Planner</NavLink><br/>
                        <NavLink className={style.navLinks} activeClassName={style.activeLink} to="/recent">Recent</NavLink>
                        <NavLink className={style.navLinks} activeClassName={style.activeLink} to="/about">About</NavLink>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default NavBarComponent;