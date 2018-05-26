import {COLLAPSE, EXPAND} from "../../../utils/constants";

export const COLLAPSE_CHEVRON = 'COLLAPSE_CHEVRON';
export const EXPAND_CHEVRON = 'EXPAND_CHEVRON';

export const chevronStyle = {
	'@keyframes animate-chevron': {
		'0%': {
			opacity: 1,
			transform: 'translateY(0px)'
		},
		'50%': {
			opacity: 0,
			transform: 'translateY(-20px)'
		},
		'100%': {
			opacity: 1,
			transform: 'translateY(0px)'
		}
	},
	chevron: {
		animation: ({animation}) => animation ? 'animate-chevron 0.7s both' : null,
		cursor: 'pointer'
	}
};

function getActorStyles() {
	let actors = {};
	for (let i = 0; i < 4; i++)
		actors[`actor${i}`] = {
			extend: 'actor',
			gridColumn: '1',
			gridRow: `${6 + i}`
		};
	return actors;
}

export default {
	'@keyframes gallery-scroll-up': {
		from: {
			transform: 'translateY(0)'
		},
		to: {
			transform: 'translateY(-90vh)'
		}
	},
	'@keyframes gallery-scroll-down': {
		from: {
			transform: 'translateY(-90vh)'
		},
		to: {
			transform: 'translateY(0)'
		}
	},
	
	wrapper: {
		height: '100vh',
		display: 'grid',
		gridTemplate: 'repeat(2, 1fr) 8% repeat(6, auto) 10%/1fr',
		zIndex: 4,
		top: 0,
		animation: ({state}) => `${
			state === COLLAPSE ? 'gallery-scroll-up' :
				state === EXPAND ? 'gallery-scroll-down' :
					null
			} 0.7s both`
	},
	toggle: {
		width: 24,
		margin: 8,
		justifySelf: 'center',
		alignSelf: 'start',
		gridRow: '1',
		gridColumn: '1'
	},
	imageSwitcher: {
		gridRow: '1/span 2',
		gridColumn: '1',
		alignSelf: 'end',
		height: 'calc(100% - 40px)'
	},
	common: {
		width: '80vw',
		justifySelf: 'center',
		textAlign: 'center',
		color: '#9E9E9E',
		gridColumn: '1'
	},
	spacer: {
		extend: 'common',
		borderRadius: '5px 5px 0 0',
		gridRow: '2',
	},
	title: {
		extend: 'common',
		fontSize: '1em',
		fontWeight: 'bolder',
		textTransform: 'uppercase',
		justifySelf: 'center',
		maxWidth: '80%',
		color: 'black',
		display: 'flex',
		alignItems: 'flex-end',
		justifyContent: 'center',
		gridRow: '3'
	},
	subtitle: {
		extend: 'common',
		justifySelf: 'center',
		gridRow: '4',
		paddingBottom: 10,
		'&:nth-child(5)': {
			paddingBottom: 20
		}
	},
	director: {
		extend: 'common',
		color: 'black',
		fontWeight: 'bold',
		fontSize: 12,
		gridRow: '5'
	},
	actor: {
		extend: 'common',
		fontSize: 12,
		gridColumn: '1',
		'&:nth-last-child(2)': {
			paddingBottom: 20
		}
	},
	...getActorStyles(),
	moreInfo: {
		extend: 'common',
		background: '#E91E63',
		color: 'white',
		textTransform: 'uppercase',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: 'pointer',
		borderRadius: '0 0 5px 5px',
		marginBottom: 20,
		gridRow: '10',
		gridColumn: '1'
	},
	
	card: {
		background: 'white',
		gridRow: '2/span 8',
		gridColumn: '1',
		width: '80vw',
		justifySelf: 'center',
		borderRadius: '5px 5px 0 0'
	},
	'@media (max-width: 400px)': {
		title: {
			maxWidth: 'initial'
		}
	},
	'@media (max-width: 300px)': {
		brief: {
			fontSize: '12px'
		},
		title: {
			maxWidth: 'initial'
		},
		additional: {
			margin: 'auto'
		}
	}
}