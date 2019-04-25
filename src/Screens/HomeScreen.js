import React, { Component } from 'react';
import SearchComponent from '../Components/SearchComponent';
import WeatherDisplayComponent from '../Components/WeatherDisplayComponent';

export class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      temperature: '', //This is the temperature
      humidity: '', //This is the humidity
      tempMin: '', //This is the minimal temperature
      tempMax: '', //This is the maximal temperature
      icon: '', //This is the icon code
      description: '', //This is the description for the weather
      country: '', //This is the country the user typed in
      city: '' //This is the city the user typed in
    };
  }

  //This is a function to fetch the weather from the API
  //This functions sets the selected results from the API as state
  //We also gather the Country and City from input in the SearchComponent
  fetchWeather = e => {
    e.preventDefault();
    const country = e.target.elements.country.value; //Stores the country value from SearchComponent
    const city = e.target.elements.city.value; //Stores the city value from SearchComponent
    const apiKey = '55f970a5b61819d7f237eb1cb2be6bfd'; //This is the API key to OpenWeather
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${apiKey}&units=metric`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (city && country) {
          this.setState({         //Here we set the state to selected results form API
            temperature: data.main.temp,
            humidity: data.main.humidity,
            tempMin: data.main.temp_min,
            tempMax: data.main.temp_max,
            icon: data.weather[0].icon,
            description: data.weather[0].description,
            country: data.sys.country,
            city: data.name
          });
        }
        console.log('state.temp:', this.state.temperature);
        console.log('state.hum:', this.state.humidity);
      })
      .catch(error => console.error(error));
  };

  render() {
    console.log(this.state);
    return (
      <div className="container" style={{ display: 'flex' }}>
        <WeatherDisplayComponent
          temperature={this.state.temperature}
          humidiy={this.state.humidity}
          tempMin={this.state.tempMin}
          tempMax={this.state.icon}
          icon={this.state.icon}
          description={this.state.description}
          country={this.state.country}
          city={this.state.city}
        />
        <SearchComponent fetchWeather={this.fetchWeather} />
      </div>
    );
  }
}

export default HomeScreen;
