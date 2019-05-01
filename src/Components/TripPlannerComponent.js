import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Client from 'predicthq';

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
    fetch("https://api.predicthq.com/v1/events/", {
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
    .catch((err) => console.log(err))
  }

  render () {
    this.state.events.map((event) => {
      console.log(event.title);
    });
    return (
      <Jumbotron>
        <h1>Hello, world!</h1>
      </Jumbotron>
    );
  }
}

export default TripPlannerComponent;
