import React from 'react';

import Button from '../../node_modules/react-bootstrap/Button';
import InputGroup from '../../node_modules/react-bootstrap/InputGroup';
import FormControl from '../../node_modules/react-bootstrap/FormControl';
import Form from '../../node_modules/react-bootstrap/Form';
import styles from './CSS/home.module.css';
import ToggleButtonGroup from '../../node_modules/react-bootstrap/ToggleButtonGroup';
import ToggleButton from '../../node_modules/react-bootstrap/ToggleButton';



//This component is the search component that sends input values to it's parent "home screen"
const SearchComponent = props => (
  <Form onSubmit={props.fetchWeather}>
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <ToggleButtonGroup
          type="radio"
          name="options"
          defaultValue="celsius"
          className={styles.buttons}
        >
          <ToggleButton value="celsius">°C</ToggleButton>
          <ToggleButton value="fahrenheit">°F</ToggleButton>
        </ToggleButtonGroup>
        <InputGroup.Text id="inputGroup-sizing-default">
          Country
        </InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        name="country"
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        placeholder="Country Code..."
        required
        
      />
      <InputGroup.Prepend>
        <InputGroup.Text id="inputGroup-sizing-default" type="text">
          City
        </InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        name="city"
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        placeholder="City..."
        required
      />
      <Button variant="primary" type="submit">
        Get Weather
      </Button>
    </InputGroup>
   
  </Form>
);

export default SearchComponent;
