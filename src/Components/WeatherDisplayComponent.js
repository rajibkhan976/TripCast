import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import LogInComponent from './LogInComponent';
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
        
        let main = this.props.data.main
        let weather = this.props.data.weather
        let sys = this.props.data.sys
        let sunrise = ""
        let sunset = ""
        
        let dayIcons = []
        if(this.props.fdata && this.props.fdata.length > 0){
            for(let i = 0; i < this.props.fdata.length; i++){                
              if(this.props.fdata[i].weather.length > 0){
                dayIcons.push(this.props.fdata[i].weather[0].icon);
              }
            }
        }
        
        let dayInfo = []
        if (this.props.fdata && this.props.fdata.length > 0){
            for(let i = 0; i < this.props.fdata.length; i++){
                dayInfo.push(this.props.fdata[i].main.temp_max)
                dayInfo.push(this.props.fdata[i].main.temp_min)
            }
        }           

        if (sys) {
            sunrise = (new Date(sys.sunrise*1000).getHours() +":"+ new Date(sys.sunrise*1000).getMinutes());
            sunset = (new Date(sys.sunset*1000).getHours() +":"+ new Date(sys.sunset*1000).getMinutes());
        }        
        

        return (
            <div>
              {this.props.data.name  
                ? <Card>
                        <Card.Body>
                            <h1>{this.props.data.name}, {sys.country}</h1>
                            <div className={styles.topBox}>
                                <div className={styles.today}>
                                <div>
                                    <img src={this.handleImages[weather[0].icon]} alt='Clear Skys'className={styles.todayImage}/>
                                    <h2>{weather[0].discription}</h2>
                                </div>
                                <div className={styles.todayTemp}>
                                    <h1>{Math.round(main.temp)}°C</h1>
                                    <h4>{Math.round(main.temp_min)}°C  {Math.round(main.temp_max)}°C</h4>
                                    <Button onClick={this.toggleDetails} size='sm' variant='info'>Details</Button>
                                </div>
                                </div>
                                <div className={styles.buttons}> 
                                    <LogInComponent/>
                                </div>
                            </div>
                            <hr/>
                            <div className={styles.underLine}>
                                {this.state.showDetails === true 
                                    ?  <Table style={{width: '100%'}} striped bordered>
                                            <tbody>
                                               <tr>
                                                   <td>High Temperature</td>
                                                   <td>{main.temp_max}°C</td>
                                               </tr>
                                               <tr>
                                                   <td>Low Temperature</td>
                                                   <td>{main.temp_min}°C</td>
                                               </tr>
                                               <tr>
                                                   <td>Humidity</td>
                                                   <td>{main.humidity}%</td>
                                               </tr>
                                               <tr>
                                                   <td>Sunrise</td>
                                                   <td>0{sunrise}</td>
                                               </tr>
                                               <tr>
                                                   <td>Sunset</td>
                                                   <td>{sunset}</td>
                                               </tr>
                                               <tr>
                                                   <td>Pressure</td>
                                                   <td>{main.pressure} hPa</td>
                                               </tr>
                                               <tr>
                                                   <td>Wind Speed</td>
                                                   <td>{this.props.data.wind.speed} m/s</td>
                                               </tr>
                                            </tbody>
                                        </Table>
                                    :   <div className={styles.forcastContainer}>
                                            <div className={styles.forcastDay}>
                                                <img src={this.handleImages[dayIcons[0]]} alt='Clear Skys' className={styles.forcastImage}/>
                                                <h3>{Math.round(dayInfo[0])}°C</h3>
                                                <p>{Math.round(dayInfo[1])}°C</p>
                                            </div>
                                            <div className={styles.forcastDay}> 
                                                <img src={this.handleImages[dayIcons[1]]} alt='Clear Skys' className={styles.forcastImage}/>
                                                <h3>{Math.round(dayInfo[2])}°C</h3>
                                                <p>{Math.round(dayInfo[3])}°C</p>
                                            </div>
                                            <div className={styles.forcastDay}> 
                                                <img src={this.handleImages[dayIcons[2]]} alt='Clear Skys' className={styles.forcastImage}/>
                                                <h3>{Math.round(dayInfo[4])}°C</h3>
                                                <p>{Math.round(dayInfo[5])}°C</p>
                                            </div>
                                            <div className={styles.forcastDay}>
                                                <img src={this.handleImages[dayIcons[3]]} alt='Clear Skys' className={styles.forcastImage}/>
                                                <h3>{Math.round(dayInfo[6])}°C</h3>
                                                <p>{Math.round(dayInfo[7])}°C</p>
                                            </div>
                                            <div className={styles.forcastDay}>
                                                <img src={this.handleImages[dayIcons[4]]} alt='Clear Skys' className={styles.forcastImage}/>
                                                <h3>{Math.round(dayInfo[8])}°C</h3>
                                                <p>{Math.round(dayInfo[9])}°C</p>
                                            </div>
                                        </div>
                                }
                            </div>
                        </Card.Body>
                    </Card>
                : null}
            </div>
        );
    }
}

export default WeatherDisplayComponent;