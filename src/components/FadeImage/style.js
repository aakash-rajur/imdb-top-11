export default {
	'@keyframes fade-in': {
		from: {opacity: 0},
		to: {opacity: 1}
	},
	'@keyframes fade-out': {
		from: {opacity: 1},
		to: {opacity: 0}
	},
	container: {
		position: 'relative',
		overflow: 'hidden'
	},
	images: {
		width: '110%',
		height: '110%',
		objectFit: 'cover',
		objectPosition: 'center',
		top: '-5%',
		left: '-5%',
		position: 'absolute',
		background: 'lightgray'
	},
	prev: {
		extend: 'images',
		zIndex: 2,
		animation: ({prev, next}) => {
			if (prev === next) return null;
			return 'fade-out 0.3s both';
		}
	},
	next: {
		extend: 'images',
		zIndex: 1,
		animation: ({prev, next}) => {
			if (prev === next) return null;
			return 'fade-in 0.3s both';
		},
		display: ({prev, next}) => {
			if (prev === next) return 'none';
			return 'initial';
		}
	}
}