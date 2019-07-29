import React from 'react';
import { NavLink } from 'react-router-dom';
import { WEATHER_ROUTE, FAVORITES_ROUTE } from '../../constants';


const Header = (props) => {
    return (
        <div className="navbar navbar-light bg-light" >

            <a clasname="navbar-brand" >Weather Task</a>

            <div >

                <NavLink to={WEATHER_ROUTE}>
                    <button type="button" className="btn btn-light">Home</button>
                </NavLink>
                <NavLink to={FAVORITES_ROUTE}>
                    <button type="button" className="btn btn-light">Favorites</button>
                </NavLink>

            </div>

        </div>
    )
};

export default Header;