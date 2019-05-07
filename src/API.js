export default class WeatherAPI {

  // Copied from home screen with some minor changes (parameters)

  //This is a function to fetch the weather from the API
  //This functions sets the selected results from the API as state
  //We also gather the Country and City from input in the SearchComponent
  fetchWeather = (country, city, callback) => {
    const apiKey = '55f970a5b61819d7f237eb1cb2be6bfd'; //This is the API key to OpenWeather
    let unit = 'metric';

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${apiKey}&units=${unit}`
    )
    .then(res => res.json())
    .then(data => {
        callback(data)
    })
    .catch(error => console.error(error));
  };

  //I take in three arguments from the function above this and uses those to fetch the forecast
  fetchForecast = (country, city, callback) => {
    const apiKey = '55f970a5b61819d7f237eb1cb2be6bfd'; //This is the API key to OpenWeather
    let unit = 'metric';
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
        callback(dateList)
      })
      //Here I catch the error and assing it to true in state so I can rende error message
    .catch(error => {
        console.log(error)
    });
  };
}