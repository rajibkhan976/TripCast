import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import styles from './CSS/WeatherDisplay.module.css'

import ClearSkyDay from '../Images/ClearSkyDay.svg';
import ClearSkyNight from '../Images/ClearSkyNight.svg';
import PartlyCloudyDay from '../Images/PartlyCloudyDay.svg';
import PartlyCloudyNight from '../Images/PartlyCloudyNight.svg';
import Cloudy from '../Images/Cloudy.svg';
import Rain from '../Images/Rain.svg';
import Storm from '../Images/Storm.svg';
import Snow from '../Images/Snow.svg';
import Fog from '../Images/Fog.svg';

class WeatherDisplayComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
        }
    };

    toggleDetails = (e) => {
        this.setState(this.state.showDetails === false ? {
            showDetails: true
          } : {
            showDetails: false
        });
    };

    testObject = {
        "weather":[{
            "id":803,
            "main": "Clouds",
            "description":"broken clouds",
            "icon":"04d"}]
    };
    

    handleImages = {
       '01d': ClearSkyDay,
       '01n': ClearSkyNight,
       '02d': PartlyCloudyDay,
       '02n': PartlyCloudyNight,
       '03d': Cloudy,
       '03n': Cloudy,
       '04d': Cloudy,
       '04n': Cloudy,
       '09d': Rain,
       '09n': Rain,
       '10d': Rain,
       '10n': Rain,
       '11d': Storm,
       '11n': Storm,
       '13d': Snow,
       '13n': Snow,
       '50d': Fog,
       '50n': Fog
    };


    render() {
        return (
            <Card>
                <Card.Body>
                    <h1>Location</h1>
                    <div className={styles.today}>
                        <div>
                            <img src={this.handleImages[this.testObject['weather'][0].icon]} alt='Clear Skys'className={styles.todayImage}/>
                            <h2>Clear Skys</h2>
                        </div>
                        <div className={styles.todayTemp}>
                            <h1>{this.props.temperature}</h1>
                            <h3>{this.props.tempMin}</h3>
                            <Button onClick={this.toggleDetails} size='sm' variant='info'>Details</Button>
                        </div>
                    </div>
                    <hr/>
                    <div className={styles.underLine}>
                        {this.state.showDetails === true 
                            ?  <Table style={{width: '600px'}} striped bordered>
                                    <tbody>
                                        <tr>
                                            <td>test</td>
                                            <td>test</td>
                                        </tr>
                                        <tr>
                                            <td>test</td>
                                            <td>test</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            :   <div className={styles.forcastContainer}>
                                    <div className={styles.forcastDay}>
                                        <img src={this.handleImages['10d']} alt='Clear Skys' className={styles.forcastImage}/>
                                        <h3>20°C</h3>
                                        <p>12°C</p>
                                    </div>
                                    <div className={styles.forcastDay}> 
                                        <img src={this.handleImages['50d']} alt='Clear Skys' className={styles.forcastImage}/>
                                        <h3>20°C</h3>
                                        <p>12°C</p>
                                    </div>
                                    <div className={styles.forcastDay}> 
                                        <img src={this.handleImages['02d']} alt='Clear Skys' className={styles.forcastImage}/>
                                        <h3>20°C</h3>
                                        <p>12°C</p>
                                    </div>
                                    <div className={styles.forcastDay}>
                                        <img src={this.handleImages['01d']} alt='Clear Skys' className={styles.forcastImage}/>
                                        <h3>20°C</h3>
                                        <p>12°C</p>
                                    </div>
                                </div>
                        }
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default WeatherDisplayComponent;