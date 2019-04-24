import React, { Component } from 'react';

class LogInComponent extends Component {

  constructor (props) {
    super (props);

    this.state = {users: [
      {email: 'admin@gmail.com', password: 'admin'}
    ],
      loginStatus: false,
      signupStatus: true
    };
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
      this.setState({loginStatus: true, signupStatus: false});
      localStorage.setItem('loginStatus', true);
      console.log(localStorage.getItem('loginStatus'));
      localStorage.setItem('signupStatus', false);
      console.log(localStorage.getItem('signupStatus'));
    } else {
      this.setState({loginStatus: true, signupStatus: false});
      localStorage.setItem('loginStatus', true);
      console.log(localStorage.getItem('loginStatus'));
      localStorage.setItem('signupStatus', false);
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
    if (emailCredential === false && passwordCredential === false) {
      this.setState(prevState => ({
        users: [...prevState.users, {email: this.userEmail, password: this.userPassword}],
        loginStatus: false,
        signupStatus: true
      }));
      localStorage.setItem('loginStatus', false);
      console.log(localStorage.getItem('loginStatus'));
      localStorage.setItem('signupStatus', true);
      console.log(localStorage.getItem('signupStatus'));
      localStorage.setItem('users', JSON.stringify([
        {email: this.userEmail, password: this.userPassword}
      ]));
      let newUser = localStorage.getItem('users');
      JSON.parse(newUser).forEach((element) => {
        console.log(element);
      })
    } else {
      this.setState({loginStatus: false, signupStatus: true});
      localStorage.setItem('loginStatus', false);
      console.log(localStorage.getItem('loginStatus'));
      localStorage.setItem('signupStatus', true);
      console.log(localStorage.getItem('signupStatus'));
      alert('You are already signed up.');
    }
  }

  render () {
    return (
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
          Trip planner
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Signup/Login</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <div className="form-group">
                <label>Email: </label>
                <input className="form-control" type="email" id="email" onChange= {this.handleEmailInput}/> <br/>
                <label>Password: </label>
                <input className="form-control" type="password" id="pass" onChange= {this.handlePasswordInput}/> <br/>
                {(this.state.loginStatus) ?
                  null :
                  <button type="button" className="btn btn-success" onClick= {this.Login}>Login</button>
                  }
                {(!this.state.signupStatus && this.state.loginStatus) ?
                  <button type="button" className="btn btn-warning" onClick= {this.Signup}>Sign up</button> :
                  null
                  }
              </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LogInComponent;
