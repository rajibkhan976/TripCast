import React, {Component} from 'react';
import WeatherDisplayComponent from '../Components/WeatherDisplayComponent';

export class HomeScreen extends Component {
    render() {
        return(
            <div className='container' style={{display: 'flex'}}>
                <WeatherDisplayComponent></WeatherDisplayComponent>
            </div>  
        )
    }
}

export default HomeScreen;