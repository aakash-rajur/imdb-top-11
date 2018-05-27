import {COLLAPSE, EXPAND} from "../../../utils/constants";

const spanWide = {
	gridColumn: '1/span 2'
}, ratingPosition = {
	gridRow: '3/span 1',
	alignSelf: 'start',
	zIndex: 3,
};

export default {
	'@keyframes detail-scroll-down': {
		from: {
			transform: 'translateY(-90vh)'
		},
		to: {
			transform: 'translateY(0)'
		}
	},
	'@keyframes detail-scroll-up': {
		from: {
			transform: 'translateY(0)'
		},
		to: {
			transform: 'translateY(-90vh)'
		}
	},
	
	detail: {
		zIndex: 2,
		display: 'grid',
		gridTemplate: '1fr/1fr',
		perspective: '1px',
		height: '90vh',
		width: '100vw',
		overflowX:'hidden',
		overflowY: 'auto',
		bottom: '100vh',
		animation: ({state}) => `${
			state === COLLAPSE ? 'detail-scroll-up' :
				state === EXPAND ? 'detail-scroll-down' :
					null
			} 0.7s both`
	},
	popcorn: {
		width: 'auto',
		height: 150,
		gridRow: '1/span 1',
		gridColumn: '1/span 1',
	},
	popcornBegin: {
		extend: 'popcorn',
		transform: 'translateZ(-1px) translateX(-400px)',
		alignSelf: 'start'
	},
	popcornEnd: {
		extend: 'popcorn',
		transform: 'translateZ(-1px) translateX(400px)',
		alignSelf: 'center',
		justifySelf: 'end'
	},
	content: {
		gridRow: '1/span 1',
		gridColumn: '1/span 1',
		display: 'grid',
		gridTemplate: 'repeat(11, auto) 1fr/1fr 50%',
		justifyItems: 'center',
		alignItems: 'center',
		gridGap: '16px',
		height: '100%',
		margin: 'auto',
		color: 'white',
		padding: '40px 8% 0',
		overflow: 'auto'
	},
	title: {
		extend: [spanWide],
		fontSize: '2em',
		fontWeight: 'bold',
		textAlign: 'center',
		textTransform: 'uppercase'
	},
	year: {
		extend: [spanWide],
		fontSize: '1.5em'
	},
	rating: {
		extend: [spanWide, ratingPosition],
		height: '30vh',
		alignSelf: 'center'
	},
	ratingText: {
		extend: [ratingPosition, spanWide],
		fontSize: '3em',
		fontWeight: 'bold',
		color: 'white',
		marginTop: 'calc(27vh - 3em)'
	},
	ratingPercent: {
		extend: [ratingPosition, spanWide],
		margin: 'calc(10vh - 4px) 0 0 64px'
	},
	ratingSub: {
		extend: [ratingPosition, spanWide],
		marginTop: 'calc(15vh + 12px)',
		fontSize: '1em',
		textTransform: 'uppercase'
	},
	legendText: {
		fontSize: '1em',
		gridColumn: '1/span 2',
		justifySelf: 'start',
		paddingStart: 16
	},
	legendDot: {
		gridColumn: 1,
		justifySelf: 'start',
	},
	rtDot: {
		extend: 'legendDot',
		gridRow: 4,
	},
	rtLegend: {
		extend: 'legendText',
		gridRow: 4
	},
	mcDot: {
		extend: 'legendDot',
		gridRow: 5,
		marginBottom: 10
	},
	mcLegend: {
		extend: 'legendText',
		gridRow: 5,
		marginBottom: 10
	},
	plotTitle: {
		extend: [spanWide],
		textAlign: 'center',
		fontSize: '1.5em',
		textTransform: 'uppercase'
	},
	plotContent: {
		extend: [spanWide],
		textAlign: 'center'
	},
	'@media (max-width: 575px)': {
		popcornBegin: {
			transform: 'translateZ(-1px) translateX(-350px)'
		},
		popcornEnd: {
			transform: 'translateZ(-1px) translateX(350px)'
		}
	},
	'@media (max-width: 450px)': {
		popcornBegin: {
			transform: 'translateZ(-1px) translateX(-300px)'
		},
		popcornEnd: {
			transform: 'translateZ(-1px) translateX(300px)'
		}
	},
	'@media (max-width: 375px)': {
		rating: {
			height: '25vh'
		},
		ratingText: {
			fontSize: '2.5em',
			marginTop: 'calc(22.5vh - 2.5em)',
		},
		ratingPercent: {
			margin: 'calc(9vh - 2px) 0 0 60px',
			fontSize: '12px'
		},
		ratingSub: {
			marginTop: 'calc(12.5vh + 12px)',
			fontSize: '0.8em'
		}
	},
	'@media (max-width: 350px)': {
		popcornBegin: {
			transform: 'translateZ(-1px) translateX(-250px)'
		},
		popcornEnd: {
			transform: 'translateZ(-1px) translateX(250px)'
		},
		'@media (max-width: 300px)': {
			ratingText: {
				fontSize: '2em',
				marginTop: 'calc(18vh - 2em)',
			},
			ratingPercent: {
				margin: '9vh 0 0 48px',
				fontSize: '10px'
			},
			ratingSub: {
				marginTop: 'calc(12.5vh + 12px)',
				fontSize: '0.6em'
			}
		}
	}
};