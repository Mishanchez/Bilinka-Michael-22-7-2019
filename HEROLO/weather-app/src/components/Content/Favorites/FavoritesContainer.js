
import React from 'react';
import { connect } from 'react-redux';
import Favorites from './Favoritetes';
import { removeFavorite } from '../../../redux/contentReduser';


class FavoritesContainer extends React.Component {

   FavoriteToCurrentWeather = (cityName, locationKey) => {
      let favoriteCity = {
         cityName: cityName,
         locationKey:locationKey
      };
      window.localStorage.setItem('currentFavoriteSelected', JSON.stringify(favoriteCity));

   };


   render() {
      return <div>
         <Favorites
            favorites={this.props.favorites}
            key={this.props.favorites.length + 1}
            removeFavorite={this.props.removeFavorite}
            FavoriteToCurrentWeather={this.FavoriteToCurrentWeather}
         />
      </div>
   };
};

let mapStateToProps = (state) => {
   return {
      favorites: state.content.favorites,
   }
};


let mapDispatchToProps = (dispatch) => {
   return {
      removeFavorite: (locationKey) => { dispatch(removeFavorite(locationKey)) },
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer)
