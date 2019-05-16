import React, { Component } from 'react';

import MyPageComponent from '../Components/MyPageComponent';
import LogInComponent from '../Components/LogInComponent';
//Screen that renders profile
class MyPageScreen extends Component {

  constructor (props) {
    super(props);
    this.state = ({
      loginStatus: localStorage.getItem('loginStatus')
    });
  }

    render () {
        return (
          <div className="container">
          {(this.state.loginStatus === 'true') ?
            <div className="row float-right">
              <LogInComponent {...this.props} showButton={true} />
            </div>
            : null
          }
            <div className="row">
              <MyPageComponent />
            </div>
          </div>
        )
    }
}

export default MyPageScreen;
