import React, { Component } from 'react';
import Button from '../../node_modules/react-bootstrap/Button';
import InputGroup from '../../node_modules/react-bootstrap/InputGroup'
import FormControl from '../../node_modules/react-bootstrap/FormControl'
import Form from '../../node_modules/react-bootstrap/Form'
import styles from './CSS/home.module.css'


const SearchComponent = (props) => (
           
  <Form onSubmit={props.fetchWeather}>
         <InputGroup className="mb-3">
     <InputGroup.Prepend>
       <InputGroup.Text id="inputGroup-sizing-default" name='country'>Country</InputGroup.Text>
    
     </InputGroup.Prepend>
     <FormControl
       aria-label="Default"
       aria-describedby="inputGroup-sizing-default"
     />
     <InputGroup.Prepend>
       <InputGroup.Text id="inputGroup-sizing-default" name='city' 
        type="text">City</InputGroup.Text>
    
     </InputGroup.Prepend>
     <FormControl
       aria-label="Default"
       aria-describedby="inputGroup-sizing-default"
     />
     <Button variant='primary' type="submit">Get Weather</Button>
     
   </InputGroup>
   </Form>
       
      
    
  );


  export default SearchComponent;
  

//   <form onSubmit={props.fetchWeather}>
// <input type="text" name="city" placeholder="City..."/>
// <input type="text" name="country" placeholder="Country..."/>
// <button>Get Weather</button>
// </form>

