import React from 'react';
import './weather.css'
import FiveDaysItem from './FiveDaysItem';
import shortid from 'shortid';


const Weather = (props) => {


    let addFavorite = () => { props.addFavorite(props.currentLocation) }


    let existInFavorites = () => {
        return props.favorites.find((favorite) => favorite.locationKey === props.currentLocation.locationKey)
         || JSON.parse(window.localStorage.getItem('currentFavoriteSelected'));

    }


    let fiveDaysElement = props.weatherNextFiveDays.map( (m) => 
    <FiveDaysItem  date={m.date}  minTemp={m.min}  maxTemp={m.max}  unit={m.unit}  key={shortid.generate()}/> );


    return (
        <div >

                <div className='current_city'>

                    <div>
                    <p> {props.currentLocation.cityName}</p>
                    <p>{props.currentLocation.temp} {props.currentLocation.unit}</p>
                    <p>{props.currentLocation.weatherText} now</p>
                    </div>

                    <button className="btn btn-link" disabled={existInFavorites()} onClick={addFavorite} >Add to Favorites</button>

                </div>
                

            <h2>Scattered clouds</h2>
            
            <div className="fivedays-wrapper">  {fiveDaysElement}  </div>


        </div>
    )
};

export default Weather;