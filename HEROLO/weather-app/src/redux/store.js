import { combineReducers, createStore, } from 'redux';
import contentReducer from './contentReduser';




let reducers = combineReducers({
 content: contentReducer
});


let store = createStore(reducers);


window.store= store;
 
export default store;