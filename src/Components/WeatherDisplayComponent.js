import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import LogInComponent from './LogInComponent';
import styles from './CSS/WeatherDisplay.module.css'

import ClearSkyDay from '../Images/ClearSkyDay.svg';
import ClearSkyNight from '../Images/ClearSkyNight.svg';
import PartlyCloudyDay from '../Images/PartlyCloudyDay.svg';
import PartlyCloudyNight from '../Images/PartlyCloudyNight.svg';
import Cloudy from '../Images/Cloudy.svg';
import Rain from '../Images/Rain.svg';
import Storm from '../Images/Storm.svg';
import Snow from '../Images/Snow.svg';
import Fog from '../Images/Fog.svg';

//This component takes the API information send down prom the parent Screen and displays it in a nice, readable interface for the user.
class WeatherDisplayComponent extends Component {
    //Start by declaring the initial show details property.
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
        }
    };
    //This function toggles the showDetails state when the button is clicked.
    toggleDetails = (e) => {
        this.setState(this.state.showDetails === false ? {
            showDetails: true
          } : {
            showDetails: false
        });
    };
    //Best to keep this minimized. It takes the ISO country code as a key and assigns it a string for nicer display.
    isoCountries = {
        'AF' : 'Afghanistan',
        'AX' : 'Aland Islands',
        'AL' : 'Albania',
        'DZ' : 'Algeria',
        'AS' : 'American Samoa',
        'AD' : 'Andorra',
        'AO' : 'Angola',
        'AI' : 'Anguilla',
        'AQ' : 'Antarctica',
        'AG' : 'Antigua And Barbuda',
        'AR' : 'Argentina',
        'AM' : 'Armenia',
        'AW' : 'Aruba',
        'AU' : 'Australia',
        'AT' : 'Austria',
        'AZ' : 'Azerbaijan',
        'BS' : 'Bahamas',
        'BH' : 'Bahrain',
        'BD' : 'Bangladesh',
        'BB' : 'Barbados',
        'BY' : 'Belarus',
        'BE' : 'Belgium',
        'BZ' : 'Belize',
        'BJ' : 'Benin',
        'BM' : 'Bermuda',
        'BT' : 'Bhutan',
        'BO' : 'Bolivia',
        'BA' : 'Bosnia And Herzegovina',
        'BW' : 'Botswana',
        'BV' : 'Bouvet Island',
        'BR' : 'Brazil',
        'IO' : 'British Indian Ocean Territory',
        'BN' : 'Brunei Darussalam',
        'BG' : 'Bulgaria',
        'BF' : 'Burkina Faso',
        'BI' : 'Burundi',
        'KH' : 'Cambodia',
        'CM' : 'Cameroon',
        'CA' : 'Canada',
        'CV' : 'Cape Verde',
        'KY' : 'Cayman Islands',
        'CF' : 'Central African Republic',
        'TD' : 'Chad',
        'CL' : 'Chile',
        'CN' : 'China',
        'CX' : 'Christmas Island',
        'CC' : 'Cocos (Keeling) Islands',
        'CO' : 'Colombia',
        'KM' : 'Comoros',
        'CG' : 'Congo',
        'CD' : 'Congo, Democratic Republic',
        'CK' : 'Cook Islands',
        'CR' : 'Costa Rica',
        'CI' : 'Cote D\'Ivoire',
        'HR' : 'Croatia',
        'CU' : 'Cuba',
        'CY' : 'Cyprus',
        'CZ' : 'Czech Republic',
        'DK' : 'Denmark',
        'DJ' : 'Djibouti',
        'DM' : 'Dominica',
        'DO' : 'Dominican Republic',
        'EC' : 'Ecuador',
        'EG' : 'Egypt',
        'SV' : 'El Salvador',
        'GQ' : 'Equatorial Guinea',
        'ER' : 'Eritrea',
        'EE' : 'Estonia',
        'ET' : 'Ethiopia',
        'FK' : 'Falkland Islands (Malvinas)',
        'FO' : 'Faroe Islands',
        'FJ' : 'Fiji',
        'FI' : 'Finland',
        'FR' : 'France',
        'GF' : 'French Guiana',
        'PF' : 'French Polynesia',
        'TF' : 'French Southern Territories',
        'GA' : 'Gabon',
        'GM' : 'Gambia',
        'GE' : 'Georgia',
        'DE' : 'Germany',
        'GH' : 'Ghana',
        'GI' : 'Gibraltar',
        'GR' : 'Greece',
        'GL' : 'Greenland',
        'GD' : 'Grenada',
        'GP' : 'Guadeloupe',
        'GU' : 'Guam',
        'GT' : 'Guatemala',
        'GG' : 'Guernsey',
        'GN' : 'Guinea',
        'GW' : 'Guinea-Bissau',
        'GY' : 'Guyana',
        'HT' : 'Haiti',
        'HM' : 'Heard Island & Mcdonald Islands',
        'VA' : 'Holy See (Vatican City State)',
        'HN' : 'Honduras',
        'HK' : 'Hong Kong',
        'HU' : 'Hungary',
        'IS' : 'Iceland',
        'IN' : 'India',
        'ID' : 'Indonesia',
        'IR' : 'Iran, Islamic Republic Of',
        'IQ' : 'Iraq',
        'IE' : 'Ireland',
        'IM' : 'Isle Of Man',
        'IL' : 'Israel',
        'IT' : 'Italy',
        'JM' : 'Jamaica',
        'JP' : 'Japan',
        'JE' : 'Jersey',
        'JO' : 'Jordan',
        'KZ' : 'Kazakhstan',
        'KE' : 'Kenya',
        'KI' : 'Kiribati',
        'KR' : 'Korea',
        'KW' : 'Kuwait',
        'KG' : 'Kyrgyzstan',
        'LA' : 'Lao People\'s Democratic Republic',
        'LV' : 'Latvia',
        'LB' : 'Lebanon',
        'LS' : 'Lesotho',
        'LR' : 'Liberia',
        'LY' : 'Libyan Arab Jamahiriya',
        'LI' : 'Liechtenstein',
        'LT' : 'Lithuania',
        'LU' : 'Luxembourg',
        'MO' : 'Macao',
        'MK' : 'Macedonia',
        'MG' : 'Madagascar',
        'MW' : 'Malawi',
        'MY' : 'Malaysia',
        'MV' : 'Maldives',
        'ML' : 'Mali',
        'MT' : 'Malta',
        'MH' : 'Marshall Islands',
        'MQ' : 'Martinique',
        'MR' : 'Mauritania',
        'MU' : 'Mauritius',
        'YT' : 'Mayotte',
        'MX' : 'Mexico',
        'FM' : 'Micronesia, Federated States Of',
        'MD' : 'Moldova',
        'MC' : 'Monaco',
        'MN' : 'Mongolia',
        'ME' : 'Montenegro',
        'MS' : 'Montserrat',
        'MA' : 'Morocco',
        'MZ' : 'Mozambique',
        'MM' : 'Myanmar',
        'NA' : 'Namibia',
        'NR' : 'Nauru',
        'NP' : 'Nepal',
        'NL' : 'Netherlands',
        'AN' : 'Netherlands Antilles',
        'NC' : 'New Caledonia',
        'NZ' : 'New Zealand',
        'NI' : 'Nicaragua',
        'NE' : 'Niger',
        'NG' : 'Nigeria',
        'NU' : 'Niue',
        'NF' : 'Norfolk Island',
        'MP' : 'Northern Mariana Islands',
        'NO' : 'Norway',
        'OM' : 'Oman',
        'PK' : 'Pakistan',
        'PW' : 'Palau',
        'PS' : 'Palestinian Territory, Occupied',
        'PA' : 'Panama',
        'PG' : 'Papua New Guinea',
        'PY' : 'Paraguay',
        'PE' : 'Peru',
        'PH' : 'Philippines',
        'PN' : 'Pitcairn',
        'PL' : 'Poland',
        'PT' : 'Portugal',
        'PR' : 'Puerto Rico',
        'QA' : 'Qatar',
        'RE' : 'Reunion',
        'RO' : 'Romania',
        'RU' : 'Russian Federation',
        'RW' : 'Rwanda',
        'BL' : 'Saint Barthelemy',
        'SH' : 'Saint Helena',
        'KN' : 'Saint Kitts And Nevis',
        'LC' : 'Saint Lucia',
        'MF' : 'Saint Martin',
        'PM' : 'Saint Pierre And Miquelon',
        'VC' : 'Saint Vincent And Grenadines',
        'WS' : 'Samoa',
        'SM' : 'San Marino',
        'ST' : 'Sao Tome And Principe',
        'SA' : 'Saudi Arabia',
        'SN' : 'Senegal',
        'RS' : 'Serbia',
        'SC' : 'Seychelles',
        'SL' : 'Sierra Leone',
        'SG' : 'Singapore',
        'SK' : 'Slovakia',
        'SI' : 'Slovenia',
        'SB' : 'Solomon Islands',
        'SO' : 'Somalia',
        'ZA' : 'South Africa',
        'GS' : 'South Georgia And Sandwich Isl.',
        'ES' : 'Spain',
        'LK' : 'Sri Lanka',
        'SD' : 'Sudan',
        'SR' : 'Suriname',
        'SJ' : 'Svalbard And Jan Mayen',
        'SZ' : 'Swaziland',
        'SE' : 'Sweden',
        'CH' : 'Switzerland',
        'SY' : 'Syrian Arab Republic',
        'TW' : 'Taiwan',
        'TJ' : 'Tajikistan',
        'TZ' : 'Tanzania',
        'TH' : 'Thailand',
        'TL' : 'Timor-Leste',
        'TG' : 'Togo',
        'TK' : 'Tokelau',
        'TO' : 'Tonga',
        'TT' : 'Trinidad And Tobago',
        'TN' : 'Tunisia',
        'TR' : 'Turkey',
        'TM' : 'Turkmenistan',
        'TC' : 'Turks And Caicos Islands',
        'TV' : 'Tuvalu',
        'UG' : 'Uganda',
        'UA' : 'Ukraine',
        'AE' : 'United Arab Emirates',
        'GB' : 'United Kingdom',
        'US' : 'United States',
        'UM' : 'United States Outlying Islands',
        'UY' : 'Uruguay',
        'UZ' : 'Uzbekistan',
        'VU' : 'Vanuatu',
        'VE' : 'Venezuela',
        'VN' : 'Viet Nam',
        'VG' : 'Virgin Islands, British',
        'VI' : 'Virgin Islands, U.S.',
        'WF' : 'Wallis And Futuna',
        'EH' : 'Western Sahara',
        'YE' : 'Yemen',
        'ZM' : 'Zambia',
        'ZW' : 'Zimbabwe'
    };
    //This takes the codes sent from the API, and assigns them a local picture because I think they are prettier than the one given by the API.
    handleImages = {
       '01d': ClearSkyDay,
       '01n': ClearSkyNight,
       '02d': PartlyCloudyDay,
       '02n': PartlyCloudyNight,
       '03d': Cloudy,
       '03n': Cloudy,
       '04d': Cloudy,
       '04n': Cloudy,
       '09d': Rain,
       '09n': Rain,
       '10d': Rain,
       '10n': Rain,
       '11d': Storm,
       '11n': Storm,
       '13d': Snow,
       '13n': Snow,
       '50d': Fog,
       '50n': Fog
    };


    render() {
        //This is to help access each of the obj sections more quickly for cleaner inline code.
        let main = this.props.data.main
        let weather = this.props.data.weather
        let sys = this.props.data.sys
        let sunrise = ''
        let sunset = ''
        let country = ''
        //Here is an if statement to address the async loading of information. Used it to push the icon codes to an array for later use.
        let dayIcons = []
        if(this.props.fdata && this.props.fdata.length > 0){
            for(let i = 0; i < this.props.fdata.length; i++){
              if(this.props.fdata[i].weather.length > 0){
                dayIcons.push(this.props.fdata[i].weather[0].icon);
              }
            }
        }
        //Here various days are fetched and sliced to display readibly.
        let today = new Date();
        let d0 = (today.toDateString()).slice(0, -5) //today
        let d1 = new Date(); //tommorrow, the next day in the forcast.
        d1.setDate(today.getDate()+1)
        d1 = d1.toDateString().slice(0, 3)
        let d2 = new Date(); //the next next day, ect.
        d2.setDate(today.getDate()+2)
        d2 = d2.toDateString().slice(0, 3)
        let d3 = new Date();
        d3.setDate(today.getDate()+3)
        d3 = d3.toDateString().slice(0, 3)
        let d4 = new Date();
        d4.setDate(today.getDate()+4)
        d4 = d4.toDateString().slice(0, 3)
        let d5 = new Date();
        d5.setDate(today.getDate()+5)
        d5 = d5.toDateString().slice(0, 3)


        //Here is another if statement to address the async loading of information. The temperature highs and lows from the forcast are pushed to an array.
        let dayInfo = []
        if (this.props.fdata && this.props.fdata.length > 0){
            for(let i = 0; i < this.props.fdata.length; i++){
                dayInfo.push(this.props.fdata[i].main.temp_max)
                dayInfo.push(this.props.fdata[i].main.temp_min)
            }
        }
        //Here is another if statement to address the async loading of information.
        if (sys) {
            //The sunrise and sunset times given are in unix code and must be converted to hours and minutes to display properly.
            sunrise = (new Date(sys.sunrise*1000).getHours() +":"+ new Date(sys.sunrise*1000).getMinutes());
            sunset = (new Date(sys.sunset*1000).getHours() +":"+ new Date(sys.sunset*1000).getMinutes());
            //The ISO country code given is changed to a string for better UI however if it's not listed in the huge obj above, shows the iso code.
            if (this.isoCountries.hasOwnProperty(sys.country)) {
                country = this.isoCountries[sys.country];
            } else {
                country = sys.country;
            }

        }


        return (
            <div>
                {/* the weather information is conditionally rendered, only showing up after the api has been called */}
              {this.props.data.name
                ? <Card>
                    <Card.Body>
                        <h1>{this.props.data.name}, {country}</h1> {/*Location and converted country iso. */}
                        <h2>{d0}</h2> {/*Today's date*/}
                        <div className={styles.topBox}>
                            <div className={styles.today}>
                                <div>
                                    <img src={this.handleImages[weather[0].icon]} alt='Clear Skys'className={styles.todayImage}/>{/*Converted image using API image code*/}
                                    <h2>{weather[0].discription}</h2>{/*Discription from the API*/}
                                </div>
                                <div className={styles.todayTemp}>
                                    <h1>{Math.round(main.temp)}{this.props.unit === 'metric'
                                        ? '°C'
                                        : '°F'}{/*The current temperature given in the proper units chosen by the user. Using the state units to determine what to display.*/}
                                    </h1>
                                    <h4>{Math.round(main.temp_min)}{this.props.unit === 'metric'
                                        ? '°C '
                                        : '°F '}
                                        {Math.round(main.temp_max)}{this.props.unit === 'metric'
                                        ? '°C'
                                        : '°F'}
                                    </h4>
                                    <Button onClick={this.toggleDetails} size='sm' variant='info'>Details</Button>
                                </div>
                            </div>
                                <div className={styles.buttons}>
                                    <h5>Add this city to your <br/>Trip Planner</h5>
                                    <LogInComponent city={this.props.data.name}/> {/* Trip Planner button */}
                                </div>
                            </div>
                            <hr/>
                            <div className={styles.underLine}>
                                {/*If showDetails is true the forcast is hidden and detailed information about today render instead.*/}
                                {this.state.showDetails === true
                                    ?  <Table style={{width: '100%'}} striped bordered>
                                            <tbody>
                                               <tr>
                                                   <td>High Temperature</td>
                                                   <td>{Math.round(main.temp_max)}{this.props.unit === 'metric'
                                                        ? '°C '
                                                        : '°F '}
                                                    </td>
                                               </tr>
                                               <tr>
                                                    <td>Low Temperature</td>
                                                    <td>{Math.round(main.temp_min)}{this.props.unit === 'metric'
                                                        ? '°C'
                                                        : '°F'}
                                                    </td>
                                               </tr>
                                               <tr>
                                                   <td>Humidity</td>
                                                   <td>{main.humidity}%</td>
                                               </tr>
                                               <tr>
                                                   <td>Sunrise</td>
                                                   <td>{sunrise.length > 5 ? '0'+ sunrise : sunrise }</td>{/* If the time given is before 10, a zero is added for better readability.*/}
                                               </tr>
                                               <tr>
                                                   <td>Sunset</td>
                                                   <td>{sunset.length > 5 ? '0'+ sunset : sunset}</td>
                                               </tr>
                                               <tr>
                                                   <td>Pressure</td>
                                                   <td>{main.pressure} hPa</td>
                                               </tr>
                                               <tr>
                                                   <td>Wind Speed</td>
                                                   <td>{this.props.data.wind.speed}{this.props.unit === 'metric' ? ' m/s' : ' mph'}</td>
                                               </tr>
                                            </tbody>
                                        </Table>
                                    :   <div className={styles.forcastContainer}>
                                            <div className={styles.forcastDay}>
                                                <p>{d1}</p>
                                                <img src={this.handleImages[dayIcons[0]]} alt='Clear Skys' className={styles.forcastImage}/>
                                                <h3>{Math.round(dayInfo[0])}{this.props.unit === 'metric'
                                                        ? '°C'
                                                        : '°F'}
                                                </h3>
                                                <p>{Math.round(dayInfo[1])}{this.props.unit === 'metric'
                                                        ? '°C'
                                                        : '°F'}
                                                </p>
                                            </div>

                                            <div className={styles.forcastDay}>
                                                <p>{d2}</p>
                                                <img src={this.handleImages[dayIcons[1]]} alt='Clear Skys' className={styles.forcastImage}/>
                                                <h3>{Math.round(dayInfo[2])}{this.props.unit === 'metric'
                                                        ? '°C'
                                                        : '°F'}
                                                </h3>
                                                <p>{Math.round(dayInfo[3])}{this.props.unit === 'metric'
                                                        ? '°C'
                                                        : '°F'}
                                                </p>
                                            </div>
                                            <div className={styles.forcastDay}>
                                                <p>{d3}</p>
                                                <img src={this.handleImages[dayIcons[2]]} alt='Clear Skys' className={styles.forcastImage}/>
                                                <h3>{Math.round(dayInfo[4])}{this.props.unit === 'metric'
                                                        ? '°C'
                                                        : '°F'}
                                                </h3>
                                                <p>{Math.round(dayInfo[5])}{this.props.unit === 'metric'
                                                        ? '°C'
                                                        : '°F'}
                                                </p>
                                            </div>
                                            <div className={styles.forcastDay}>
                                                <p>{d4}</p>
                                                <img src={this.handleImages[dayIcons[3]]} alt='Clear Skys' className={styles.forcastImage}/>
                                                <h3>{Math.round(dayInfo[6])}{this.props.unit === 'metric'
                                                        ? '°C'
                                                        : '°F'}
                                                </h3>
                                                <p>{Math.round(dayInfo[7])}{this.props.unit === 'metric'
                                                        ? '°C'
                                                        : '°F'}
                                                </p>
                                            </div>
                                            <div className={styles.forcastDay}>
                                                <p>{d5}</p>
                                                <img src={this.handleImages[dayIcons[4]]} alt='Clear Skys' className={styles.forcastImage}/>
                                                <h3>{Math.round(dayInfo[8])}{this.props.unit === 'metric'
                                                        ? '°C'
                                                        : '°F'}
                                                </h3>
                                                <p>{Math.round(dayInfo[9])}{this.props.unit === 'metric'
                                                        ? '°C'
                                                        : '°F'}
                                                </p>
                                            </div>
                                        </div>
                                }
                            </div>
                        </Card.Body>
                    </Card>
                :   <span className={styles.span}> {/*For more accurate results due to the way the API is used we specify instructions to the user. */}
                        <h3>Type in the country code and name of the city you wish to view. If you would like to view results in <br/> imperial units choose °F.</h3>
                    </span>}
            </div>
        );
    }
}

export default WeatherDisplayComponent;
