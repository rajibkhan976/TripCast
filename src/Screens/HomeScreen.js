import React, { Component } from 'react';
import SearchComponent from '../Components/SearchComponent';
import WeatherDisplayComponent from '../Components/WeatherDisplayComponent';
import styles from '../Components/CSS/home.module.css';


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

  render() {
    console.log(this.state.fdata)
    
    return (
      <div>
        <div className={styles.home}>
          <SearchComponent fetchWeather={this.fetchWeather}/>
          {this.state.error === true ? this.error : null}
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
