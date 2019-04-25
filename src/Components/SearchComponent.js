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
       <InputGroup.Text id="inputGroup-sizing-default" >Country</InputGroup.Text>
    
     </InputGroup.Prepend>
     <FormControl
<<<<<<< HEAD
       name='country'
=======
     name='country'
>>>>>>> 28c4fd194e6db63466fc0ac602a10ec0edfa9129
       aria-label="Default"
       aria-describedby="inputGroup-sizing-default"
     />
     <InputGroup.Prepend>
<<<<<<< HEAD
       <InputGroup.Text id="inputGroup-sizing-default"  
=======
       <InputGroup.Text id="inputGroup-sizing-default" 
>>>>>>> 28c4fd194e6db63466fc0ac602a10ec0edfa9129
        type="text">City</InputGroup.Text>
    
     </InputGroup.Prepend>
     <FormControl
<<<<<<< HEAD
       name='city'
=======
     name='city'
>>>>>>> 28c4fd194e6db63466fc0ac602a10ec0edfa9129
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

