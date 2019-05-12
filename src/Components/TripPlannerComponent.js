import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import LogInComponent from './LogInComponent';

/**this class fetches the events data from PredictHQ api based on the city parameter
received as a props from the WeatherDisplayComponent and then enables the users to
add and remove events to their activity schedule**/
class TripPlannerComponent extends Component {

  constructor (props) {
    super (props);
    /**definition and assignment of the states needed for the fetched events and allowing
    the users to add events to their acitivyt schedule**/
    this.state = {
      localEvents: [],
      personalEvents: [],
      eventError: null,
      info: false,
      toggleInfoIndex: [],
      loginStatus: localStorage.getItem('loginStatus'),
      weatherForecast: [],
      weatherError: null,
      city: undefined
    };
  }
  /**fetches the events from PredictHQ api based on the city parameter that is received
  from the WeatherDisplayComponent as a props and assigns to a state**/
  componentDidMount () {
    let apiToken = 'zqjuWkOi7vUEcnpOozh3wzbqqMzcl9';
    const apiKey = '55f970a5b61819d7f237eb1cb2be6bfd';
    //fetch request for predicthq api
    fetch(`https://api.predicthq.com/v1/events/?q=${this.props.match.params.id}&category=conferences,expos,concerts,festivals,performing-arts,sports,community
`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Accept': 'application/json'
      }
    })
    .then(res => res.json().then((value) => {
      this.setState({
        localEvents: value.results
      })
    })
  )
    .catch((err) => {
      this.setState({
        eventError: err
      });
    });
    //Weatherforecast fetch request from openweather api
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.props.match.params.id}&APPID=${apiKey}&units=metric`)
    .then(res => res.json())
    .then((weather) => {
      //console.log(weather);
      this.setState({
        city: weather.city.name,
        weatherForecast: weather.list
      });
      console.log(weather.city.name);
      console.log(weather.list);
    })
    .catch((err) => {
      this.setState({
        weatherError: err
      });
    });
  }
  //method for enabling users to add events to their activity schedule
  addEvent = (addIndex, e) => {
    for (var eventIndex in this.state.localEvents) {
      if (addIndex == eventIndex) {
        let addEventTitle = this.state.localEvents[eventIndex].title;
        let addEventLabel = this.state.localEvents[eventIndex].labels.toString();
        let addEventStartDate = this.state.localEvents[eventIndex].start.substring(0, this.state.localEvents[eventIndex].start.indexOf('T'));
        let addEventStartTime = this.state.localEvents[eventIndex].start.slice((this.state.localEvents[eventIndex].start.indexOf('T') + 1), this.state.localEvents[eventIndex].start.indexOf('Z'));
        let addEventEndDate = this.state.localEvents[eventIndex].end.substring(0, this.state.localEvents[eventIndex].end.indexOf('T'));
        let addEventEndTime = this.state.localEvents[eventIndex].end.slice((this.state.localEvents[eventIndex].end.indexOf('T') + 1), this.state.localEvents[eventIndex].end.indexOf('Z'));
        this.setState(prevState => ({
          personalEvents: [...prevState.personalEvents,
            {
              eventIndex: addIndex,
              eventTitle: addEventTitle,
              eventLabel: addEventLabel,
              eventStartDate: addEventStartDate,
              eventStartTime: addEventStartTime,
              eventEndDate: addEventEndDate,
              eventEndTime: addEventEndTime
            }
          ]
        }))
        this.setState({localEvents: this.state.localEvents.filter((value, index) => {return (index !== addIndex)})});
      }
    }
  }
  //method for enabling users to remove events from their activity schedule
  removeEvent = (removeIndex, e) => {
    for (var activityIndex in this.state.personalEvents) {
      if (removeIndex == activityIndex) {
        this.setState({personalEvents: this.state.personalEvents.filter((value, index) => {return (index !== removeIndex)})});
        this.setState(prevState => ({localEvents: [
          {
            index: removeIndex,
            title: this.state.personalEvents[removeIndex].eventTitle,
            labels: this.state.personalEvents[removeIndex].eventLabel.split(','),
            start: this.state.personalEvents[removeIndex].eventStartDate + 'T' + this.state.personalEvents[removeIndex].eventStartTime + 'Z',
            end: this.state.personalEvents[removeIndex].eventEndDate + 'T' + this.state.personalEvents[removeIndex].eventEndTime + 'Z'
          },
          ...prevState.localEvents
        ]}));
      }
    }
  }
  //method for toggling details of the events added to the activity schedule of the user
  toggleDetails = (toggleIndex, e) => {
    for (var eventIndex in this.state.personalEvents) {
      if (toggleIndex == eventIndex) {
        if (!this.state.toggleInfoIndex.includes(toggleIndex)) {
          this.setState(prevState => ({
            toggleInfoIndex: [...prevState.toggleInfoIndex, toggleIndex],
            info: true
          }));
        } else if (this.state.toggleInfoIndex.includes(toggleIndex)) {
          this.setState({
            toggleInfoIndex: this.state.toggleInfoIndex.filter((value) => {return (value !== toggleIndex)})
          });
        } else {
          //nothig to do
        }
      }
    }
  }

  render () {
    let eventsList = this.state.localEvents;
    return (
      <div className="container">
      {(this.state.loginStatus === 'true') ?
      <div className="row float-right">
        <LogInComponent {...this.props} showButton={true} />
      </div> : null
    }
        <div className="row">
          <div className="col-6">
            <h1>Plan your activity schedule:</h1>
          {(this.state.personalEvents.length != 0) ?
            <ul className="list-group">
             {this.state.personalEvents.map((addedEvent, addedEventIndex) => {
               return <div>
                       <li className="list-group-item" addedeventkey={addedEventIndex}>
                        <h2> {addedEvent.eventTitle}</h2> <br/>
                        {(this.state.info && this.state.toggleInfoIndex.includes(addedEventIndex)) ?
                          <div>
                            <p>Tags: {addedEvent.eventLabel}</p>
                            <p>Start date: {addedEvent.eventStartDate}</p>
                            <p>Start time: {addedEvent.eventStartTime}</p>
                            <p>End date: {addedEvent.eventEndDate}</p>
                            <p>End time: {addedEvent.eventEndTime}</p>
                          </div>
                        : null }
                        <button type="button" className="btn btn-primary" onClick={(e) => this.toggleDetails(addedEventIndex, e)}>Toggle details</button> &nbsp;
                        <button type="button" className="btn btn-info" onClick={(e) => this.removeEvent(addedEventIndex, e)}>Remove</button> <br/>
                       </li> <br/>
                      </div>
             })}
             </ul> : null}
          </div>
          <div className="col-6">
            <h1>Events within {this.props.match.params.id}:</h1>
            <ul className="list-group">
              {eventsList.map((event, index) => {
                return <div>
                         <li className="list-group-item" key={index}>
                           <h2>{event.title}</h2> <br/>
                           <p>Tags: {event.labels.toString()}</p>
                           <p>Start date: {event.start.substring(0, event.start.indexOf('T'))}</p>
                           <p>Start time: {event.start.slice((event.start.indexOf('T') + 1), event.start.indexOf('Z'))}</p>
                           <p>End date: {event.end.substring(0, event.end.indexOf('T'))}</p>
                           <p>End time: {event.end.slice((event.end.indexOf('T') + 1), event.end.indexOf('Z'))}</p>
                           <button type="button" className="btn btn-primary" onClick={(e) => this.addEvent(index, e)}>Add to list</button> <br/>
                         </li> <br/>
                       </div>
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default TripPlannerComponent;
