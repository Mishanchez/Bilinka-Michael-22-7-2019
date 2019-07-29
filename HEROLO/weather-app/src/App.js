import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import { WEATHER_ROUTE, FAVORITES_ROUTE } from './constants';
import FavoritesContainer from './components/Content/Favorites/FavoritesContainer';
import WeatherContaine from './components/Content/Weather/weatherContainer';

function App(props) {
  return (
    <BrowserRouter >
      <div className="App" >

        <header>
          <HeaderContainer />
        </header>

        <div className='content-wrapper' >

          <Route path={WEATHER_ROUTE} render={() => <WeatherContaine/>}   />
          <Route path={FAVORITES_ROUTE} render={() => <FavoritesContainer />} />
          <Redirect from="/" to={WEATHER_ROUTE} />
          
        </div>


      </div>
    </BrowserRouter>
  );

};

export default App;
