import scrollWithAnimation from 'scrollto-with-animation';

export function mapDispatchToProps(actions) {
	return dispatch => Object.entries(actions)
		.reduce((acc, [key, func]) => {
			func instanceof Function && (acc[key] = func(dispatch));
			return acc;
		}, {});
}

export function setStatePromise(context) {
	return function (args, cb) {
		if (cb) return context.setState(args, cb);
		return new Promise(resolve => context.setState(args, resolve));
	}
}

export function promiseTimeout(cb, timeout, ...args) {
	return new Promise(resolve =>
		setTimeout(async () => resolve(cb && await cb(...args)),
			timeout));
}

export async function preloadImage(src) {
	let image = new Image();
	return await new Promise((resolve, reject) => {
		image.onload = resolve;
		image.onerror = reject;
		image.src = src;
	});
}

export function constructRoute(ID) {
	return `/imdb-top-11/${ID}`
}

export function getMovieID(route) {
	return route.substring(route.lastIndexOf('/') + 1)
}

export function animateGalleryScroll(dom, period, vector) {
	return new Promise(resolve => scrollWithAnimation(dom, 'scrollLeft', vector, period, 'easeInOutCubic', resolve));
}

export function getInfoTemplate(data) {
	let {
		imdbRating,
		Genre,
		Runtime,
		Director,
		Actors
	} = data;
	return [{
		key: 'Rating',
		value: imdbRating
	}, {
		key: 'Genre',
		value: Genre
	}, {
		key: 'Runtime',
		value: Runtime
	}, {
		key: 'Director',
		value: Director
	}, {
		key: 'Starring',
		value: Actors
	}];
}