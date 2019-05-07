import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Redirect } from 'react-router-dom';

class LogInComponent extends Component {

  constructor (props) {
    super (props);

    this.state = {users: [
      {email: 'admin@gmail.com', password: 'admin'}
    ],
      showButton: this.props.showButton,
      show: false,
      loginStatus: 'false',
      signupStatus: 'true',
      preLogInChecker: localStorage.getItem('loginStatus')
    };
    console.log(this.props.city);
    localStorage.setItem('loginStatus', this.state.loginStatus);
    console.log(localStorage.getItem('loginStatus'));
    localStorage.setItem('signupStatus', this.state.signupStatus);
    console.log(localStorage.getItem('signupStatus'));
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
    if (this.userEmail !== undefined && this.userPassword !== undefined) {
      this.state.users.find((element) => {
        emailCredential = (element.email === this.userEmail);
        passwordCredential = (element.password === this.userPassword);
      });
    }
    if (emailCredential === true && passwordCredential === true && this.userEmail !== undefined && this.userPassword !== undefined) {
      this.setState({loginStatus: 'true', signupStatus: 'false'});
      localStorage.setItem('loginStatus', 'true');
      console.log(localStorage.getItem('loginStatus'));
      localStorage.setItem('signupStatus', 'false');
      console.log(localStorage.getItem('signupStatus'));
      localStorage.setItem('users', JSON.stringify([
        {email: this.userEmail, password: this.userPassword}
      ]));
      let loggedinUser = localStorage.getItem('users');
      JSON.parse(loggedinUser).forEach((element) => {
        console.log(element);
      });
      alert('Login successful:)');
    } else {
      this.setState({loginStatus: 'false', signupStatus: 'false'});
      localStorage.setItem('loginStatus', 'false');
      console.log(localStorage.getItem('loginStatus'));
      localStorage.setItem('signupStatus', 'false');
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
      localStorage.setItem('loginStatus', 'false');
      console.log(localStorage.getItem('loginStatus'));
      localStorage.setItem('signupStatus', 'true');
      console.log(localStorage.getItem('signupStatus'));
    } else {
      this.setState({loginStatus: 'false', signupStatus: 'true'});
      localStorage.setItem('loginStatus', 'false');
      console.log(localStorage.getItem('loginStatus'));
      localStorage.setItem('signupStatus', 'true');
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

  Logout = (e) => {
    this.setState({
      loginStatus: 'false',
      signupStatus: 'true',
      preLogInChecker: 'false'
    });
    localStorage.setItem('loginStatus', 'false');
    localStorage.setItem('signupStatus', 'true');
    localStorage.removeItem('users');
    this.userEmail = undefined;
    this.userPassword = undefined;
    this.props.history.push(`/home`);
  }

  render () {
    console.log(this.state.preLogInChecker);
    if (this.state.loginStatus === 'true') {
      return <Redirect to={`/planner/${this.props.city}`} />;
    }
    return (
      <>
        {this.state.showButton ?
          <Button show="primary" onClick={this.handleShow}>
          {(this.state.preLogInChecker === 'false') ? 'Trip Planner' : 'Log out'}</Button>
        :
          null
        }
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Signup/Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {(this.state.preLogInChecker === 'true') ?
            <Jumbotron>
              <p>Press the following button to log out.</p>
              <Button variant="info" type="submit" onClick= {this.Logout} >Logout</Button>
            </Jumbotron>
            :
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
        }
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
