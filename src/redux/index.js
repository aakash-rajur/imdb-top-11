import {combineReducers, createStore} from 'redux';
import loading from "./loading";
import movies from "./movies";

export default createStore(combineReducers({
	loading,
	movies
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())