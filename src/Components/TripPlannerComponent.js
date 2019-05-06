import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import WeatherDisplayComponent from '../Components/WeatherDisplayComponent';

class TripPlannerComponent extends Component {

  constructor (props) {
    super (props);
    this.state = {
      localEvents: [],
      personalEvents: [],
      error: null,
      info: false,
      toggleInfoIndex: undefined
    };
  }

  componentDidMount () {
    let apiToken = 'zqjuWkOi7vUEcnpOozh3wzbqqMzcl9';
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
    .catch((err) => console.log(err));
  }

  addEvent = (addIndex, e) => {
    for (var eventIndex in this.state.localEvents) {
      if (addIndex == eventIndex) {
        console.log(this.state.localEvents[eventIndex]);
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
    console.log(this.state.personalEvents);
  }

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

  toggleDetails = (toggleIndex, e) => {
    for (var eventIndex in this.state.personalEvents) {
      if (toggleIndex == eventIndex) {
        this.setState({
          info: !this.state.info,
          toggleInfoIndex: eventIndex
        });
      }
    }
  }

  render () {
    let eventsList = this.state.localEvents;
    console.log(this.state.localEvents);
    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h1>Plan your activity schedule:</h1>
          {(this.state.personalEvents.length != 0) ?
            <ul className="list-group">
             {this.state.personalEvents.map((addedEvent, addedEventIndex) => {
               return <div>
                       <li className="list-group-item" addedeventkey={addedEventIndex}>
                        <h2> {addedEvent.eventTitle}</h2> <br/>
                        {(this.state.info && this.state.toggleInfoIndex == addedEventIndex) ?
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
                       </li>
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
