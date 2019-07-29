import React from 'react';
import { NavLink } from 'react-router-dom';
import { WEATHER_ROUTE } from '../../../constants';
import './favorites.css'



const FavoriteItem = (props) => {

    let removeFavorite = () => {
        window.localStorage.removeItem('currentFavoriteSelected');
        props.removeFavorite(props.locationKey)
    };

    let FavoriteToCurrentWeather = () => { props.FavoriteToCurrentWeather(props.cityName, props.locationKey) };


    return (
        <div>

            <div onClick={FavoriteToCurrentWeather}>

                <NavLink to={WEATHER_ROUTE} className='link'>
                    <div className='favorites-item'>
                        <p>{props.cityName}</p>
                        <p>Temperature {props.temp} {props.unit} </p>
                        <p>Is {props.weatherText} now</p>
                    </div>
                </NavLink>
            </div>
            
            <button type="button" className="btn btn-outline-secondary" onClick={removeFavorite} >Remove from favorites</button>

        </div>
    )
};

export default FavoriteItem;