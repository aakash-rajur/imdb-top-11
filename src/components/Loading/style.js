export default {
	'@keyframes spinner': {
		to: {transform: 'rotate(360deg)'}
	},
	'@keyframes fade-in': {
		from: {opacity: 0},
		to: {opacity: 1}
	},
	'@keyframes fade-out': {
		from: {opacity: 1},
		to: {opacity: 0}
	},
	loading: {
		position: 'absolute',
		height: '110%',
		width: '110%',
		top: '-5%',
		left: '-5%',
		zIndex: 5,
		display: ({loading, animating}) => {
			switch (loading) {
				case true:
					return 'grid';
				case false:
					if (animating) return 'grid';
					else return 'none';
				default:
					return 'none';
			}
		},
		gridTemplate: '1fr/1fr',
		animation: ({loading}) => {
			switch (loading) {
				case true:
					return 'fade-in 0.3s both';
				case false:
					return 'fade-out 0.3s both';
				default:
					return null;
			}
		}
	},
	loaderBackground: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		objectPosition: 'center',
		filter: 'blur(7px)',
		gridColumn: 1,
		gridRow: 1
	},
	loaderAnimation: {
		boxSizing: 'border-box',
		gridRow: 1,
		gridColumn: 1,
		alignSelf: 'center',
		justifySelf: 'center',
		width: 75,
		height: 75,
		zIndex: 10,
		border: '4px solid transparent',
		borderTopColor: 'white',
		borderRightColor: 'white',
		borderRadius: '50%',
		animation: 'spinner 1s linear infinite'
	}
};