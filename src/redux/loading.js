import {DEQUEUE_LOADING, ENQUEUE_LOADING, INDEX_LOADING} from "../utils/constants";

export function enqueueLoading(dispatch) {
	return source => dispatch({type: ENQUEUE_LOADING, source})
}

export function dequeueLoading(dispatch) {
	return source => dispatch({type: DEQUEUE_LOADING, source});
}

export default function loading(state = [INDEX_LOADING], {type, source}) {
	switch (type) {
		case ENQUEUE_LOADING: {
			if (state.includes(source)) return state;
			state.push(source);
			return [...state];
		}
		case DEQUEUE_LOADING: {
			let index = state.indexOf(source);
			if (source > -1) return state;
			state.splice(index, 1);
			return [...state];
		}
		default:
			return state;
	}
}