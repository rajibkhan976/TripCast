import React, { Component } from 'react';
import styles from '../Components/CSS/about.module.css';
//This component screen is an "about page" that gives information about this app and staff.
class AboutScreen extends Component {
    render() {
        return (
            <div className={styles.about}>
                <h1>About us</h1>
                <h3>We provide weather forcast for travellers who wants to plan a trip through our trip planner, where you can see events happening in your desired city.</h3>
                <br />
                <h2>Our development staff includes:</h2>
                <br />
                <ul >
                    <li><h3><div className={styles.letter}>Martin <span className={styles.stronger}>D</span>oe Front-End Developer</div></h3></li>
                    <li><h3><div className={styles.letter}>Aaron <span className={styles.stronger}>D</span>oe Front-End Developer</div></h3></li>
                    <li><h3><div className={styles.letter}>Rajib <span className={styles.stronger}>D</span>oe Front-End Developer</div></h3></li>
                    <li><h3><div className={styles.letter}>Valentina <span className={styles.stronger}>D</span>oe Front-End Developer</div></h3></li>
                </ul>

            </div>
        )
    }
}

export default AboutScreen;