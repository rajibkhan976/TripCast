import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import myPageStyle from './CSS/mypage.module.css';
import addIcon from '../Images/baseline_add_black_24dp.png';
import removeIcon from '../Images/baseline_remove_black_24dp.png';

import WeatherAPI from '../API';
import WeatherDisplayComponent from '../Components/WeatherDisplayComponent';
import LogInComponent from '../Components/LogInComponent';
import SearchComponent from '../Components/SearchComponent';

class MyPageComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: localStorage.getItem('loginStatus'),
            data: {},
            fdata: {},
            unit: '',
            toggleSearch: true,
        }
        this.loginModal = React.createRef();

        //This is needed for the whole location to actually show without the text from the Home page
        const weather = new WeatherAPI();
        weather.fetchWeather('SE', 'Stockholm', this.setWeather);
        weather.fetchForecast('SE', 'Stockholm', this.forecast);
    }

    //Icons in .png format
    add = addIcon;
    remove = removeIcon;

    //Needed to show the loginModal without rendering the Trip Planner button
    showLogin = () =>  {
        this.loginModal.current.handleShow();
    }

    // FETCH method from Home Screen, fetches the current weather
    fetchWeather = (e) => {
        e.preventDefault();
        const country = e.target.elements.country.value; //Stores the country value from SearchComponent
        const city = e.target.elements.city.value; //Stores the city value from SearchComponent
        const apiKey = '55f970a5b61819d7f237eb1cb2be6bfd'; //This is the API key to OpenWeather
        let unit = ''
        if (e.target.elements.options.value === 'celsius') {
          unit = 'metric'
        } else if (e.target.elements.options.value === 'fahrenheit') {
          unit = 'imperial'
        }
        
        if (e.target.elements.options.value) {
          this.setState({
            unit: unit
          })
        }
    
        fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${apiKey}&units=${unit}`
        )
          .then(res => res.json())
          .then(data => {
          
            if (city && country) {
              this.setState({
                data: data
              });
            }
          })
          .catch(error => console.error(error));
          
        this.fetchForecast(city, country, apiKey, unit);
    };
    
    // FETCH method from Home Screen, fetches the upcoming weather
    fetchForecast = (city, country, apiKey, unit) => {
        fetch(
          `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&APPID=${apiKey}&units=${unit}`
        )
          .then(res => res.json())
          .then(data => {
            let list = data.list;
            let dateList = [];
            //Here I do a loop to get the weather everyday at 12:00
            for (var i = 0; i < list.length; i++) {
              if (list[i].dt_txt.includes('12:00:00')) {
                dateList.push(list[i]);
              }
            }
            //Here I set error to false, because I dont want to render an error
            this.setState({
              fdata: dateList,
              error: false
            });
            
          })
          //Here I catch the error and assing it to true in state so I can rende error message
          .catch(error => {
          return(
          this.error = <h3 style={{color: 'darkred'}}>Please enter valid search.</h3>,
          this.setState({
            error: true
          })
        )
        });
    };

    // Shows the current weather from default location
    setWeather = (data) => {
        this.setState({
            data: data
        })
    }

    // Shows the upcoming weather from default location
    forecast = (data) => {
        this.setState({
            fdata: data
        })
    }

    //Toggles the searchbar to select new country/city
    toggleSearch = () => {
        this.setState({
            toggleSearch : !this.state.toggleSearch
        });
    };

    render () {
        return (
            <div>
                {(this.state.loggedIn === 'false')
                ?
                <div>
                    <div className={myPageStyle.text}>
                        <h1>Welcome to your profile page!</h1><br/>
                        <h2>The weather at your chosen location is...</h2><br/>
                        <div className={myPageStyle.container}>
                          <WeatherDisplayComponent
                          data={this.state.data}
                          fdata={this.state.fdata}
                          unit={this.state.unit}
                          showInfo={false}
                          />
                        </div>
                        <div>
                          {!this.state.toggleSearch
                          ?
                          <div>
                            <SearchComponent fetchWeather={this.fetchWeather}/>
                            <h3 onClick={this.toggleSearch} className={myPageStyle.addIcon}>I'm happy with my change of location <img src={this.remove}/></h3>
                          </div>
                          :
                          <div onClick={this.toggleSearch} className={myPageStyle.addIcon}>
                            <h3>Change default location <img src={this.add}/></h3>
                          </div>
                          }
                      </div>
                    </div>
                    <div className={myPageStyle.button}>
                        <Dropdown>
                            <Dropdown.Toggle variant="info" id='dropdown-basic-button'>
                            Settings
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/change-location">Change location</Dropdown.Item>
                                <Dropdown.Item href="#/celsius-fahrenheit">°C/°F</Dropdown.Item>
                                <Dropdown.Item href="#/change-email">Change email</Dropdown.Item>
                                <Dropdown.Item href="#/change-password">Change password</Dropdown.Item>
                                <Dropdown.Item href="#/change-username">Change username</Dropdown.Item>
                                <Dropdown.Item href="#/privacy-settings">Privacy settings</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/more-settings">More settings...</Dropdown.Item>
                                <Dropdown.Item href="#/remove-account">Remove account</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                :
                <div className={myPageStyle.text}>
                    <h1>You're not logged in.</h1>
                    <button className={myPageStyle.loginButton} onClick={this.showLogin}>Please login</button>
                </div> 
                }
                <LogInComponent ref={this.loginModal} showButton={false}/>
            </div>
        )
    }
}

export default MyPageComponent;