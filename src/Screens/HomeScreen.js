import React, { Component } from 'react';
import SearchComponent from '../Components/SearchComponent';
import WeatherDisplayComponent from '../Components/WeatherDisplayComponent';
import styles from '../Components/CSS/home.module.css';
import LogInComponent from '../Components/LogInComponent';
//Todo, weather converter, imperial, fahrenheit, kelvin
//TODO, Wrong input

export class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      fdata: {},
      unit: ''
    };
  }

  //This is a function to fetch the weather from the API
  //This functions sets the selected results from the API as state
  //We also gather the Country and City from input in the SearchComponent
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
        console.log(data);

        if (city && country) {
          this.setState({
            data: data
          });
        }
      })
      .catch(error => console.error(error));
    this.fetchForecast(city, country, apiKey, unit);
  };

  //I take in three arguments from the function above this and uses those to fetch the forecast
  fetchForecast = (city, country, apiKey, unit) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&APPID=${apiKey}&units=${unit}`
    )
      .then(res => res.json())
      .then(data => {
        let list = data.list;
        let dateList = [];
        console.log('this is list', list);
        //Here I do a loop to get the weather everyday at 12:00
        for (var i = 0; i < list.length; i++) {
          if (list[i].dt_txt.includes('12:00:00')) {
            dateList.push(list[i]);
          }
        }

        this.setState({
          fdata: dateList
        });
        console.log('date.list', dateList);
      })
      .catch(error => alert('City not found', error));
  };

  render() {
    console.log('state unit', this.state.unit);
    return (
      <div>
        <div className={styles.home}>
          <SearchComponent fetchWeather={this.fetchWeather} />
          <WeatherDisplayComponent
            data={this.state.data}
            fdata={this.state.fdata}
            unit={this.state.unit}
          />
        </div>
      </div>
    );
  }
}

export default HomeScreen;
