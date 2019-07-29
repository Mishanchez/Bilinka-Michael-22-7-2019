
import {ADD_FAVORITE, REMOVE_FAVORITE } from '../constants'


let initialState = {

    favorites: [ ],
};


const contentReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_FAVORITE: {

            return {
                ...state,
                favorites: [...state.favorites, (action.currentLocation)]
            }
        }

        case REMOVE_FAVORITE: {

            return {
                ...state,
                favorites: [...state.favorites.filter(favorite => favorite.locationKey !== action.locationKey)],
            }
        }

        default: return state;
    }

};
export default contentReducer;


export const addFavorite =
    (currentLocation) => { return { type: ADD_FAVORITE, currentLocation } };

export const removeFavorite =
    (locationKey) => { return { type: REMOVE_FAVORITE, locationKey } };

