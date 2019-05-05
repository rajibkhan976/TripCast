import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import WeatherDisplayComponent from '../Components/WeatherDisplayComponent';

class TripPlannerComponent extends Component {

  constructor (props) {
    super (props);
    this.state = {
      localEvents: [],
      personalEvents: [],
      error: null
    };
  }

  componentDidMount () {
    let apiToken = 'zqjuWkOi7vUEcnpOozh3wzbqqMzcl9';
    //fetch request for predicthq api
    fetch("https://api.predicthq.com/v1/events/?q=" + this.props.match.params.id, {
      method: 'GET',
      mode: 'cors',
      headers: {'Authorization': `Bearer ${apiToken}`}
    })
    .then(res => res.json().then((value) => {
      this.setState({
        localEvents: value.results
      })
    })
  )
    .catch((err) => console.log(err));
  }

  addEvent = (index, e) => {
    for (var eventIndex in this.state.localEvents) {
      if (index == eventIndex) {
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
              eventIndex: index,
              eventTitle: addEventTitle,
              eventLabel: addEventLabel,
              eventStartDate: addEventStartDate,
              eventStartTime: addEventStartTime,
              eventEndDate: addEventEndDate,
              eventEndTime: addEventEndTime
            }
          ]
        }))
        this.setState({localEvents: this.state.localEvents.slice((index + 1), (this.state.localEvents.length + 1))});
      }
    }
    console.log(this.state.personalEvents);
  }

  removeEvent = (removeIndex, e) => {
    for (var activityIndex in this.state.personalEvents) {
      if (removeIndex == activityIndex) {
        this.setState({personalEvents: this.state.personalEvents.slice((removeIndex + 1), (this.state.personalEvents.length + 1))});
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
                       <li className="list-group-item" addedEventKey={addedEventIndex}>
                        <h2> {addedEvent.eventTitle} &nbsp;
                        <button type="button" className="btn btn-info" onClick={(e) => this.removeEvent(addedEventIndex, e)}>Remove</button>
                        </h2>

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
