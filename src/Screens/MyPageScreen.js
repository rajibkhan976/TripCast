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
            <div style={{textAlign:"right"}}>
              <LogInComponent {...this.props} showButton={true} />
            </div>
            : null
          }
            <div>
              <MyPageComponent {...this.props} />
            </div>
          </div>
        )
    }
}

export default MyPageScreen;
