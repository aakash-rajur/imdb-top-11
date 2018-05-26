export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const NONE = "NONE";

export const selectedImage = {
	tiltable: {
		transform: ({tilt}) =>
			tilt === LEFT ? 'rotateY(-8deg)' :
				tilt === RIGHT ? 'rotateY(8deg)' :
					null,
		transition: 'all 0.3s'
	}
};

export default {
	'@keyframes tiltable-slide-up': {
		from: {
			transform: 'translateY(0)',
		},
		to: {
			transform: 'translateY(-8%)'
		}
	},
	'@keyframes tiltable-slide-down': {
		from: {
			transform: 'translateY(-8%)',
		},
		to: {
			transform: 'translateY(0)'
		}
	},
	
	container: {
		boxSizing: 'border-box',
		display: 'grid',
		gridAutoFlow: 'column',
		gridTemplate: '1fr/1fr',
		overflow: 'hidden',
	},
	movie: {
		width: '80vw',
		height: '100%',
		boxSizing: 'border-box',
		position: 'relative',
		perspective: '100vw',
		'& img': {
			width: '70vw',
			height: '85%',
			position: 'absolute',
			margin: '5% calc(50% - 35vw) 10%',
			objectFit: 'cover',
			borderRadius: 8,
			bottom: 0,
			boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
		},
		'&:first-child': {
			width: '90vw',
			paddingLeft: '10vw',
			'& img': {
				margin: '5% calc((50% - 35vw) / 2) 10%'
			}
		},
		'&:last-child': {
			width: '90vw',
			paddingRight: '10vw',
			'& img': {
				margin: '5% calc((50% - 35vw) / 2) 10%'
			}
		}
	},
	translateUp: {
		extend: 'movie',
		animation: 'tiltable-slide-up 0.5s both'
	},
	translateDown: {
		extend: 'movie',
		animation: 'tiltable-slide-down 0.5s both'
	},
	translated: {
		extend: 'movie',
		transform: 'translateY(-8%)'
	}
};