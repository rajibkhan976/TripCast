import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class TripPlannerComponent extends Component {

  constructor (props) {
    super (props);
    this.state = {
      events: [],
      error: null
    };
  }

  componentDidMount () {
    let apiToken = 'zqjuWkOi7vUEcnpOozh3wzbqqMzcl9';
    //let apiTokenTwo = 'IRHAH3GTFB5ZM3YXTSAN';
    //fetch request for predicthq api
    fetch("https://api.predicthq.com/v1/events/?q=London", {
      method: 'GET',
      mode: 'cors',
      headers: {'Authorization': `Bearer ${apiToken}`}
    })
    .then(res => res.json().then((value) => {
      this.setState({
        events: value.results
      })
    })
  )
    .catch((err) => console.log(err));
    /*
    //fetch request for eventbrite api
    fetch("https://www.eventbriteapi.com/v3/users/me/?token=IRHAH3GTFB5ZM3YXTSAN", {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Credentials': "true",
        'Authorization': `Bearer ${apiTokenTwo}`,
        'Access-Control-Allow-Origin': '*'
      },
      credentials: 'include'
    })
    .then(res => res.json().then((value) => {
      console.log(value);
    })
  )
    .catch((err) => console.log(err)) **/
  }

  render () {
    let eventsList = this.state.events;
    console.log(this.state.events);
    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <ul className="list-group">
              {eventsList.map((event, index) => {
                return <div>
                         <li className="list-group-item" key={index}>Title: {event.title}</li>
                         <ul className="list-group">
                         <li className="list-group-item" key={index}>Category: {event.category}</li>
                         <li className="list-group-item" key={index}>Start: {event.start}</li>
                         <li className="list-group-item" key={index}>Tags: {event.labels.map(label => label)}</li>
                         <button type="button" class="btn btn-success" onClick={this.handleEvent}>Add to list</button> <br/>
                         </ul>
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
