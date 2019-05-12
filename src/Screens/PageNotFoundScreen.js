import React, { Component } from 'react';

import NotFound from '../Images/HTML-404-Page.gif'
//This component screen renders when the page is not found.
class PageNotFoundScreen extends Component {
    animation = NotFound;

    render() {
        return(
            <div style={{backgroundColor: '#4596CC', textAlign:'center'}}>
                <img style={{width: '55%', borderRadius:'10px', paddingBottom:'42px'}} src={this.animation} />
            </div>
        )
    }
}

export default PageNotFoundScreen

