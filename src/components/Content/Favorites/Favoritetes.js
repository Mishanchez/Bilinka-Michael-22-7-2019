import React from 'react';
import FavoriteItem from './FavoriteItem';
import './favorites.css'



const Favorites = (props) => {


    let favoriteElement = props.favorites.map((m) => <FavoriteItem

    cityName={m.cityName}
    locationKey={m.locationKey}
    temp={m.temp}
    unit={m.unit}
    weatherText={m.weatherText} 
    
    removeFavorite={props.removeFavorite}
    
    FavoriteToCurrentWeather={props.FavoriteToCurrentWeather}
    />);

    return (
        
            <div className='favorites-wrapper'> {favoriteElement}  </div>

    )
};


export default Favorites;