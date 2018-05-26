import {preloadImage} from "../utils";
import {FETCH_MOVIES, TOP_10} from "../utils/constants";
import {dequeueLoading, enqueueLoading} from "./loading";

const MOVIE_LOADING = 'MOVIE_LOADING';
const IMAGE_LOADING = 'IMAGE_LOADING';

async function getMovie({movieID: ID, desktop, mobile}) {
	/*let response = await fetch(`${API_URL}?${API_KEY}&i=${ID}`);
	if (!response) throw new Error('No Response!');
	if (response.status !== 200) throw new Error(response.statusText);
	response = await response.json();*/
	
	let response = await import(`../assets/api/${ID}.json`),
		{Ratings: [imd, rt, mc]} = response;
	imd.Value = Number(imd.Value.replace(/(\d*)\/(\d*)/g, '$1')) / 10;
	rt.Value = Number(rt.Value.replace(/(\d*)(%)/g, '$1')) / 100;
	mc.Value = Number(mc.Value.replace(/(\d*)\/(\d*)/g, '$1')) / 100;
	return {...response, desktop, mobile};
}

export function preLoadImages(dispatch) {
	return async (DEVICE = null) => {
		if (!DEVICE) return;
		enqueueLoading(dispatch)(IMAGE_LOADING);
		let device = DEVICE.toLowerCase();
		await TOP_10.map(({[device]: url}) => preloadImage(url));
		dequeueLoading(dispatch)(IMAGE_LOADING);
	};
}

export function getAllMovies(dispatch) {
	return async () => {
		enqueueLoading(dispatch)(MOVIE_LOADING);
		let movies = await Promise.all(TOP_10.map((getMovie)));
		dispatch({type: FETCH_MOVIES, movies});
		dequeueLoading(dispatch)(MOVIE_LOADING);
	};
}

export default function movies(state = [], action) {
	if (action.type === FETCH_MOVIES)
		return [...state, ...action.movies];
	return state;
}