import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom';

class LogInComponent extends Component {

  constructor (props) {
    super (props);

    this.state = {users: [
      {email: 'admin@gmail.com', password: 'admin'}
    ],
      show: false,
      loginStatus: 'false',
      signupStatus: 'true'
    };
    console.log(this.props.city);
    localStorage.setItem('users', JSON.stringify(this.state.users));
    localStorage.setItem('loginStatus', this.state.loginStatus);
    console.log(localStorage.getItem('loginStatus'));
    localStorage.setItem('signupStatus', this.state.signupStatus);
    console.log(localStorage.getItem('signupStatus'));
    let user = localStorage.getItem('users');
    JSON.parse(user).forEach((element) => {
      console.log(element);
    })
  }

  handleEmailInput = (e) => {
    this.userEmail = e.target.value;
  }

  handlePasswordInput = (e) => {
    this.userPassword = e.target.value;
  }

  Login = (e) => {
    let emailCredential;
    let passwordCredential;
    this.state.users.find((element) => {
      emailCredential = (element.email === this.userEmail);
      passwordCredential = (element.password === this.userPassword);
    })
    if (emailCredential === true && passwordCredential === true) {
      alert('Login successful:)');
      this.setState({loginStatus: 'true', signupStatus: 'false'});
      localStorage.setItem('loginStatus', this.state.loginStatus);
      console.log(localStorage.getItem('loginStatus'));
      localStorage.setItem('signupStatus', this.state.signupStatus);
      console.log(localStorage.getItem('signupStatus'));
    } else {
      this.setState({loginStatus: 'false', signupStatus: 'false'});
      localStorage.setItem('loginStatus', this.state.loginStatus);
      console.log(localStorage.getItem('loginStatus'));
      localStorage.setItem('signupStatus', this.state.signupStatus);
      console.log(localStorage.getItem('signupStatus'));
      alert('Login failed! Please signup.');
    }
  }

  Signup = (e) => {
    let emailCredential;
    let passwordCredential;
    this.state.users.find((element) => {
      emailCredential = (element.email === this.userEmail);
      passwordCredential = (element.password === this.userPassword);
    })
    if (emailCredential === false && passwordCredential === false && this.userEmail !== undefined && this.userPassword !== undefined) {
      this.setState(prevState => ({
        users: [...prevState.users, {email: this.userEmail, password: this.userPassword}],
        loginStatus: 'false',
        signupStatus: 'true'
      }));
      localStorage.setItem('loginStatus', this.state.loginStatus);
      console.log(localStorage.getItem('loginStatus'));
      localStorage.setItem('signupStatus', this.state.signupStatus);
      console.log(localStorage.getItem('signupStatus'));
      localStorage.setItem('users', JSON.stringify([
        {email: this.userEmail, password: this.userPassword}
      ]));
      let newUser = localStorage.getItem('users');
      JSON.parse(newUser).forEach((element) => {
        console.log(element);
      })
    } else {
      this.setState({loginStatus: 'false', signupStatus: 'true'});
      localStorage.setItem('loginStatus', this.state.loginStatus);
      console.log(localStorage.getItem('loginStatus'));
      localStorage.setItem('signupStatus', this.state.signupStatus);
      console.log(localStorage.getItem('signupStatus'));
      alert('You are already signed up.');
    }
  }

  handleClose = (e) => {
    this.setState({ show: false });
  }

  handleShow = (e) => {
    this.setState({ show: true });
  }

  render () {
    if (this.state.loginStatus === 'true') {
      return <Redirect to={`/planner/${this.props.city}`} />;
    }
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>Trip Planner</Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Signup/Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange= {this.handleEmailInput} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange= {this.handlePasswordInput} />
            </Form.Group>
            {(this.state.loginStatus === 'false' && this.state.signupStatus === 'true') ?
            <Button variant="primary" type="submit" onClick= {this.Login} >Login</Button>
             : null
            }
            {(this.state.signupStatus === 'false' && this.state.loginStatus === 'false') ?
              <Button variant="primary" type="submit" onClick= {this.Signup}>Signup</Button>
              : null
            }
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default LogInComponent;
