import React, { Component } from 'react';
import  SearchComponent  from '../Components/SearchComponent';
import WeatherDisplayComponent from '../Components/WeatherDisplayComponent';


export class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      
    };
  }

  fetchWeather = (e) => {
    e.preventDefault()
    const country = e.target.elements.country.value
    const city = e.target.elements.city.value
    console.log(city)
    console.log(country)
    const apiKey = '55f970a5b61819d7f237eb1cb2be6bfd';
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${apiKey}&units=metric`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        
      })
      .catch(error => console.error(error));
  };

  handleChangeCountry = (e) => {
    this.setState({ country: e.target.value });
  };

  handleChangeCity = (e) => {
    this.setState({ city: e.target.value });
  };

  consoleLog = () => {
    
    
  }

  render() {
    return (
      <div className='container' style={{display: 'flex'}}>
          <WeatherDisplayComponent></WeatherDisplayComponent>
          <SearchComponent fetchWeather={this.fetchWeather}/>
        <button onClick={this.consoleLog}>Click</button>
      </div>
    );
  }
}

export default HomeScreen;

